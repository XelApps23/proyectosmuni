import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '@/components/main/Input'
import Button from '../main/Button'
import { useEffect } from 'react'

const schema = yup.object().shape({
  firstName: yup.string().required('Es necesario ingresar un nombre'),
  lastName: yup.string().notRequired(),
  age: yup
    .number()
    .positive()
    .typeError('Es necesario ingresar una edad')
    .integer()
    .min(18, 'La edad ingresada debe ser mayor a 18')
    .required('Es necesario ingresar una edad'),
  email: yup
    .string()
    .email('Debe ingresar una dirección de correo válida')
    .required('Es necesario ingresar un correo'),
  password: yup.string().required('Es necesario ingresar una contraseña'),

  initDate: yup
    .date()
    .typeError('Es necesario ingresar una fecha de inicio')
    .required('Es necesario ingresar una fecha de inicio')
})

type FormValues = {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
  initDate: Date
}

const ExampleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: FormValues) => {
    console.log(data)
    alert(JSON.stringify(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="firstName"
          label="Nombre"
          error={errors.firstName}
          size="md"
        />
        <Input
          control={control}
          name="lastName"
          label="Apellido"
          error={errors.lastName}
          size="md"
        />
        <Input
          control={control}
          name="email"
          type="email"
          label="Correo"
          error={errors.email}
          size="md"
        />
        <Input
          control={control}
          name="age"
          type="number"
          label="Edad"
          error={errors.age}
          size="md"
        />
        <Input
          control={control}
          name="password"
          type="password"
          label="Contraseña"
          error={errors.password}
          size="md"
        />
        <Input
          control={control}
          name="initDate"
          type="date"
          label="Fecha de inicio"
          error={errors.initDate}
          size="md"
        />
        <Button type="submit" text="Enviar" variant="primary" />
      </form>
    </div>
  )
}

export default ExampleForm
