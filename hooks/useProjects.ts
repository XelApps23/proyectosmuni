import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  increment
} from 'firebase/firestore'
import { db } from '@/services/Firebase'
import { ProjectList, ProjectUpdate } from './types/Project'
import ProjectResponse from './types/ProjectResponse'

type ProjectInput = {
  name: string
  description: string
  initialDate: Date
  expectedDate: Date,
  userId: string
}

const table = 'projects'

const useProjects = () => {
  const [projects, setProjects] = useState<ProjectList>({})
  const [loading, setLoading] = useState(false)

  const getProjects = async () => {
    setLoading(true)
    let datos = {}
    const querySnapshot = await getDocs(collection(db, table))
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } }
    })
    setProjects(datos)
    setLoading(false)
  }

  const getProject = async (idRef: string) => {
    setLoading(true)
    let dato = {}
    const docRef = doc(db, table, idRef)
    const querySnapshot = await getDoc(docRef)
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    setProjects(dato)
    setLoading(false)
  }

  const deteleProject = async (id: string) => {
    setLoading(true)
    await getProject(id)
    await deleteDoc(doc(db, table, id))
    setLoading(false)
  }

  const createProject = async ({
    name,
    description,
    initialDate,
    expectedDate
  }: ProjectInput): Promise<ProjectResponse> => {
    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, table), {
        name: name || null,
        description: description || null,
        initialDate: initialDate || null,
        endDate: null,
        expectedDate: expectedDate || null,
        idState: null,
        done: false,
        totalTasks: 107,
        doneTasks: 0,
        startedTasks: 0,
        stoppedTasks: 0,
        notStartedTasks: 107,
        createdAt: new Date(),
        updateAt: new Date()
      })
      console.log(docRef)
      setLoading(false)
      return {
        status: 'success',
        message: 'Proyecto creado correctamente',
        refId: docRef.id
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message,
        refId: ''
      }
    }
  }

  const updateIncrementalField = async (docId: string, field: string, type: '++' | '--') => {
    setLoading(true)
    const currentProject = projects[docId]
    const pruebaDocRef = doc(db, 'projects', docId)
    await updateDoc(pruebaDocRef, {
      [field]: type === '++' ? increment(1) : increment(-1)
    })
    projects[docId] = {
      ...currentProject,
      [field]: type === '++' ? currentProject[field] + 1 : currentProject[field] - 1
    }
    setLoading(false)
  }

  // Actualizar un documento
  const updateProject = async (docId: string, { name }: ProjectUpdate) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'projects', docId)
    await updateDoc(pruebaDocRef, {
      name
    })
    setLoading(false)
  }

  const assignUser = async (docId: string, userId: string) => {
    setLoading(true)
    const currentProject = projects[docId]
    const pruebaDocRef = doc(db, 'projects', docId)
    await updateDoc(pruebaDocRef, {
      assignedUsers: [...currentProject.assignedUsers, userId]
    })
    projects[docId] = {
      ...currentProject,
      assignedUsers: [...currentProject.assignedUsers, userId]
    }
    setLoading(false)
  }

  return {
    getProjects,
    getProject,
    deteleProject,
    createProject,
    updateProject,
    updateIncrementalField,
    projects,
    loading,
    assignUser
  }
}

export default useProjects
