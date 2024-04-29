import React, { FC, useEffect } from 'react'
import { useAuth } from '../store/useAuthStore'

interface AuthButtonProps {
  username: string
  password: string
}
const AuthButton: FC<AuthButtonProps> = ({ username, password }) => {
  const { login } = useAuth()

  const enterListener = (event: any) => {
    if (event.keyCode === 13) {
      login(username, password)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', enterListener, true)

    return () => {
      window.removeEventListener('keydown', enterListener, true)
    }
  }, [login, username, password])

  return <button onClick={() => login(username, password)}>כניסה</button>
}

export default AuthButton
