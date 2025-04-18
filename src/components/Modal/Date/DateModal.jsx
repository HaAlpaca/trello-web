import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { DateTimePicker } from '@mui/x-date-pickers'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCardDetailsAPI } from '~/apis'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import {
  selectCurrentActiveCard,
  updateCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function DateModal({ SidebarItem, card }) {
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()
  const activeCardModal = useSelector(selectCurrentActiveCard)

  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined

  const [startDate, setStartDate] = useState(
    card.startDate ? moment(card.startDate) : moment(card.createdAt)
  )
  const [dueDate, setDueDate] = useState(
    card.dueDate
      ? moment(card.dueDate)
      : moment()
          .add(1, 'day')
          .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
  )
  const [reminder, setReminder] = useState(0)

  const handleTogglePopover = event => {
    setAnchorPopoverElement(prev => (prev ? null : event.currentTarget))
  }

  const handleStartDateChange = newValue => {
    if (newValue) {
      const newStartDate = moment(newValue)
      setStartDate(newStartDate)

      if (dueDate.isBefore(newStartDate)) {
        setDueDate(newStartDate.clone().add(1, 'day'))
      }
    }
  }

  const handleDueDateChange = newValue => {
    if (newValue) {
      const newDueDate = moment(newValue)
      if (newDueDate.isAfter(startDate)) {
        setDueDate(newDueDate)
      }
    }
  }

  const handleSubmit = async () => {
    const startTimestamp = startDate.valueOf()
    const dueTimestamp = dueDate.valueOf()

    let reminderTimestamp = null
    if (reminder !== '') {
      reminderTimestamp = dueTimestamp - reminder * 60 * 1000
    }

    const data = {
      startDate: startTimestamp,
      dueDate: dueTimestamp,
      reminder: reminderTimestamp
    }

    await updateCardDetailsAPI(card._id, { updateDueDate: data }).then(() => {
      const newBoard = cloneDeep(board)
      newBoard.columns.forEach(column => {
        column.cards.forEach(cardLoop => {
          if (cardLoop._id === card._id) {
            cardLoop.startDate = startTimestamp
            cardLoop.dueDate = dueTimestamp
            cardLoop.reminder = reminderTimestamp
          }
        })
      })
      dispatch(updateCurrentActiveBoard(newBoard))
      // update card modal
      const newActiveCardModal = cloneDeep(activeCardModal)
      newActiveCardModal.startDate = startTimestamp
      newActiveCardModal.dueDate = dueTimestamp
      newActiveCardModal.reminder = reminderTimestamp

      dispatch(updateCurrentActiveCard(newActiveCardModal))
      setAnchorPopoverElement(null)
    })
  }

  // Reminder options based on duration between startDate and dueDate
  const reminderOptions = useMemo(() => {
    const diffMinutes = dueDate.diff(startDate, 'minutes')
    const options = [
      { label: 'At time of due date', value: 0 },
      { label: '5 Minutes Before', value: 5 },
      { label: '10 Minutes Before', value: 10 },
      { label: '15 Minutes Before', value: 15 },
      { label: '1 Hour Before', value: 60 },
      { label: '2 Hours Before', value: 120 },
      { label: '1 Day Before', value: 1440 },
      { label: '2 Days Before', value: 2880 }
    ]
    return options.filter(option => option.value <= diffMinutes)
  }, [startDate, dueDate])

  return (
    <>
      <SidebarItem aria-describedby={popoverId} onClick={handleTogglePopover}>
        <WatchLaterOutlinedIcon fontSize="small" />
        Dates
      </SidebarItem>

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ height: '600px' }}
      >
        <Box
          sx={{
            px: 1,
            py: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
            Set up a Due Date
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 1.5
            }}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={params => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
              <DateTimePicker
                label="Due Date"
                value={dueDate}
                minDate={startDate}
                onChange={handleDueDateChange}
                renderInput={params => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel id="reminder-label">Reminder</InputLabel>
              <Select
                labelId="reminder-label"
                id="reminder-select"
                value={reminder}
                onChange={e => setReminder(e.target.value)}
              >
                {reminderOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <Button
                type="button"
                variant="outlined"
                color="error"
                sx={{ flex: 1 }}
              >
                Remove
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={handleSubmit}
                sx={{ flex: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default DateModal
