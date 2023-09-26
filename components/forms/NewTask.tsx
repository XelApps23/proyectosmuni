import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'

const schema = yup.object().shape({
  name: yup.string().required('Es necesario ingresar un nombre'),
  description: yup.string().required('Es necesario ingresar una descripción'),
  initialDate: yup
    .date()
    .typeError('Es necesario ingresar una fecha de inicio')
    .required('Es necesario ingresar una fecha de inicio'),
  endDate: yup
    .date()
    .typeError('Es necesario ingresar una fecha de finalización')
    .required('Es necesario ingresar una fecha de finalización')
})

type FormValues = {
  name: string
  description: string
  initialDate: Date
  endDate: Date
}

const NewTask = () => {
  const onSubmit = (data: FormValues) => {
    console.log(data)
    alert(JSON.stringify(data))
  }
  return (
    <div className="w-[500px]">
      <PlantillaForm
        schema={schema}
        defaultValues={{
          initialDate: new Date()
        }}
        title="Nueva Tarea"
        onSubmit={onSubmit}
      >
        {(control, errors) => (
          <>
            <Input
              control={control}
              name="name"
              label="Nombre de la tarea"
              error={errors.name}
            />
            <Input
              control={control}
              name="description"
              label="Descripción"
              error={errors.description}
            />
            <div className="w-full flex justify-between">
              <Input
                control={control}
                name="initialDate"
                type="date"
                label="Fecha de inicio"
                error={errors.initialDate}
              />
              <Input
                control={control}
                name="endDate"
                type="date"
                label="Fecha de finalización"
                error={errors.endDate}
              />
            </div>
          </>
        )}
      </PlantillaForm>
    </div>
  )
}

export default NewTask
