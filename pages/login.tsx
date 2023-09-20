import Login from './login-form'

const LayoutInicio = () => {
  return (
    <div className="flex h-screen">
      <div className="md:w-1/2 bg-blue1 hidden sm:block">
        <div className="h-full flex flex-col justify-center items-center space-y-4 font-nunito-sans font-light" style={{ color: 'white' }}>
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
            className="max-w-full h-auto"
            src="/login-images/login.png"
            alt="Imagen Login"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white2">
        <Login></Login>
      </div>
    </div>
  )
}

export default LayoutInicio
