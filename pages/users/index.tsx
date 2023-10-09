import Card from '@/components/main/Card'
import PageHeader from '@/components/main/PageHeader'
import { useRouter } from 'next/router'
import React from 'react'

const List = () => {
  const router = useRouter()

  return (
    <Card>
      <PageHeader title="Usuarios" actionButton={() => router.push('/users/new-user')} actionText="Crear usuario">

      </PageHeader>
    </Card>
  )
}

export default List
