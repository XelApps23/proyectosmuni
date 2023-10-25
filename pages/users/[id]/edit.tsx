import NewUserForm from '@/components/users/NewUserForm'
import useUsers from '@/hooks/useUsers'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Edit = () => {
  const { query } = useRouter()
  const { getUser, users } = useUsers()

  useEffect(() => {
    getUser(query.id as string)
  }, [query.id])

  return (
    <div className="justify-center items-center flex w-full h-[90%]">
      {users[query.id as string] && (
        <NewUserForm edit defaultUser={users[query.id as string] || {}}/>
      )}
    </div>
  )
}

export default Edit
