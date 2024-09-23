import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  pointerWithin,
  rectIntersection,
  closestCorners,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, over } from 'lodash'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // yeu cau chuot di 10px ms active event, fix click goi event
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    // tolerance la dung sai, tren 500 ms dung duoc but
    activationConstraint: { delay: 250, tolerance: 500 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  // cung 1 thoi diem chi keo tha duoc cot hoac card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  // diem va cham cuoi cung xu li thuat toan phat hien va cham
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // function chung xu li cap nhat lai state trong th di chuyen card giua cac khu vuc khac nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumn => {
      const overCardIndex = overColumn?.cards?.findIndex(
        card => card._id === overCardId
      )
      // console.log('over card index: ', overCardIndex)

      // logic tinh toan card index moi
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1
      // console.log('isBelowOverItem: ', isBelowOverItem)
      // console.log('modifier: ', modifier)
      // console.log('newCardIndex: ', newCardIndex)

      // clone mang orderedColumns cu ra 1 column moi roi moi cap nhat return moi, buoc nay co the dung spread operator nhung bi loi
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(
        column => column._id === activeColumn._id
      )
      const nextOverColumn = nextColumns.find(
        column => column._id === overColumn._id
      )
      // column cu
      if (nextActiveColumn) {
        // xoa card o column cu
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          card => card._id !== activeDraggingCardId
        )

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          card => card._id
        )
      }
      // column moi
      if (nextOverColumn) {
        // kiem tra xem card dang keo co ton tai o over column khong. neu co thi  xoa
        nextOverColumn.cards = nextOverColumn.cards.filter(
          card => card._id !== activeDraggingCardId
        )

        // them card vao column , tospliced return mang moi khong anh huong mang cu
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          // truong hop drag end thi phai cap nhat lai chuan du lieu column id trong card sau khi keo tha giua 2 column
          {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }
        )
        // cap nhat lai mang card order id cho chuan du lieu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

  // tim column boi card id
  const findColumnByCardId = cardId => {
    // tim column => map column theo cardid roi moi tim kiem ten card
    return orderedColumns.find(column =>
      column?.cards?.map(card => card._id)?.includes(cardId)
    )
  }

  // trigger khi bat dau keo 1 phan tu
  const handleDragStart = event => {
    // console.log('handle drag start: ', event)

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      // neu keo card moi thuc hien set old column
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = event => {
    // khong lam j neo dang keo tha
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }
    // con neu la card thi xu li them de co the keo card qua lai giua cac column
    // console.log('handle drag over: ', event)
    const { active, over } = event
    // canh bao active va over keo ngoai pham vi container tranh crash
    if (!active || !over) return
    // activeDraggingCard la cai dang duoc keo tha
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // cai card dang tuong tac vs cai dang keo , co the o tren hoac duoi
    const { id: overCardId } = over
    // lay ra gia tri column dang active va over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log(activeColumn, overColumn)
    // neu khong ton tai 1 trong 2 column ko lm j het, tranh crash trang
    if (!activeColumn || !overColumn) return
    // hanh dong keo card  sang cot khac
    if (activeColumn._id !== overColumn._id) {
      // console.log('code chay sang cot khac')
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // trigger khi ket thuc hanh dong keo (drop)
  const handleDragEnd = event => {
    // console.log('handle drag end: ', event)
    const { active, over } = event
    // kiem tra ko ton tai over
    if (!over || !active) return
    // xu li keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('hanh dong keo tha card')
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // cai card dang tuong tac vs cai dang keo , co the o tren hoac duoi
      const { id: overCardId } = over
      // lay ra gia tri column dang active va over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // neu khong ton tai 1 trong 2 column ko lm j het, tranh crash trang
      if (!activeColumn || !overColumn) return

      // console.log(oldColumnWhenDraggingCard, overColumn)
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // console.log('keo tha card giua 2 column')
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
      // hanh dong keo tha trong cung 1 column
      else {
        // console.log('keo tha card trong column')
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          c => c._id === activeDragItemId
        )
        // lay vi moi cu tu thang over
        const newCardIndex = overColumn?.cards?.findIndex(
          c => c._id === overCardId
        )
        // dung array move tuong tu array move giua 2 column
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )
        // console.log(dndOrderedCards)
        setOrderedColumns(prevColumn => {
          // clone mang OrderedColumns cu ra 1 cai moi de xu li
          const nextColumns = cloneDeep(prevColumn)
          // console.log('nextColumns: ', nextColumns)
          // tim toi cai column ma ta dang tha
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          // console.log('targetColumn: ', targetColumn)
          return nextColumns
        })
      }
      return
    }

    // xu li keo tha column
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      // console.log('hanh dong keo tha column')
      // neu vi tri keo tha khac vi tri ban dau thi thuc hien

      // lay vi tri cu tu thang active
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
      // lay vi moi cu tu thang over
      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
      // xep lai mang dung arraymove cua sortable
      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      )

      // xu li goi api
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log(dndOrderedColumns)
      // console.log(dndOrderedColumnsIds)
      setOrderedColumns(dndOrderedColumns)
    }

    // vong doi cuoi cua card nen phai set state ve null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  // toi uu lai thuat toan va cham
  const collisionDetectionStrategy = useCallback(
    args => {
      // th keo column thi dung closest column la hop li nhat
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      // First, let's see if there are any collisions with the pointer
      // tim cac diem va cham voi con tro
      const pointerIntersections = pointerWithin(args)
      const intersections = !!pointerIntersections?.length
        ? pointerIntersections
        : rectIntersection(args)
      // console.log('intersections', intersections)
      // tim over id dau tien cu intersection
      let overId = getFirstCollision(intersections, 'id')
      if (overId) {
        // thay vi tim den column thi chung ta co gang tim toi card id trong column chuyen toi v nen ta se dung closest center
        const checkColumn = orderedColumns.find(column => column._id === overId)
        if (checkColumn) {
          // console.log('overId before: ', overId)
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(container => {
              return (
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
              )
            })
          })[0]?.id
          // console.log('overId after: ', overId)
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      // neu over id null thi tra ve mang rong - tranh crash trang
      return lastOverId.current ? [{ id: lastOverId }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      sensors={sensors}
      // thuat toan phat hien va cham
      // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      // collisionDetection={closestCorners}
      // neu dung closestCorners thi se co loi flicking khi de card co img giua 2 column
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: theme => theme.trelloCustom.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}
      >
        {/* Board column */}

        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
