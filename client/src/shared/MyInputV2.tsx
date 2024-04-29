import React, { FC } from 'react'

interface MyInputV2Props {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const MyInputV2: FC<MyInputV2Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-cont">
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="text"
        placeholder={placeholder}
      />
      {value ? (
        <span
          className="material-symbols-outlined search-img"
          onClick={() => onChange('')}
        >
          close
        </span>
      ) : (
        <span className="material-symbols-outlined search-img">search</span>
      )}
    </div>
  )
}

export default MyInputV2
