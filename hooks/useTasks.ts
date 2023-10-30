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
  orderBy
} from 'firebase/firestore'
import { db } from '@/services/Firebase'
import { TaskList } from './types/Task'
import TaskListObj from '@/services/TaskListObj'

type TaskInput = {
  name: string
  description: string
  projectId: string
  phase: number
  index: number
}

const table = 'tasks'

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskList>({})
  const [loading, setLoading] = useState(false)

  const getTasks = async () => {
    setLoading(true)
    let datos = {}
    const querySnapshot = await getDocs(collection(db, table))
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } }
    })
    setTasks(datos)
    setLoading(false)
  }

  const getTask = async (idRef: string) => {
    setLoading(true)
    let dato = {}
    const docRef = doc(db, table, idRef)
    const querySnapshot = await getDoc(docRef)
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    setTasks(dato)
    setLoading(false)
  }

  const getTaskFiltered = async (projectId: string, phase: number) => {
    setLoading(true)
    let datos: any = { ...tasks }

    const q = query(
      collection(db, 'tasks'),
      where('projectId', '==', projectId),
      where('phase', '==', Number(phase)),
      orderBy('index', 'asc')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const userData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: userData }
      }
    })

    setTasks(datos)
    setLoading(false)
  }

  const deteleTask = async (id: string) => {
    setLoading(true)
    await getTask(id)
    await deleteDoc(doc(db, table, id))
    setLoading(false)
  }

  const createTask = async ({
    name,
    description,
    projectId,
    phase,
    index
  }: TaskInput) => {
    setLoading(true)
    await addDoc(collection(db, table), {
      name: name || null,
      index: index || null,
      description: description || null,
      initialDate: null,
      endDate: null,
      expectedDate: null,
      projectId,
      updated: [],
      priority: 'Baja',
      status: 'No Iniciado',
      phase: Number(phase),
      assignedUsers: [],
      files: [],
      createdAt: new Date(),
      updateAt: new Date()
    })
    setLoading(false)
  }

  const createDefaultProjectTasks = async (projectId: string) => {
    for (const task of TaskListObj) {
      await createTask({
        index: task.index,
        name: `${task.phase}.${task.index < 10 ? '0' : ''}${task.index}`,
        description: task.description,
        projectId,
        phase: task.phase
      })
    }
  }

  const updateTask = async (docId: string, field: string, value: any) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'tasks', docId)
    await updateDoc(pruebaDocRef, {
      [field]: value
    })
    setLoading(false)
  }

  return {
    getTasks,
    getTask,
    deteleTask,
    createTask,
    updateTask,
    tasks,
    loading,
    createDefaultProjectTasks,
    getTaskFiltered
  }
}

export default useTasks
