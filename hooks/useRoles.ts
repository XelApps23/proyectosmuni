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
  addDoc,
  updateDoc
} from 'firebase/firestore'
import { RoleList, RoleUpdate } from './types/Role'
import { db } from '@/services/Firebase'
import HookResponse from './types/HookResponse'

type RoleFormInput = {
  name: string
  permissions: string[]
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

  const deleteRole = async (id: string): Promise<HookResponse> => {
    try {
      setLoading(true)
      await getRole(id)
      await deleteDoc(doc(db, table, id))
      setLoading(false)
      return {
        status: 'success',
        message: 'Rol eliminado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  const createRole = async ({
    name,
    permissions
  }: RoleFormInput): Promise<HookResponse> => {
    try {
      setLoading(true)
      await addDoc(collection(db, table), {
        name,
        permissions,
        status: 'created',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      setLoading(false)
      return {
        status: 'success',
        message: 'Rol creado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  const updateRole = async (
    id: string,
    { description, name, permissions }: RoleUpdate
  ): Promise<HookResponse> => {
    try {
      setLoading(true)
      await updateDoc(doc(db, table, id), {
        description: description || null,
        name: name || null,
        permissions: permissions || null,
        updatedAt: new Date()
      })
      setLoading(false)
      return {
        status: 'success',
        message: 'Rol actualizado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  return {
    roles,
    getRoles,
    getRole,
    updateRole,
    deleteRole,
    createRole,
    loading
  }
}

export default useRoles
