import * as yup from 'yup'
import Input from '@/components/main/Input'
import PlantillaForm from '../main/PlantillaForm'
import { useRouter } from 'next/router'
import useRoles from '@/hooks/useRoles'
import Divider from '../main/Divider'
import Checkbox from '../main/Checkbox'
import { useState } from 'react'
import { Role } from '@/hooks/types/Role'
import { useToast } from '@chakra-ui/react'


const schema = yup.object().shape({
  name: yup.string().required('Debe de ingresar un nombre')
})

type FormValues = {
  name: string
}

type Props = {
  edit?: boolean
  defaultRole?: Role
}

const NewRoleForm = ({ edit = false, defaultRole }: Props) => {
  const [permissions, setPermissions] = useState<string[]>(edit ? defaultRole?.permissions ?? [] : [])
  const { createRole, updateRole, loading } = useRoles()
  const router = useRouter()
  const toast = useToast()

  const onSubmit = async (data: FormValues) => {
    if (!edit) {
      const response = await createRole({
        name: data.name,
        permissions
      })
      if (response.status === 'success') {
        toast({
          title: response.message,
          status: 'success',
          duration: 4000,
          isClosable: true
        })
        router.push('/roles/')
      }
      if (response.status === 'error') {
        toast({
          title: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    } else if (defaultRole) {
      const response = await updateRole(defaultRole.id, {
        name: data.name,
        permissions
      })
      if (response.status === 'success') {
        toast({
          title: response.message,
          status: 'success',
          duration: 4000,
          isClosable: true
        })
        router.push('/roles/')
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
        defaultValues={edit && {
          name: defaultRole?.name
        }}
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
                checked={permissions?.includes('projects/create')}
                controller={add}
              />
              <Checkbox
                label="Ver todos los proyectos"
                value="projects/view-all"
                controller={add}
                checked={permissions?.includes('projects/view-all')}
              />
              <Checkbox
                label="Ver proyectos asignados"
                value="projects/view-assign"
                controller={add}
                checked={permissions?.includes('projects/view-assign')}
              />
              <Checkbox
                label="Ver todas las tareas"
                value="projects/task-view-all"
                controller={add}
                checked={permissions?.includes('projects/task-view-all')}
              />
              <Checkbox
                label="Ver tareas asignadas"
                value="projects/task-view-assign"
                controller={add}
                checked={permissions?.includes('projects/task-view-assign')}
              />
              <Checkbox
                label="Crear actualizaciones en tareas"
                value="projects/task-update"
                controller={add}
                checked={permissions?.includes('projects/task-update')}
              />
              <Checkbox
                label="Modificar todas tareas"
                value="projects/task-update-all"
                controller={add}
                checked={permissions?.includes('projects/task-update-all')}
              />
              <Checkbox
                label="Modificar tareas asignadas"
                value="projects/task-update-assign"
                controller={add}
                checked={permissions?.includes('projects/task-update-assign')}
              />
              <Checkbox
                label="Eliminar tareas"
                value="projects/task-delete"
                controller={add}
                checked={permissions?.includes('projects/task-delete')}
              />
              <Checkbox
                label="Invitar participantes al proyecto"
                value="projects/invite"
                controller={add}
                checked={permissions?.includes('projects/invite')}
              />
              <Checkbox
                label="Asignar tareas"
                value="projects/task-assign"
                controller={add}
                checked={permissions?.includes('projects/task-assign')}
              />
            </div>
            <Divider />
            <h2 className="text-lg">Usuarios y roles</h2>
            <div className="grid grid-cols-2">
              <Checkbox
                label="Crear usuarios"
                value="users/create"
                controller={add}
                checked={permissions?.includes('users/create')}
              />
              <Checkbox
                label="Ver usuarios"
                value="users/view-all"
                controller={add}
                checked={permissions?.includes('users/view-all')}
              />
              <Checkbox
                label="Editar usuarios"
                value="users/update"
                controller={add}
                checked={permissions?.includes('users/update')}
              />
            </div>
          </>
        )}
      </PlantillaForm>
    </div>
  )
}

export default NewRoleForm
