import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  addDoc
} from 'firebase/firestore'
import { RoleList } from './types/Role'
import { db } from '@/services/Firebase'

type RoleFormInput = {
  name: string,
  permissions: string[],
}

const table = 'roles'

const useRoles = () => {
  const [roles, setRoles] = useState<RoleList>({})
  const [loading, setLoading] = useState(false)
  const [last, setLast] = useState<any>(null)

  const getRoles = async ({ perPage = 10 }) => {
    setLoading(true)
    let datos: any = { ...roles }
    let preparedQuery

    if (last === null) {
      preparedQuery = query(
        collection(db, table),
        where('status', '==', 'created'),
        limit(perPage)
      )
    } else {
      preparedQuery = query(
        collection(db, table),
        where('status', '==', 'created'),
        limit(perPage),
        startAfter(last)
      )
    }

    const querySnapshot = await getDocs(preparedQuery)
    setLast(querySnapshot.docs[querySnapshot.docs.length - 1])

    querySnapshot.forEach((doc) => {
      const RoleData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: RoleData }
      }
    })
    setRoles(datos)
    setLoading(false)
  }

  const getRole = async (idRef: string) => {
    setLoading(true)
    let dato = {}
    const docRef = doc(db, table, idRef)
    console.log(docRef)
    const querySnapshot = await getDoc(docRef)
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    if (!roles[idRef]) {
      setRoles((prevRoles) => ({ ...prevRoles, ...dato }))
    }
    setLoading(false)
  }

  const deleteRole = async (id: string) => {
    setLoading(true)
    await getRole(id)
    await deleteDoc(doc(db, table, id))
    setLoading(false)
  }

  const createRole = async ({
    name,
    permissions
  }: RoleFormInput) => {
    setLoading(true)
    await addDoc(collection(db, table), {
      name,
      permissions,
      status: 'created',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    setLoading(false)
  }

  const updateRole = async (docId: string) => {}
    
  return {
    roles,
    getRoles,
    updateRole,
    deleteRole,
    createRole,
    loading
  }
}

export default useRoles
