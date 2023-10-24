import Card from '@/components/main/Card'
import PageHeader from '@/components/main/PageHeader'
import Table from '@/components/main/Table'
import useUsers from '@/hooks/useUsers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const List = () => {
  const router = useRouter()

  const { getUsers, users } = useUsers()

  useEffect(() => {
    getUsers({})
  }, [])

  return (
    <Card>
      <PageHeader
        title="Usuarios"
        actionButton={() => router.push('/users/new-user')}
        actionText="Crear usuario"
      />
      <Table
        cells={Object.keys(users).map((key) => ({
          name: `${users[key].firstname || ''} ${users[key].lastname || ''}`,
          email: users[key].email,
          testt: users[key].firstname
        }))}
        headers={['Nombre', 'Correo', 'Acciones']}
      />
    </Card>
  )
}

export default List
