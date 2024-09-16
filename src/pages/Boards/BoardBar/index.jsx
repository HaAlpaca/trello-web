import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const MENU_STYLE = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  padding: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: theme => theme.trelloCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="Dashboard"
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          onClick={() => {}}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Create
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
        >
          <Tooltip title="HaAlpaca">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
            />
          </Tooltip>
          <Tooltip title="HaAlpaca">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
            />
          </Tooltip>
          <Tooltip title="HaAlpaca">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
            />
          </Tooltip>
          <Tooltip title="HaAlpaca">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
            />
          </Tooltip>
          <Tooltip title="HaAlpaca">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
            />
          </Tooltip>
          <Tooltip title="HaAlpaca">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/439586236_3664752570520746_2486317449040107640_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6zeg7s2TmZLG98iHiembXRSS7wPxRTNBFJLvA_FFM0M2BKWhJZu2oDq-GEUAnOG5mzQR_NwvqWqKR3-kIHEmO&_nc_ohc=j4jb4Vh7g7AQ7kNvgEnaUjk&_nc_ht=scontent.fhan19-1.fna&_nc_gid=ANZWWzFRWodjNbEC1IweY8m&oh=00_AYBqO_9ZQVL1yeUM1tdUGEF6Cbq-Yz8aWFlgLLvqDxwGhw&oe=66E96542"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
