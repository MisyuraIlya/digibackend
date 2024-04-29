import React, { FC } from 'react'

interface BigButtonProps {
  onClickBtn: () => void
  imgLink?: string
  color?: string
  googleIcon?: string
}

const BigButton: FC<BigButtonProps> = ({
  onClickBtn,
  imgLink,
  color,
  googleIcon,
}) => {
  return (
    <div
      className={`BigButton myCenterAlign ${color}`}
      onClick={() => onClickBtn()}
    >
      {googleIcon ? (
        <span className="material-symbols-outlined">{googleIcon}</span>
      ) : (
        <img src={imgLink} />
      )}
    </div>
  )
}

export default BigButton
