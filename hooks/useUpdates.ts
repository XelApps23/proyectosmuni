import { db } from '@/services/Firebase'
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { useState } from 'react'
import { UpdateList } from './types/Update'
import HookResponse from './types/HookResponse'

const table = 'updates'

type UpdateInput = {
  userId: string
  taskId: string
  description: string
}

const useUpdates = () => {
  const [loading, setLoading] = useState(false)
  const [updates, setUpdates] = useState<UpdateList>({})

  const createUpdate = async ({
    userId,
    taskId,
    description
  }: UpdateInput): Promise<HookResponse> => {
    try {
      setLoading(true)
      const docRef = await addDoc(collection(db, table), {
        userId,
        taskId,
        description,
        createdAt: new Date(),
        updateAt: new Date()
      })
      console.log(docRef)
      setLoading(false)
      return {
        status: 'success',
        message: 'Comentario agregado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  const getUpdatesOfTask = async (taskId: string) => {
    setLoading(true)
    let datos: any = { ...updates }

    const q = query(
      collection(db, 'updates'),
      where('taskId', '==', taskId),
      orderBy('createdAt', 'asc')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const updateData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: updateData }
        console.log(datos)
      }
    })
    setUpdates(datos)
    setLoading(false)
  }

  const deteleUpdate = async (id: string): Promise<HookResponse> => {
    try {
      setLoading(true)
      await deleteDoc(doc(db, table, id))
      setLoading(false)
      return {
        status: 'success',
        message: 'Comentario eliminado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  const updateUpdate = async (
    docId: string,
    newDescription: string
  ): Promise<HookResponse> => {
    try {
      setLoading(true)
      const docRef = doc(db, table, docId)
      await updateDoc(docRef, { description: newDescription })
      setLoading(false)
      return {
        status: 'success',
        message: 'Comentario actualizado correctamente'
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
    getUpdatesOfTask,
    loading,
    updates,
    createUpdate,
    deteleUpdate,
    updateUpdate
  }
}

export default useUpdates
