import React from 'react'
import NotificationItem from './notificationItem'
import { Box } from '@mui/material'
import useDataNotification from '../../hooks/useDataNotification'

const RightSide = () => {
  const { data } = useDataNotification()
  return (
    <Box>
      {data?.['hydra:member']?.map((element, index) => {
        return <NotificationItem element={element} index={index} />
      })}
    </Box>
  )
}

export default RightSide
