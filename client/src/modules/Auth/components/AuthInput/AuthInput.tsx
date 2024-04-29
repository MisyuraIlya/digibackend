import React, { FC } from 'react'

interface AuthInputProps {
  title: string
  error: string
  name: string
  register: any
}

const AuthInput: FC<AuthInputProps> = ({ title, error, name, register }) => {
  return (
    <div className="input-cont">
      {error && <div style={{ color: 'rgb(241, 68, 68)' }}>{error}</div>}

      <p>{title}</p>
      <input
        type="text"
        {...register(name, {
          required: `${title} שדה חובה`,
        })}
      />
    </div>
  )
}

export default AuthInput
