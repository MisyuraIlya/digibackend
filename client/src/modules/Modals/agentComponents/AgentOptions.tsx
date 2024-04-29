import React, { FC } from 'react'
import ModalWrapper from '../components/ModalWrapper/ModalWrapper'
import AgentActions from '../../Agent/components/AgentActions'

interface AgentOptionsProps {
  active: boolean
  setActive: (value: boolean) => void
}

const AgentOptions: FC<AgentOptionsProps> = ({ active, setActive }) => {
  return (
    <ModalWrapper active={active} setActive={setActive} height={60} width={30}>
      <AgentActions colsNumber={6} />
    </ModalWrapper>
  )
}

export default AgentOptions
