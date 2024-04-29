import React, { FC, ReactNode, MouseEvent } from 'react'

interface WrapProps {
  children: ReactNode
  bg?: string
  onClick?: () => void
}

const Wrap: FC<WrapProps> = ({ children, bg, onClick }) => {
  return (
    <div
      className={`Wrap ${bg}`}
      onClick={
        onClick
          ? (((e: MouseEvent<HTMLDivElement>) =>
              onClick()) as React.MouseEventHandler<HTMLDivElement>)
          : undefined
      }
    >
      {children}
    </div>
  )
}

export default Wrap
