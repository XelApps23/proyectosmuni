import { ReactElement } from 'react'
import Login from './login-form'
import LoginLayout from '@/layout/Login'

const LayoutInicio = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue1 flex items-center justify-center">
        <div
          className="flex flex-col justify-center md:block items-center space-y-4 font-nunito-sans font-light"
          style={{ color: 'white' }}
        >
          <p className="text-center text-[2.734vw]">
            Empieza a organizar tus proyectos
          </p>
          <p className="text-center text-[2.734vw]">
            de la mejor manera posible
          </p>
          <p className="text-center text-[2.734vw]">con XelApps</p>
          <img
            className="max-w-full h-auto"
            src="/login-images/login.png"
            alt="Imagen Login"
          />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-[#F3F3F3]">
        <Login></Login>
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
