// import { FormEvent } from 'react'

import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";

type FormValues = {
  email: string
  password: string
}

export default function loginPage() {

  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
    
    // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //     event.preventDefault()

  //     const formData = new FormData(event.currentTarget)
  //     const response = await fetch('/api/submit', {
  //         method: 'POST',
  //         body: formData,
  //     })

  //     // Handle response if necessary
  //     const data = await response.json()
  //     // ...
  // }

  return (
    <div className={styles.container}>
      <p className={styles.bv}>Bienvenido de vuelta</p>
      <p className={styles.pis}>Para comenzar, inicia sesión</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.txt}>Correo electrónico</p>
        <input type="email" {...register("email")} className={styles.input} />

        <p className={styles.txt}>Contraseña</p>
        <input type="password" className={styles.input} {...register("password")} />

        <p className={styles.txtblue}>¿Olvidaste tu contraseña?</p>
        <button type="submit" className={styles.btn}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
