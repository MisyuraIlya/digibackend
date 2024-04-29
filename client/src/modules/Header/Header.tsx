import React, { useState } from 'react'
import LeftComponent from './components/LeftComponent/LeftComponent'
import { useAuth } from '../Auth/store/useAuthStore'
import RightComponent from './components/RightComponent/RightComponent'
import CenterComponent from './components/CenterComponent/CenterComponent'
import CategoryNavBar from './components/CategoryNavBar/CategoryNavBar'
import { AppBar, Grid, Toolbar, useMediaQuery } from '@mui/material'
import Mobile from './components/Mobile'
const Header = () => {
  const isMobile = useMediaQuery('(max-width:800px)')

  return (
    <AppBar position="fixed">
      {isMobile ? (
        <>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                <Mobile.Right />
              </Grid>
              <Grid item xs={6} className="centered">
                <Mobile.Center />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                }}
              >
                <Mobile.Left />
              </Grid>
            </Grid>
          </Toolbar>
          <Mobile.CategoryNavBarMobile />
          <Mobile.SearchBar />
        </>
      ) : (
        <>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={4} className="centered">
                <RightComponent />
              </Grid>
              <Grid item xs={5} className="centered">
                <CenterComponent />
              </Grid>
              <Grid item xs={3} className="centered">
                <LeftComponent />
              </Grid>
            </Grid>
          </Toolbar>
          <CategoryNavBar />
        </>
      )}
    </AppBar>
  )
}

export default Header
