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
  endDate: yup
    .date()
    .min(new Date(), 'La fecha de finalización debe ser mayor a la fecha actual')
    .typeError('Es necesario ingresar una fecha de finalización')
    .required('Es necesario ingresar una fecha de finalización')
})

type FormValues = {
  name: string
  description: string
  initialDate: Date
  endDate: Date

}

const AddTask = () => {
  const onSubmit = (data: FormValues) => {
    console.log(data)
    alert(JSON.stringify(data))
  }
  return (
    <div className='w-[500px]'>
      <PlantillaForm schema={schema} title='Nueva Tarea' onSubmit={onSubmit}>
        {(control, errors) => (
          <>
            <Input
              control={control}
              name="name"
              label="Nombre de la tarea:"
              error={errors.name}
              size="xl"
            />
            <Input
              control={control}
              name="description"
              label="Descripción:"
              error={errors.description}
              size="xl"
            />
          <div className='w-full flex justify-between'>
          <Input
              control={control}
              name="initialDate"
              type="date"
              label="Fecha de inicio:"
              error={errors.initialDate}
              size="xl"
            />
            <Input
              control={control}
              name="endDate"
              type="date"
              label="Fecha de finalización:"
              error={errors.endDate}
              size="xl"
            />
          </div>
          </>
        )
        }
      </PlantillaForm>
    </div>
  )
}

export default AddTask
