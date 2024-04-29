import React from 'react'
import { useClientStore } from '../../store/ClientsStore'
import { useNavigate, useParams } from 'react-router-dom'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { Box, Typography } from '@mui/material'
import useDataClients from '../../hooks/useDataUsers'

type RouteParams = {
  userRole: ROLE_TYPES
}

const UserFilter = () => {
  const { search, setSearch } = useClientStore()
  const navigate = useNavigate()
  const { data } = useDataClients()
  const { userRole } = useParams<RouteParams>()
  const handleDebouce = (value: string) => {
    if (value) {
      const urlSearchParams = new URLSearchParams(location.search)
      urlSearchParams.set('search', value)
      const url = urlSearchParams.toString()
      navigate(`/admin/${userRole}?${url}`)
    }
  }
  const total = data?.['hydra:totalItems'] ?? 0

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
      }}
    >
      <Box>
        <SearchInput
          placeholder="חיפוש לקוח"
          handleFunction={handleDebouce}
          value={search}
          setValue={setSearch}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1">{'נמצאו: ' + total + ' לקוחות'}</Typography>
      </Box>
    </Box>
  )
}

export default UserFilter
