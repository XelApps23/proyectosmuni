/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Login from './login-form'

const LayoutInicio: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#1F76C2] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4 font-nunito-sans font-light" style={{color: 'white'}}>
          <p className='text-center text-[2.734vw]'>de la mejor manera posible</p>
          <p className='text-center text-[2.734vw]'>con XelApps</p>
          <img className="max-w-[100%] h-auto" src="/login-images/login.png" alt="Imagen Login"/>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-[#F3F3F3]">
        <Login></Login>
      </div>
    </div>
  );
};

export default LayoutInicio;