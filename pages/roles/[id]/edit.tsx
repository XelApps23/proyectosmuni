import NewRoleForm from '@/components/roles/NewRoleForm'
import useRoles from '@/hooks/useRoles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Edit = () => {
  const { query } = useRouter()
  const { getRole, roles } = useRoles()

  useEffect(() => {
    getRole(query.id as string)
  }, [query.id])

  return (
    <div className="justify-center items-center flex w-full h-[90%]">
      {roles[query.id as string] && (
        <NewRoleForm edit defaultRole={roles[query.id as string] || {}} />
      )}
    </div>
  )
}

export default Edit
