import React from 'react'
import Loader from '../../../shared/Loader'
import { Container } from '@mui/material'
import useDataAgentClients from '../hooks/useDataAgentClients'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import AgentClientsList from '../components/agentClients/AgentClientsList'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import AgentClientsFilter from '../components/agentClients/AgentClientsFilter'

const AgentClinets = () => {
  const { hydraPagination, isLoading } = useDataAgentClients()

  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil
        array={[
          {
            title: 'לקוחות שלי',
            link: '',
          },
        ]}
      />
      {isLoading && <Loader />}
      <AgentClientsFilter />
      <AgentClientsList />
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Container>
  )
}

export default AgentClinets
