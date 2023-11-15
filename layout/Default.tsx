import { auth } from '@/services/Firebase'
import { addPermissionsRedux, loginRedux } from '@/store/login'
import { onAuthStateChanged } from 'firebase/auth'
import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import useRoles from '@/hooks/useRoles'
import useUsers from '@/hooks/useUsers'

interface Props {
  children: ReactNode | ReactNode[]
}

export default function Default({ children }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()

  const { logged, id } = useSelector((state) => state.login)
  const { getRole, roles } = useRoles()
  const { getUser, users } = useUsers()

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
        getUser(user.uid)
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

  useEffect(() => {
    if (users[id]) {
      getRole(users[id].role)
    }
  }, [users])

  useEffect(() => {
    if (roles[users[id]?.role]) {
      dispatch(
        addPermissionsRedux({
          permissions: roles[users[id].role].permissions
        })
      )
    }
  }, [roles])

  return (
    <div className="bg-fondo h-screen">
      {logged && (
        <>
          <Sidebar />
          <Header />
          <div className="md:ml-48 ml-0 bg-fondo p-4 pt-[72px] min-h-full">
            {children}
          </div>
        </>
      )}
    </div>
  )
}
