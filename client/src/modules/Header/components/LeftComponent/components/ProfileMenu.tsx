import React, { useState } from 'react'
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import { themeColors } from '../../../../../styles/mui'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useCart } from '../../../../Cart/store/cart.store'
import { onAsk } from '../../../../../shared/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import { clientURL } from '../../../../../enums/url'

const ProfileMenu = () => {
  const { user, isAgent, agent, setAction, logOut, setUser } = useAuth()
  const { cart, selectedMode } = useCart()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const beforeLogOut = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בסל ימחקו')
    if (ask) {
      logOut()
    }
  }

  const handleClose = (value: IURL) => {
    if (typeof value.LINK === 'string') navigate(value.LINK)
    setAnchorEl(null)
  }

  const handleProfileClick = (e: any) => {
    e.stopPropagation()
    // setOpenProfile(!openProfile);
    setAction('login')
  }

  const handleLogOutClinet = async () => {
    if (cart.length > 0) {
      const ask = await onAsk('קיימים פריטים בסל', 'בטוח תרצה לצאת מהלקוח?')
      if (ask) {
        if (agent) {
          setUser(agent)
          navigate('/')
        }
      }
    } else {
      if (agent) {
        setUser(agent)
        navigate('/')
      }
    }
  }

  return (
    <>
      <Paper
        elevation={4}
        sx={{ margin: '5px 10px', padding: '10px', width: '180px' }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            background: themeColors.primary,
            padding: '4px',
          }}
        >
          לקוח
        </Typography>
        <Typography variant="body1" color={'black'} sx={{ margin: '5px 0' }}>
          {user?.name}
        </Typography>
        <Typography variant="body1" color={'black'} sx={{ margin: '5px 0' }}>
          {user?.extId}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            background: themeColors.secondary,
            padding: '4px',
          }}
        >
          {selectedMode == 'order' && 'הזמנה'}
          {selectedMode == 'quote' && 'ה.מחיר'}
          {selectedMode == 'return' && 'החזרה'}
        </Typography>
        <Button
          variant="outlined"
          fullWidth={true}
          sx={{ margin: '15px 0' }}
          onClick={() => beforeLogOut()}
        >
          התנתק
        </Button>
        {agent?.id !== user?.id && (
          <Button
            variant="outlined"
            fullWidth={true}
            onClick={() => handleLogOutClinet()}
          >
            התנתק מהלקוח
          </Button>
        )}
      </Paper>
      <Box sx={{ margin: '25px 10px' }}>
        {Object.entries(clientURL).map(([key, value]) => {
          if (value.SHOW_IN_PROFILE_MENU) {
            return (
              <MenuItem
                onClick={() => handleClose(value)}
                key={key}
                className="hoveredProfile"
                sx={{ marginTop: '10px' }}
              >
                <ListItemIcon>{value.ICON}</ListItemIcon>
                <ListItemText>{value.LABEL}</ListItemText>
              </MenuItem>
            )
          }
        })}
      </Box>
    </>
  )
}

export default ProfileMenu
