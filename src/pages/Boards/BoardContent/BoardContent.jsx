import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
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
      <ListColumns />
    </Box>
  )
}

export default BoardContent
