import { onAuthStateChanged } from 'firebase/auth'
import Sidebar from './Sidebar'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '@/services/Firebase'
import { loginRedux } from '@/store/login'

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
    <div>
      {logged && (
        <>
          <div>
            <div className="w-[200px] h-[10px] left-[800px] top-[15px] p-1 absolute bg-white rounded-lg justify-center items-center inline-flex">
              {/* <div className="w-96 h-5 pl-5 pr-6 py-3 bg-white rounded-lg border border-slate-300 justify-start items-center gap-40 inline-flex">
                <div className="text-stone-400 text-xs font-normal p-6 ">
                  Buscar.proyecto
                </div>
                <div className="p-9 justify-start items-center gap-2.5 flex ml-15">
                  <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 text-gray-300 " />
                  <div className="w-4 h-4 relative" />
                </div>
              </div> */}
            </div>
            <form>
              <div className="w-full relative flex justify-center items-center p-0 left-[150px] "></div>
            </form>
          </div>
          <div>
            <div className="flex h-screen relative">
              <Sidebar />
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
