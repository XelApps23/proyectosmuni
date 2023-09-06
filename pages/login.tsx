// import { FormEvent } from 'react'

import styles from '../styles/login.module.css';

export default function loginPage() {
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
            <form>
            
            <p className={styles.txt}>Correo electrónico</p>
            <input type="email" name="email" className={styles.input}/>
            
            <p className={styles.txt}>Contraseña</p>
            <input type="password" name="password" className={styles.input}/>
            
            <p className={styles.txtblue}>¿Olvidaste tu contraseña?</p>
            <button type="submit" className={styles.btn}>Iniciar sesión</button>
            
            </form>
        </div>

    )
}