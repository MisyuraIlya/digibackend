import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import Loader from '../../../shared/Loader'
import useDataClients from '../hooks/useDataUsers'
import { useParams } from 'react-router-dom'
import UserList from '../components/Clients/UserList'
import UserFilter from '../components/Clients/UserFilter'

type RouteParams = {
  userRole: ROLE_TYPES
}
const Users = () => {
  const { hydraPagination, isLoading } = useDataClients()
  const { userRole } = useParams<RouteParams>()

  let componentToRender: React.ReactNode

  switch (userRole) {
    case 'ROLE_USER':
    case 'ROLE_AGENT':
    case 'ROLE_SUPER_AGENT':
      componentToRender = <UserList />
      break
    default:
      componentToRender = <Box>{'לא נמצא סוג לקוח כזה'}</Box>
  }

  return (
    <Container maxWidth="lg">
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: userRole == 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות',
            link: '',
          },
        ]}
      />
      <Typography variant="h5">
        {userRole == 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות'}
      </Typography>
      <UserFilter />
      {componentToRender}
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Container>
  )
}

export default Users
