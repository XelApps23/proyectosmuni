import { ReactElement } from 'react'
import Login from './login-form'
import LoginLayout from '@/layout/Login'

const LayoutInicio = () => {
  return (
    <div className="flex h-screen">
       <div className="w-full md:w-1/2 bg-blue1 hidden md:block">
        <div className="h-full flex flex-col justify-center items-center space-y-4  font-['Nunito Sans'] text-white1">
          <p className="text-center text-[2.734vw]">
            Empieza a organizar tus proyectos
          </p>
          <p className="text-center text-[2.734vw]">
            de la mejor manera posible
          </p>
          <p className="text-center text-[2.734vw]">
            con XelApps
          </p>
          <img
            className="h-100"
            src="/login-images/login.png"
            alt="Imagen Login"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white2">
        <div className="m-5 md:mr-0">
          <Login ></Login>
        </div>
      </div>
    </div>
  )
}

LayoutInicio.layout = function layout (page: ReactElement) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  )
}
export default LayoutInicio
