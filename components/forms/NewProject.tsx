import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'

const currentDate = new Date()
console.log(currentDate)
currentDate.setDate(currentDate.getDate() + 1)
console.log(currentDate)
const schema = yup.object().shape({
  name: yup.string().required('Es necesario ingresar un nombre'),
  description: yup.string().required('Es necesario ingresar una descripción'),
  initialDate: yup
    .date()
    .min(new Date(), 'La fecha de inicio debe ser mayor o igual a la fecha actual')
    .typeError('Es necesario ingresar una fecha de inicio')
    .required('Es necesario ingresar una fecha de inicio'),
  expectedDate: yup
    .date()
    .min(new Date(), 'La fecha esperada de finalización debe ser mayor a la fecha actual')
    .typeError('Es necesario ingresar una fecha esperada de finalización')
    .required('Es necesario ingresar una fecha esperada de finalización')
})

type FormValues = {
  name: string
  description: string
  initialDate: Date
  expectedDate: Date

}

const NewProject = () => {
  const onSubmit = (data: FormValues) => {
    console.log(data)
    alert(JSON.stringify(data))
  }
  return (
    <div className='w-[500px]'>
      <PlantillaForm schema={schema} title='Nuevo Proyecto' onSubmit={onSubmit}>
        {(control, errors) => (
          <>
            <Input
              control={control}
              name="name"
              label="Nombre del Proyecto"
              error={errors.name}
            />
            <Input
              control={control}
              name="description"
              label="Descripción"
              error={errors.description}
            />
          <div className='w-full flex justify-between'>
          <Input
              control={control}
              name="initialDate"
              type="date"
              label="Fecha de inicio"
              error={errors.initialDate}
            />
            <Input
              control={control}
              name="expectedDate"
              type="date"
              label="Fecha esperada de finalización"
              error={errors.expectedDate}
            />
          </div>
          </>
        )
        }
      </PlantillaForm>
    </div>
  )
}

export default NewProject
