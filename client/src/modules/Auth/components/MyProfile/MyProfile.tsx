import React from 'react'
import { useAuth } from '../../store/useAuthStore'
import { Paper, Typography, Grid, Button } from '@mui/material'

const MyProfile = () => {
  const { user, logOut } = useAuth()

  return (
    <>
      <Typography variant="h4">אזור אישי</Typography>
      <Paper elevation={4} sx={{ padding: '15px 40px', marginTop: '20px' }}>
        <Grid container spacing={1}>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'שם'}</Typography>
            <Typography variant="body1">{user?.name}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'מייל'}</Typography>
            <Typography variant="body1">{user?.email}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'טלפון'}</Typography>
            <Typography variant="body1">{user?.phone}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'אובליגו'}</Typography>
            <Typography variant="body1">{user?.maxCredit}</Typography>
          </Grid>
          <Grid item sm={2} xs={6}>
            <Typography variant="h6">{'יתרת חוב'}</Typography>
            <Typography variant="body1">{user?.maxCredit}</Typography>
          </Grid>
          <Grid item sm={2} xs={6} className="centered">
            <Button
              variant="contained"
              sx={{ fontSize: '19px' }}
              onClick={() => logOut()}
            >
              התנתק
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default MyProfile
