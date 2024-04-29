import React from 'react'
import RightSide from '../components/NotificationPage/RightSide'
import LeftSide from '../components/NotificationPage/LeftSide'
import { Container, Grid } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'

const NotificationPage = () => {
  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil
        array={[
          {
            title: 'הודעות',
            link: '/admin/notification',
          },
        ]}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <RightSide />
        </Grid>
        <Grid item xs={4}>
          <LeftSide />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotificationPage
