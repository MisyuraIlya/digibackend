import { Box, Card, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import TargetList from '../components/agentTargets/TargetList'
import useDataAgentTargets from '../hooks/useDataAgentTargets'
import moment from 'moment'

interface OptionType {
  value: string
  label: string
}

const AgentTargets = () => {
  const [year, setYear] = useState(moment().year().toString())

  const dates: OptionType[] = [
    {
      value: (moment().year() - 1).toString(),
      label: (moment().year() - 1).toString(),
    },
    { value: moment().year().toString(), label: moment().year().toString() },
    {
      value: (moment().year() + 1).toString(),
      label: (moment().year() + 1).toString(),
    },
  ]

  return (
    <Box>
      <Card sx={{ padding: '10px 20px', borderRadius: '5px' }}>
        <Select
          value={year}
          sx={{ height: '40px', minWidth: '150px' }}
          onChange={(e) => setYear(e.target.value)}
        >
          {dates?.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </Card>

      <TargetList year={year} />
    </Box>
  )
}

export default AgentTargets
