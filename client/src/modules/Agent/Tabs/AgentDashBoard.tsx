import { Box } from '@mui/material'
import React from 'react'
import AgentPerformanceInfo from '../components/AgentPerformanceInfo'
import VisitsDashboard from '../components/VisitsDashboard'
import NearestObjectives from '../components/NearestObjectives'
import TargetsDashboard from '../components/TargetsDashboard'

const AgentDashBoard = () => {
  return (
    <Box>
      <AgentPerformanceInfo />
      <VisitsDashboard />
      <NearestObjectives />
      <TargetsDashboard />
    </Box>
  )
}

export default AgentDashBoard
