import { useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  limit,
  startAfter,
  updateDoc
} from 'firebase/firestore'
import { UserList, UserUpdate } from './types/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auxAuth, db } from '@/services/Firebase'
import useRoles from './useRoles'
import HookResponse from './types/HookResponse'

type UserFormInput = {
  firstname?: string
  lastname?: string
  email: string
  password: string
  phone?: string
  role: string
}

type GetUsersParams = {
  perPage?: number
  withRole?: boolean
}

const table = 'users'

const useUsers = () => {
  const [users, setUsers] = useState<UserList>({})
  const [loading, setLoading] = useState(false)
  const [last, setLast] = useState<any>(null)
  const { roles, getRole } = useRoles()

  const getUsers = async ({
    perPage = 10,
    withRole = false
  }: GetUsersParams) => {
    setLoading(true)
    let datos: any = { ...users }
    let preparedQuery

    if (last === null) {
      preparedQuery = query(
        collection(db, table),
        where('status', '==', 'active'),
        limit(perPage)
      )
    } else {
      preparedQuery = query(
        collection(db, table),
        where('status', '==', 'active'),
        limit(perPage),
        startAfter(last)
      )
    }

    const querySnapshot = await getDocs(preparedQuery)
    setLast(querySnapshot.docs[querySnapshot.docs.length - 1])

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const userData = { ...data, id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: userData }
        if (withRole) {
          getRole(data.role)
        }
      }
    })
    setUsers(datos)
    setLoading(false)
  }

  const getUser = async (idRef: string) => {
    setLoading(true)
    let dato = {}
    const docRef = doc(db, table, idRef)
    console.log(docRef)
    const querySnapshot = await getDoc(docRef)
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    if (!users[idRef]) {
      setUsers((prevUsers) => ({ ...prevUsers, ...dato }))
    }
    setLoading(false)
  }

  const deleteUser = async (id: string) => {
    setLoading(true)
    await updateDoc(doc(db, table, id), {
      status: 'deleted',
      updatedAt: new Date()
    })
    setLoading(false)
  }

  const delay = (ms: number = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  }

  const createUser = async ({
    email,
    firstname,
    lastname,
    phone,
    password,
    role
  }: UserFormInput): Promise<HookResponse> => {
    setLoading(true)
    try {
      await delay(10000)
      const { user } = await createUserWithEmailAndPassword(
        auxAuth,
        email,
        password
      )
      if (user.uid) {
        await setDoc(doc(db, table, user.uid), {
          firstname: firstname || null,
          lastname: lastname || null,
          email: email || null,
          phone: phone || null,
          role: role || null,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      auxAuth.signOut()
      setLoading(false)
      return {
        status: 'success',
        message: 'Usuario creado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  const updateUser = async (
    id: string,
    { firstname, lastname, phone, role }: UserUpdate
  ) => {
    setLoading(true)
    await updateDoc(doc(db, table, id), {
      firstname: firstname || null,
      lastname: lastname || null,
      phone: phone || null,
      role: role || null,
      updatedAt: new Date()
    })
    setLoading(false)
  }

  return {
    users,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    loading,
    roles
  }
}

export default useUsers
