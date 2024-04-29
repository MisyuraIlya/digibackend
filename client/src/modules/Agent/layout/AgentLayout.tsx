import React, { ReactNode, FC } from 'react'
import TabsBanner from './TabsBanner'
interface AgentLayoutProps {
  children: ReactNode
}

const AgentLayout: FC<AgentLayoutProps> = ({ children }) => {
  return (
    <div className="myLayout myDisplay">
      <TabsBanner />
      {children}
    </div>
  )
}

export default AgentLayout
