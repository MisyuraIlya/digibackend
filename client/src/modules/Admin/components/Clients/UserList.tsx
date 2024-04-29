import React from 'react'
import UserItem from './UserItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box, Divider } from '@mui/material'
import useDataUsers from '../../hooks/useDataUsers'
import HeadUser from './HeadUser'

const UserList = () => {
  const { data, isLoading } = useDataUsers()
  return (
    <Box>
      <HeadUser />
      {isLoading && (
        <Skeleton style={{ height: '30px', margin: '5px 0px' }} count={24} />
      )}
      {data?.['hydra:member']?.map((element, index) => {
        return (
          <Box key={index}>
            <UserItem element={element} index={index} />
            <Divider sx={{ width: '100%' }} />
          </Box>
        )
      })}
    </Box>
  )
}

export default UserList
