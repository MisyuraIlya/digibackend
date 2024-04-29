import React, { FC, ReactNode } from 'react'
interface MyCardProps {
  children: ReactNode
}

const MyCard: FC<MyCardProps> = ({ children }) => {
  return <div className="MyCard">{children}</div>
}

export default MyCard
