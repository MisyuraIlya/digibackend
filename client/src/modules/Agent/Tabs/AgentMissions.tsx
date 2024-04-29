import { Box, Fab } from '@mui/material'
import React, { useState } from 'react'
import MyScheduleCalendar from '../components/agentMissions/MyScheduleCalendar'
import WeekFilter from '../components/WeekFilter'
import AddIcon from '@mui/icons-material/Add'
import CreateMissionModal from '../components/agentMissions/CreateMissionModal'

const AgentMissions = () => {
  const [open, setOpen] = useState(false)
  return (
    <Box>
      <WeekFilter />
      <MyScheduleCalendar />
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          right: '50px',
          bottom: '50px',
          borderRadius: '5px',
          width: '80px',
          height: '80px',
        }}
      >
        <AddIcon style={{ fontSize: '50px' }} />
      </Fab>
      <CreateMissionModal open={open} setOpen={setOpen} />
    </Box>
  )
}

export default AgentMissions
