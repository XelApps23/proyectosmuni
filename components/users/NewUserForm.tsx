import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'
import { useRouter } from 'next/router'
import Select from '../main/Select'
import useUsers from '@/hooks/useUsers'

const schema = yup.object().shape({})

type FormValues = {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  role: string
}

const NewProject = () => {
  const { createUser } = useUsers()
  const router = useRouter()

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
              label="Contraseña"
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
              <option value="test">Test</option>
            </Select>
          </>
        )}
      </PlantillaForm>
    </div>
  )
}

export default NewProject
