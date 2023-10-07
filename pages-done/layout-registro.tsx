/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LayoutInicio: React.FC = () => {
  return (
    <div className="flex h-screen flex-row-reverse" id='principal'>
      <div className="w-1/2 bg-[#1F76C2] flex items-center justify-center" id='presentacion'>
        <div id='texto' className="flex flex-col justify-center items-center space-y-4 font-nunito-sans text-white">
          <p className='text-center text-[2.734vw]'>Colabora con tus compañeros</p>
          <p className='text-center text-[2.734vw]'>de la mejor manera posible</p>
          <p className='text-center text-[2.734vw]'>con XelApps</p>
          <img className="max-w-[100%] h-auto" src="/login-images/registro.png" alt="Imagen Registro"/>
        </div>
      </div>
      <div className="w-1/2 bg-[#F3F3F3]" id='login-section'>
        <p style={{ fontSize: '1em' }}>Form de Registro</p>
      </div>
    </div>
  )
}

export default LayoutInicio
