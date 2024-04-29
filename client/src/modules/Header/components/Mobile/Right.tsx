import {
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AdminURL } from '../../../../enums/url'
import { useNavigate } from 'react-router-dom'
import theme, { themeColors } from '../../../../styles/mui'

const Right = () => {
  const [openAdminSideBar, setOpenAdminSideBar] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <IconButton onClick={() => setOpenAdminSideBar(true)}>
        <MenuIcon sx={{ fontSize: '35px', color: themeColors.primary }} />
      </IconButton>
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
    </>
  )
}

export default Right
