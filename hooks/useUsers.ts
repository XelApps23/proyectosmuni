import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  setDoc
} from 'firebase/firestore'
import { auxApp, db } from '@/services/Firebase'
import { UserList } from './types/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auxAuth } from '@/services/Firebase'

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

  const getUsers = async () => {
    setLoading(true)
    let datos = {}
    const querySnapshot = await getDocs(collection(db, table))
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } }
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
    setUsers(dato)
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
    const { user } = await createUserWithEmailAndPassword(auxAuth, email, password)
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
