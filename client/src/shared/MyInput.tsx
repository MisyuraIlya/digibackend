import React, { FC } from 'react'

interface MyInputProps {
  googleIcons: string
  register: any
  name: string
  type: string
  placeholder: string
  disabled: boolean
}

const MyInput: FC<MyInputProps> = ({
  googleIcons,
  register,
  name,
  type,
  placeholder,
  disabled,
}) => {
  return (
    <div className="clientsAgentSearchWrapper">
      <div className="search-cont">
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <span className="material-symbols-outlined search-img">
          {googleIcons}
        </span>
      </div>
    </div>
  )
}

export default MyInput
