// import { FormEvent } from 'react'
import Button from '@/components/main/Button'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { loginRedux } from '@/store/login'
import { auth } from '@/services/Firebase'

type FormValues = {
  email: string
  password: string
}

export default function LoginPage () {
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm<FormValues>()

  const router = useRouter()
  const dispatch = useDispatch()
  const { logged } = useSelector((state) => state.login)

  useEffect(() => {
    if (logged) {
      router.push('/')
    }
  }, [logged])

  const onSubmit = async (data: FormValues) => {
    setError('')
    await setPersistence(auth, browserLocalPersistence)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        dispatch(
          loginRedux({
            status: true,
            username: user.email,
            id: user.uid
          })
        )
      })
      .catch(() => {
        setError('Correo o contraseña incorrecta')
      })
  }

  return (
    <div className="flex flex-col justify-center p-12 gap-6 rounded-lg bg-white1 shadow-lg md: w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-center">
          <p className="text-black1 text-2xl font-normal font-['Nunito Sans'] items-center md:text-4xl mb-2">Bienvenido de vuelta</p>
          <p className="text-gray1 text-lg font-normal py-3 md:text-3xl">Para comenzar, inicia sesión</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-black1 text-xs md:text-sm mt-1 mb-2">Correo electrónico</p>
          <input type="email" {...register('email')} className="bg-white h-9 w-full border-2 p-1 rounded-lg border-white2 focus:outline-none focus:border-blue1 focus:ring-1 focus:ring-blue1 invalid:border-errorDefault invalid:text-black focus:invalid:border-errorDefault focus:invalid:ring-1 focus:invalid:ring-errorDefault" />

          <p className="text-black1 text-xs md:text-sm mt-1 mb-2">Contraseña</p>
          <input
            type="password" {...register('password')} className="bg-white h-9 w-full border-2 p-1 rounded-lg border-white2 focus:outline-none focus:border-blue1 focus:ring-1 focus:ring-blue1 invalid:border-errorDefault invalid:text-black focus:invalid:border-errorDefault focus:invalid:ring-1 focus:invalid:ring-errorDefault"
          />
          <p className="text-blue1 text-xs md:text-sm mt-2 mb-6">¿Olvidaste tu contraseña?</p>
        <Button text="Iniciar sesión" variant="login" onClick={handleSubmit(onSubmit)} />
        {error && error}
      </form>
    </div>
  )
}
