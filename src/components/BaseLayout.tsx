import { onAuthStateChanged } from 'firebase/auth'
import Sidebar from './Sidebar'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '@/services/Firebase'
import { loginRedux } from '@/store/login'
import SearchIcon from '@/components/icons/SearchIcon'
interface Props {
  children: ReactNode | ReactNode[]
}

export default function BaseLayout ({ children }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()

  const { logged } = useSelector((state) => state.login)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
    <div className="h-screen">
      {logged && (
            <div className="flex h-full ">
              <Sidebar />
            <div className='w-full h-full bg-fondo'>
            <div className=' w-full h-12 flex justify-center items-center'>
              <div className='mx-5 w-4 h-4'><SearchIcon/></div>
                  <p className='mx-5 px-4 border border-blue2 rounded'>Buscador</p>
              </div>
              <div className=' overflow-auto w-full pl-6 pr-8'>
                              {/* Aqui se debe agregar la barra de busqueda */}
              {children}
              </div>
            </div>
            </div>
      )}
    </div>
  )
}
