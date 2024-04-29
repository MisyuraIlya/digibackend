import React from 'react'
import Select from 'react-select'
import { useAuth } from '../store/useAuthStore'

const AtarSelection = () => {
  const { user, setAtarSelected, atarSelected } = useAuth()

  const onChangeAtar = (extId: string | undefined) => {
    if (extId) {
      const find = user?.atarim?.find((item) => item.extId == extId)
      if (find) {
        setAtarSelected(find)
      }
    }
  }

  return (
    <>
      <Select
        options={user?.atarim?.map((item) => {
          return { value: item.extId, label: item.title }
        })}
        placeholder={'בחר שנה'}
        value={{
          value: atarSelected?.extId,
          label: atarSelected?.title,
        }}
        onChange={(e) => onChangeAtar(e?.value)}
      />
    </>
  )
}

export default AtarSelection
