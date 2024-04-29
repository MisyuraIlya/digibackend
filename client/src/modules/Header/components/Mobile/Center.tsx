import React from 'react'
import { Link } from 'react-router-dom'

const Center = () => {
  return (
    <Link to={'/'}>
      <img
        src={`${process.env.REACT_APP_MEDIA}/logo.png`}
        alt=""
        style={{ width: '80%' }}
      />
    </Link>
  )
}

export default Center
