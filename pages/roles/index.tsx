import Card from '@/components/main/Card'
import PageHeader from '@/components/main/PageHeader'
import Table from '@/components/main/Table'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()

  return (
    <Card>
      <PageHeader
        title="Roles"
        actionButton={() => router.push('/roles/new-role')}
        actionText="Crear rol"
      />
      <Table
        headers={['Nombre', 'Descripción', 'Acciones']}
        cells={[
          {
            name: 'Administrador',
            description: 'Tiene acceso a todo',
            actions: 'Editar | Eliminar'
          },
          {
            name: 'Supervisor',
            description: 'Tiene acceso a todo',
            actions: 'Editar | Eliminar'
          },
          {
            name: 'Cliente',
            description: 'Tiene acceso a todo',
            actions: 'Editar | Eliminar'
          }
        ]}
      />
    </Card>
  )
}

export default index
