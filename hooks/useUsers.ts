import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  limit,
  startAfter
} from 'firebase/firestore'
import { UserList } from './types/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auxAuth, db } from '@/services/Firebase'

type UserFormInput = {
  firstname?: string
  lastname?: string
  email: string
  password: string
  phone?: string
  role: string
}

const table = 'users'

const useUsers = () => {
  const [users, setUsers] = useState<UserList>({})
  const [loading, setLoading] = useState(false)
  const [last, setLast] = useState<any>(null)

  const getUsers = async ({ perPage = 10 }) => {
    setLoading(true)
    let datos: any = { ...users }
    let preparedQuery

    if (last === null) {
      preparedQuery = query(collection(db, table), where('status', '==', 'active'), limit(perPage))
    } else {
      preparedQuery = query(collection(db, table), where('status', '==', 'active'), limit(perPage), startAfter(last))
    }

    const querySnapshot = await getDocs(preparedQuery)
    setLast(querySnapshot.docs[querySnapshot.docs.length - 1])

    querySnapshot.forEach((doc) => {
      const userData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: userData }
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
    await getUser(id)
    await deleteDoc(doc(db, table, id))
    setLoading(false)
  }

  const createUser = async ({
    email,
    firstname,
    lastname,
    phone,
    password,
    role
  }: UserFormInput) => {
    setLoading(true)
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
  }

  const updateUser = async (docId: string) => {}

  return {
    users,
    getUsers,
    updateUser,
    deleteUser,
    createUser,
    loading
  }
}

export default useUsers
