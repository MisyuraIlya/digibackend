import { Box, Drawer, IconButton } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { themeColors } from '../../../../styles/mui'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'
import { useMobile } from '../../../Mobile/store/mobile.store'

const Left = () => {
  const navigate = useNavigate()
  const { setSHowMobileSearch, showMobileSearch } = useMobile()
  return (
    <>
      <IconButton onClick={() => setSHowMobileSearch(!showMobileSearch)}>
        <SearchIcon sx={{ fontSize: '35px', color: themeColors.primary }} />
      </IconButton>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIosNewIcon
          sx={{ fontSize: '30px', color: themeColors.primary }}
        />
      </IconButton>
      {/* <Drawer
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
        </Drawer> */}
    </>
  )
}

export default Left
