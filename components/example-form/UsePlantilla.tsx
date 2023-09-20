import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'

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
  lastName?: yup.Maybe<string | undefined>
  age: number
  email: string
  password: string
  initDate: Date
}

const UsePlantilla = () => {
  const onSubmit = (data: FormValues) => {
    console.log(data)
    alert(JSON.stringify(data))
  }
  return (
    <div className='w-[500px]'>
        <PlantillaForm schema={schema} title='Example Formulario' onSubmit={onSubmit}>
{(control, errors) => (
     <>
     <Input
     control={control}
     name="firstName"
     label="Nombre"
     error={errors.firstName}
   />
   <Input
     control={control}
     name="lastName"
     label="Apellido"
     error={errors.lastName}
   />
   <Input
     control={control}
     name="email"
     type="email"
     label="Correo"
     error={errors.email}
   />
   <Input
     control={control}
     name="age"
     type="number"
     label="Edad"
     error={errors.age}
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
     name="initDate"
     type="date"
     label="Fecha de inicio"
     error={errors.initDate}
   />
   </>
)
}
        </PlantillaForm>
    </div>
  )
}

export default UsePlantilla
