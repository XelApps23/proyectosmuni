import { auth } from '@/services/Firebase'
import { loginRedux } from '@/store/login'
import { onAuthStateChanged } from 'firebase/auth'
import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

interface Props {
  children: ReactNode | ReactNode[]
}

export default function Default({ children }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()

  const { logged } = useSelector((state) => state.login)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user === null) {
        dispatch(
          loginRedux({
            status: false,
            username: undefined,
            id: undefined
          })
        )
        router.push('/login')
      } else {
        dispatch(
          loginRedux({
            status: true,
            username: user.email,
            id: user.uid
          })
        )
      }
    })
  }, [])

  return (
    <div className="bg-fondo h-screen">
      {logged && (
        <>
          <Sidebar />
          <Header />
          <div className="ml-48 bg-fondo p-4 pt-14 min-h-full">
            {children}
          </div>
        </>
      )}
    </div>
  )
}
