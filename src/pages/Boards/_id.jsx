// board details

import Container from '@mui/material/Container'
import { cloneDeep } from 'lodash'
import AppBar from '~/components/AppBar/AppBar'

import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import {
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  useEffect(() => {
    const boardId = '671210d38975d009e2a50179'
    //call api
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  // goi api khi xu ly xong keo tha
  const moveColumns = async dndOrderedColumns => {
    // thuc ra doan nay ko phai clone deep va dung spreedoperator duoc, vi khong push lam 2 mang merge vs nhau
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    // SET BOARD nhu SETSTATE TRONG REDUX
    dispatch(updateCurrentActiveBoard(newBoard))
    // console.log(newBoard)
    // goi api update board
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }
  // cap nhat orderColumnIds
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // update state board
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      column => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    // SET BOARD nhu SETSTATE TRONG REDUX
    dispatch(updateCurrentActiveBoard(newBoard))
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    // console.log('moveCardToDifferentColumn ~ currentCardId:', currentCardId)
    // console.log('moveCardToDifferentColumn ~ prevColumnId:', prevColumnId)
    // console.log('moveCardToDifferentColumn ~ nextColumnId:', nextColumnId)
    // console.log(
    //   'moveCardToDifferentColumn ~ dndOrderedColumns:',
    //   dndOrderedColumns
    // )
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    // SET BOARD nhu SETSTATE TRONG REDUX
    // o day se bi loi khi shallow copy ()
    // https://redux-toolkit.js.org/usage/immer-reducers
    dispatch(updateCurrentActiveBoard(newBoard))

    // goi api
    let prevCardOrderIds = dndOrderedColumns.find(
      c => c._id === prevColumnId
    )?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)
        ?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          // da dung redux
          // createNewColumn={createNewColumn}
          // createNewCard={createNewCard}
          // deleteColumnDetails={deleteColumnDetails}

          // 3 th nay di xuong 1 cap thoi nen khong can thiet dung redux
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board
