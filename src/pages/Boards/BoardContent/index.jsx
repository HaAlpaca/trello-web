import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddCardIcon from '@mui/icons-material/AddCard'
import { useState } from 'react'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: theme => theme.trelloCustom.boardContentHeight,
        display: 'flex',
        p: '5px 0'
      }}
    >
      {/* Board column */}
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { margin: 2 }
        }}
      >
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: theme =>
              theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: theme =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`
          }}
        >
          {/* Box Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Column Title
            </Typography>
            <Box>
              <Box>
                <Tooltip title="More options">
                  <ExpandMoreIcon
                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                    id="basic-column-dropdown"
                    aria-controls={
                      open ? 'basic-menu-column-dropdown' : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                {/* dropdown */}
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>

          {/* Box card */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: theme =>
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(
                  5
                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,

              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Alpaca</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>

            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: theme =>
              theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: theme =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`
          }}
        >
          {/* Box Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Column Title
            </Typography>
            <Box>
              <Box>
                <Tooltip title="More options">
                  <ExpandMoreIcon
                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                    id="basic-column-dropdown"
                    aria-controls={
                      open ? 'basic-menu-column-dropdown' : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                {/* dropdown */}
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>

          {/* Box card */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: theme =>
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(
                  5
                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,

              '&::-webkit-scrollbar': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Alpaca</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>

            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
