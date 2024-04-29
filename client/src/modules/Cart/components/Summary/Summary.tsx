import React from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import MainSummary from '../MainSummary/MainSummary'
import SendOrderButton from '../SendOrderButton/SendOrderButton'
import { Box, Container, Paper, Typography } from '@mui/material'

const Summary = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={400} fontSize={24}>
          {'פרטי מסמך'}
        </Typography>
        <MainSummary />
        {/* <SendOrderButton /> */}
      </Box>
    </Container>
  )
}

export default Summary
