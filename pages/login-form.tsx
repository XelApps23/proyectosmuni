// import { FormEvent } from 'react'

import { useForm } from 'react-hook-form'
import styles from '../styles/login.module.css'
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

export default function LoginPage() {
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
    <div className={styles.container}>
      <p className={styles.bv}>Bienvenido de vuelta</p>
      <p className={styles.pis}>Para comenzar, inicia sesión</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.txt}>Correo electrónico</p>
        <input type="email" {...register('email')} className={styles.input} />

        <p className={styles.txt}>Contraseña</p>
        <input
          type="password"
          className={styles.input}
          {...register('password')}
        />

        <p className={styles.txtblue}>¿Olvidaste tu contraseña?</p>
        <button type="submit" className={styles.btn}>
          Iniciar sesión
        </button>
        {error && error}
      </form>
    </div>
  )
}
