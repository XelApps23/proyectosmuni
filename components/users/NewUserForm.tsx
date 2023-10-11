import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'
import { useRouter } from 'next/router'
import Select from '../main/Select'
import useUsers from '@/hooks/useUsers'
import useRoles from '@/hooks/useRoles'
import { useEffect } from 'react'

const schema = yup.object().shape({
  firstname: yup.string().required('Debe de ingresar un nombre'),
  email: yup
    .string()
    .email('Debe de ingresar un correo válido')
    .required('Debe de ingresar un correo'),
  password: yup
    .string()
    .min(6, 'Debe de llevar 6 o más caracteres')
    .required('Debe de ingresar una contraseña'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben de coincidir'),
  phone: yup.string().required('Debe de ingresar un número telefónico'),
  role: yup.string().required('Debe de ingresar un rol')
})

type FormValues = {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  role: string
}

const NewUserForm = () => {
  const { createUser } = useUsers()
  const { roles, getRoles } = useRoles()
  const router = useRouter()

  useEffect(() => {
    getRoles({ perPage: 1000 })
  }, [])

  const onSubmit = async (data: FormValues) => {
    const response = await createUser({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      phone: data.phone,
      role: data.role
    })
    router.push('/users/')
  }
  return (
    <div className="md:w-1/2 w-full">
      <PlantillaForm schema={schema} title="Nuevo Usuario" onSubmit={onSubmit}>
        {(control, errors) => (
          <>
            <Input
              control={control}
              name="firstname"
              label="Nombre(s)"
              error={errors.firstname}
            />
            <Input
              control={control}
              name="lastname"
              label="Apellido(s)"
              error={errors.lastname}
            />
            <Input
              control={control}
              name="email"
              label="Correo electrónico"
              error={errors.email}
            />
            <Input
              control={control}
              name="password"
              type="password"
              label="Contraseña"
              error={errors.password}
            />
            <Input
              control={control}
              name="password-repeat"
              type="password"
              label="Repertir contraseña"
              error={errors.password}
            />
            <Input
              control={control}
              name="phone"
              label="Número telefónico"
              error={errors.password}
              added="phone"
            />
            <Select control={control} label="Rol" name="role">
              {Object.keys(roles).map((key) => (
                <option key={key} value={key}>{roles[key].name}</option>
              ))}
            </Select>
          </>
        )}
      </PlantillaForm>
    </div>
  )
}

export default NewUserForm
