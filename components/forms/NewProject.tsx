import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'
import useProjects from '@/hooks/useProjects'
import useTasks from '@/hooks/useTasks'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const schema = yup.object().shape({
  name: yup.string().required('Es necesario ingresar un nombre'),
  description: yup.string().required('Es necesario ingresar una descripción'),
  initialDate: yup
    .date()
    .typeError('Es necesario ingresar una fecha de inicio')
    .required('Es necesario ingresar una fecha de inicio'),
  expectedDate: yup
    .date()
    .min(
      new Date(),
      'La fecha esperada de finalización debe ser mayor a la fecha actual'
    )
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
  const { createProject } = useProjects()
  const { createDefaultProjectTasks } = useTasks()
  const router = useRouter()

  const { id } = useSelector((state: any) => state.login)

  const onSubmit = async (data: FormValues) => {
    const projectId = await createProject({
      expectedDate: data.expectedDate,
      name: data.name,
      description: data.description,
      initialDate: data.initialDate,
      userId: id
    })
    await createDefaultProjectTasks(projectId)
    router.push(`/projects/${projectId}`)
  }

  return (
    <div className="md:w-1/2 w-full">
      <PlantillaForm
        schema={schema}
        title="Nuevo Proyecto"
        onSubmit={onSubmit}
        defaultValues={{
          initialDate: new Date()
        }}
      >
        {(control, errors) => (
          <>
            <Input
              control={control}
              name="name"
              label="Nombre del proyecto"
              error={errors.name}
            />
            <Input
              control={control}
              name="description"
              label="Descripción"
              error={errors.description}
            />
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
          </>
        )}
      </PlantillaForm>
    </div>
  )
}

export default NewProject
