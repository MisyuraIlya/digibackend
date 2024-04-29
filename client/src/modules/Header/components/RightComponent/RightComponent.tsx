import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AppsIcon from '@mui/icons-material/Apps'
import { AdminURL, agentURL } from '../../../../enums/url'
import { themeColors } from '../../../../styles/mui'
const RightComponent = () => {
  const { user, isAgent, isAdmin } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openAdminSideBar, setOpenAdminSideBar] = useState(false)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (LINK: string) => {
    if (typeof LINK === 'string') navigate(LINK)
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', gap: '20px' }} className="centered">
      {/* {isAdmin && ( */}
      <IconButton
        sx={{
          position: 'absolute',
          left: '10px',
          color: themeColors.primary,
        }}
        onClick={() => setOpenAdminSideBar(true)}
      >
        <AppsIcon sx={{ fontSize: '50px' }} />
      </IconButton>
      {/* )} */}
      <Link to={'/'}>
        <img
          src={`${process.env.REACT_APP_MEDIA}/logo.png`}
          alt=""
          style={{ width: '80%' }}
        />
      </Link>
      {isAgent && (
        <IconButton
          onClick={handleClick}
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <MenuIcon sx={{ height: '30px', width: '30px' }} />
        </IconButton>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Object.entries(agentURL).map(([key, value]) => (
          <MenuItem onClick={() => handleClose(value.LINK)} key={key}>
            <ListItemIcon>{value.ICON}</ListItemIcon>
            <ListItemText>{value.LABEL}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
      <Drawer
        open={openAdminSideBar}
        onClose={() => setOpenAdminSideBar(false)}
      >
        <Box className="centered" sx={{ marginTop: '50px' }}>
          <img
            src={`${process.env.REACT_APP_MEDIA}/logo.png`}
            alt=""
            style={{ width: '60%' }}
          />
        </Box>
        <Box>
          {Object.entries(AdminURL).map(([key, value]) => {
            return (
              <MenuItem
                key={key}
                sx={{ margin: '20px' }}
                onClick={() => {
                  navigate(value.LINK)
                  setOpenAdminSideBar(false)
                }}
              >
                <ListItemIcon sx={{ color: themeColors.primary }}>
                  {value.ICON}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">{value.LABEL}</Typography>
                </ListItemText>
              </MenuItem>
            )
          })}
        </Box>
      </Drawer>
    </Box>
  )
}

export default RightComponent
