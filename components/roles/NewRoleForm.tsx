import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'
import { useRouter } from 'next/router'
import Select from '../main/Select'
import useUsers from '@/hooks/useUsers'
import useRoles from '@/hooks/useRoles'
import CheckIcon from '../icons/CheckIcon'
import Divider from '../main/Divider'
import Checkbox from '../main/Checkbox'
import { useEffect, useState } from 'react'

const schema = yup.object().shape({
  name: yup.string().required('Debe de ingresar un nombre')
})

type FormValues = {
  name: string
}

const NewProject = () => {
  const [permissions, setPermissions] = useState<string[]>([])

  const { createRole, loading } = useRoles()
  const router = useRouter()

  useEffect(() => {
    console.log(permissions)
  }, [permissions])

  const onSubmit = async (data: FormValues) => {
    const response = await createRole({
      name: data.name,
      permissions
    })
    router.push('/roles/')
  }

  const add = (value: string, checked: boolean) => {
    if (checked) {
      setPermissions(prev => [...prev, value])
    } else {
      setPermissions(prev => prev.filter(item => item !== value))
    }
  }

  return (
    <div className="md:w-1/2 w-full">
      <PlantillaForm
        schema={schema}
        loading={loading}
        title="Nuevo Rol"
        onSubmit={onSubmit}
      >
        {(control, errors) => (
          <>
            <Input
              control={control}
              name="name"
              label="Nombre"
              error={errors.name}
            />
            <Divider />
            <h1 className="text-xl">Permisos</h1>
            <h2 className="text-lg">Proyectos</h2>
            <div className="grid grid-cols-2">
              <Checkbox
                label="Crear proyectos"
                value="projects/create"
                controller={add}
              />
              <Checkbox
                label="Ver todos los proyectos"
                value="projects/view-all"
                controller={add}
              />
              <Checkbox
                label="Ver proyectos asignados"
                value="projects/view-assign"
                controller={add}
              />
              <Checkbox
                label="Crear nuevas tareas"
                value="projects/task-create"
                controller={add}
              />
              <Checkbox
                label="Ver todas las tareas"
                value="projects/task-view-all"
                controller={add}
              />
              <Checkbox
                label="Ver tareas asignadas"
                value="projects/task-view-assign"
                controller={add}
              />
              <Checkbox
                label="Crear actualizaciones en tareas"
                value="projects/task-"
                controller={add}
              />
              <Checkbox
                label="Modificar todas tareas"
                value="projects/task-update-all"
                controller={add}
              />
              <Checkbox
                label="Modificar tareas asignadas"
                value="projects/task-update-assign"
                controller={add}
              />
              <Checkbox
                label="Eliminar tareas"
                value="projects/task-delete"
                controller={add}
              />
              <Checkbox
                label="Invitar participantes al proyecto"
                value="projects/invite"
                controller={add}
              />
              <Checkbox
                label="Asignar tareas"
                value="projects/task-assign"
                controller={add}
              />
            </div>
            <Divider />
            <h2 className="text-lg">Usuarios y roles</h2>
            <div className="grid grid-cols-2">
              <Checkbox
                label="Crear usuarios"
                value="users/create"
                controller={add}
              />
              <Checkbox
                label="Ver usuarios"
                value="users/view-all"
                controller={add}
              />
              <Checkbox
                label="Editar usuarios"
                value="users/update"
                controller={add}
              />
            </div>
          </>
        )}
      </PlantillaForm>
    </div>
  )
}

export default NewProject
