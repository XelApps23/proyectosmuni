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
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '@/services/Firebase'
import { TaskList } from './types/Task'
import TaskListObj from '@/services/TaskListObj'
import usePhases from './usePhases'

type TaskInput = {
  name: string
  description: string
  projectId: string
  phase: number
  index: number
}

const table = 'tasks'

type PhasesListText = {
  [key: string]: {
    name: string
    totalTasks: number
  }
}

const phasesList: PhasesListText = {
  1: {
    name: 'Formulación del proyecto',
    totalTasks: 33
  },
  2: {
    name: 'Creación de bases',
    totalTasks: 15
  },
  3: {
    name: 'Adjudicación del proyecto',
    totalTasks: 12
  },
  4: {
    name: 'Contratación del proyecto',
    totalTasks: 6
  },
  5: {
    name: 'Ejecución del proyecto anticipo',
    totalTasks: 5
  },
  6: {
    name: 'Ejecución del proyecto estimaciones',
    totalTasks: 8
  },
  7: {
    name: 'Ejecución del proyecto documento de cambio',
    totalTasks: 11
  },
  8: {
    name: 'Liquidación del proyecto',
    totalTasks: 17
  },
  9: {
    name: 'Otros',
    totalTasks: 0
  }
}

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskList>({})
  const [loading, setLoading] = useState(false)
  const [fetchedPhases, setFetchedPhases] = useState<number[]>([])
  const { createPhase } = usePhases()

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
    let datos: any = { ...tasks }
    const docRef = doc(db, table, idRef)
    const querySnapshot = await getDoc(docRef)
    datos = {
      ...datos,
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    setTasks(datos)
    setLoading(false)
  }

  const getTaskFiltered = async (projectId: string, phase: number) => {
    setLoading(true)
    setFetchedPhases((prev) => [...prev, phase])
    console.log(fetchedPhases)
    let datos: any = { ...tasks }

    if (!fetchedPhases.includes(phase)) {
      console.log('CONSULTA')
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
    }
    setLoading(false)
  }

  const deleteTask = async (id: string) => {
    setLoading(true)
    await getTask(id)
    await deleteDoc(doc(db, table, id))
    setTasks((prev) => {
      const { [id]: removed, ...rest } = prev
      return rest
    })
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
      priority: 'Sin definir',
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
    for (const index in phasesList) {
      await createPhase({
        doneTasks: 0,
        index: Number(index),
        name: phasesList[index].name,
        notStartedTasks: phasesList[index].totalTasks,
        projectId,
        startedTasks: 0,
        stoppedTasks: 0,
        totalTasks: phasesList[index].totalTasks
      })
    }
  }

  const updateTask = async (docId: string, field: string, value: any) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'tasks', docId)

    await updateDoc(pruebaDocRef, {
      [field]: value
    })
    let datos = {}
    if (
      field === 'initialDate' ||
      field === 'expectedDate' ||
      field === 'endDate'
    ) {
      datos = {
        ...tasks,
        [docId]: {
          ...tasks[docId],
          [field]: Timestamp.fromDate(value)
        }
      }
    } else {
      datos = {
        ...tasks,
        [docId]: {
          ...tasks[docId],
          [field]: value
        }
      }
    }

    setTasks(datos)
    setLoading(false)
  }

  const updateTaskDates = async (
    docId: string,
    initialDate: Date,
    expectedDate: Date
  ) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'tasks', docId)
    await updateDoc(pruebaDocRef, {
      initialDate,
      expectedDate,
      updatedAt: new Date()
    })
    const datos = {
      ...tasks,
      [docId]: {
        ...tasks[docId],
        initialDate: Timestamp.fromDate(initialDate),
        expectedDate: Timestamp.fromDate(expectedDate),
        updatedAt: Timestamp.fromDate(new Date())
      }
    }
    setTasks(datos)
    setLoading(false)
  }

  const assignUsers = async (docId: string, userIds: string[]) => {
    setLoading(true)
    const currentTask = tasks[docId]
    const pruebaDocRef = doc(db, 'tasks', docId)
    await updateDoc(pruebaDocRef, {
      assignedUsers: [...currentTask.assignedUsers, ...userIds]
    })
    setTasks((prev) => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        assignedUsers: [...currentTask.assignedUsers, ...userIds]
      }
    }))
    setLoading(false)
  }

  return {
    getTasks,
    getTask,
    deleteTask,
    createTask,
    updateTask,
    assignUsers,
    tasks,
    loading,
    createDefaultProjectTasks,
    getTaskFiltered,
    updateTaskDates
  }
}

export default useTasks
