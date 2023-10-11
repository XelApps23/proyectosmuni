import Card from '@/components/main/Card'
import PageHeader from '@/components/main/PageHeader'
import Table from '@/components/main/Table'
import useRoles from '@/hooks/useRoles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const index = () => {
  const router = useRouter()

  const { roles, getRoles } = useRoles()

  useEffect(() => {
    getRoles({})
  }, [])

  return (
    <Card>
      <PageHeader
        title="Roles"
        actionButton={() => router.push('/roles/new-role')}
        actionText="Crear rol"
      />
      <Table
        headers={['Nombre', 'Acciones']}
        cells={Object.keys(roles).map((key) => ({
          name: roles[key].name
        }))}
      />
    </Card>
  )
}

export default index
