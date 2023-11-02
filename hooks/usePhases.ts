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
import { PhaseList } from './types/Phase'

type PhaseInput = {
  name: string
  index: number
  projectId: string
  doneTasks: number
  totalTasks: number
  startedTasks: number
  stoppedTasks: number
  notStartedTasks: number
}

const table = 'phases'

const usePhases = () => {
  const [phases, setPhases] = useState<PhaseList>({})
  const [loading, setLoading] = useState(false)

  const getPhases = async () => {
    setLoading(true)
    let datos = {}
    const querySnapshot = await getDocs(collection(db, table))
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } }
    })
    setPhases(datos)
    setLoading(false)
  }

  const getPhase = async (idRef: string) => {
    setLoading(true)
    let dato = {}
    const docRef = doc(db, table, idRef)
    console.log(docRef)
    const querySnapshot = await getDoc(docRef)
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    setPhases(dato)
    setLoading(false)
  }

  const getPhasesOfProject = async (projectId: string) => {
    setLoading(true)
    let datos: any = { ...phases }

    console.log('CONSULTA')
    const q = query(
      collection(db, 'phases'),
      where('projectId', '==', projectId),
      orderBy('index', 'asc')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const userData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: userData }
      }
    })

    setPhases(datos)
    setLoading(false)
  }

  const deletePhase = async (id: string) => {
    setLoading(true)
    await getPhase(id)
    await deleteDoc(doc(db, table, id))
    setLoading(false)
  }

  const createPhase = async ({
    doneTasks,
    index,
    name,
    notStartedTasks,
    projectId,
    startedTasks,
    stoppedTasks,
    totalTasks
  }: PhaseInput) => {
    setLoading(true)
    const docRef = await addDoc(collection(db, table), {
      doneTasks,
      endDate: null,
      expectedDate: null,
      initialDate: null,
      index,
      name,
      notStartedTasks,
      projectId,
      startedTasks,
      stoppedTasks,
      totalTasks,
      createdAt: new Date(),
      updateAt: new Date()
    })
    console.log(docRef)
    setLoading(false)
  }

  const updatePhase = async (docId: string, field: string, value: any) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'phases', docId)
    await updateDoc(pruebaDocRef, {
      [field]: value
    })
    setLoading(false)
  }

  const updatePhaseDates = async (
    docId: string,
    initialDate: Date,
    expectedDate: Date
  ) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'phases', docId)
    await updateDoc(pruebaDocRef, {
      initialDate,
      expectedDate,
      updatedAt: new Date()
    })
    const datos = {
      ...phases,
      [docId]: {
        ...phases[docId],
        initialDate: Timestamp.fromDate(initialDate),
        expectedDate: Timestamp.fromDate(expectedDate),
        updatedAt: Timestamp.fromDate(new Date())
      }
    }
    setPhases(datos)
    setLoading(false)
  }

  return {
    getPhases,
    getPhase,
    deletePhase,
    createPhase,
    updatePhase,
    phases,
    loading,
    getPhasesOfProject,
    updatePhaseDates
  }
}

export default usePhases
