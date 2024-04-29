import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

type RouteParams = {
  userRole: ROLE_TYPES
}

const HeadUser = () => {
  const { userRole } = useParams<RouteParams>()
  const isUser = userRole === 'ROLE_USER'
  const isAgent = userRole === 'ROLE_AGENT'
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Typography variant="body1">מס'</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1">{isUser ? 'לקוח' : 'סוכן'}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">סטאטוס</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1">מידע</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1">פעולות</Typography>
      </Grid>
      {isAgent && (
        <Grid item xs={1}>
          <Typography variant="body1">מאסטר</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default HeadUser
