import { auth } from '@/services/Firebase'
import { logoutRedux } from '@/store/login'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const SignOff = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    logout()
  }, [])

  const logout = () => {
    dispatch(logoutRedux())
    signOut(auth)
  }

  return <div></div>
}

export default SignOff
