import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '@/services/Firebase'
import { ProjectList, ProjectUpdate } from './types/Project'

type ProjectInput = {
  name: string
  description: string
  initialDate: Date
  expectedDate: Date
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
  }: ProjectInput) => {
    setLoading(true)
    const docRef = await addDoc(collection(db, table), {
      name: name || null,
      description: description || null,
      initialDate: initialDate || null,
      endDate: null,
      expectedDate: expectedDate || null,
      idState: null,
      done: false,
      createdAt: new Date(),
      updateAt: new Date()
    })
    console.log(docRef)
    setLoading(false)
    return docRef.id
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

  return {
    getProjects,
    getProject,
    deteleProject,
    createProject,
    updateProject,
    projects,
    loading
  }
}

export default useProjects
