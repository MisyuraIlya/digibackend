import React, { useState } from 'react'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { Box, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import useDataAgentClients from '../../hooks/useDataAgentClients'

const AgentClientsFilter = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { agentId } = useParams()
  const { data } = useDataAgentClients()
  const handleDebouce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('search', value)
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const totalCount = data?.['hydra:totalItems'] ?? 0

  return (
    <Box
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '50%' }}>
        <SearchInput
          handleFunction={handleDebouce}
          value={search}
          setValue={setSearch}
          placeholder="חיפוש לפי שם לקוח או מספר לקוח"
        />
      </Box>
      <Box className="centered">
        <Typography variant="body1">{`סה״כ לקוחות: ${totalCount}`}</Typography>
      </Box>
    </Box>
  )
}

export default AgentClientsFilter
