import React, { FC, ReactNode, MouseEvent, useEffect } from 'react'
import AgentsList from '../components/AgentList'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { Container, Grid } from '@mui/material'

interface ContainerProps {
  children: ReactNode
}

const AgentContainer: FC<ContainerProps> = ({ children }) => {
  const { isSuperAgent, isAdmin } = useAuth()
  // const { fetchAgentsList } = useAgentProfileStore()

  // useEffect(() => {
  //   if (agentsList.length == 0) {
  //     fetchAgentsList()
  //   }
  // }, [])
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* {(isSuperAgent || isAdmin) &&  */}
          <AgentsList />
          {/* // } */}
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default AgentContainer
