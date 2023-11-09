import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'
import useProjects from '@/hooks/useProjects'
import useTasks from '@/hooks/useTasks'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

import { useState } from 'react'
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
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const { id } = useSelector((state: any) => state.login)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    const response = await createProject({
      expectedDate: data.expectedDate,
      name: data.name,
      description: data.description,
      initialDate: data.initialDate,
      userId: id
    })
    const projectId = response.refId
    if (response.status === 'success') {
      toast({
        title: response.message,
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      await createDefaultProjectTasks(projectId)
      router.push(`/projects/${projectId}`)
    }
    if (response.status === 'error') {
      toast({
        title: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <div className="md:w-1/2 w-full">
      <PlantillaForm
        loading={loading}
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
