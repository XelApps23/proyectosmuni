import { useState } from 'react'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'
import { db, storage } from '../services/Firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { FileList } from './types/File'
import HookResponse from './types/HookResponse'

const table = 'files'

const useFile = () => {
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')
  const [files, setFiles] = useState<FileList>({})
  const [fetchedProjects, setFetchedProjects] = useState<string[]>([])
  const [fetchedTasks, setFetchedTasks] = useState<string[]>([])

  const getFilesOfTask = async (taskId: string) => {
    setLoading(true)
    if (!fetchedTasks.includes(taskId)) {
      setFetchedTasks((prev) => [...prev, taskId])
      let datos: any = { ...files }

      const q = query(
        collection(db, 'files'),
        where('taskId', '==', taskId),
        orderBy('createdAt', 'asc')
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const allData = { ...doc.data(), id: doc.id }
        if (!datos[doc.id]) {
          datos = { ...datos, [doc.id]: allData }
          console.log(datos)
        }
      })
      setFiles(datos)
    }
    setLoading(false)
  }

  const getFilesOfProject = async (
    projectId: string,
    override: boolean = false
  ) => {
    setLoading(true)
    if (!fetchedProjects.includes(projectId) || override) {
      setFetchedProjects((prev) => [...prev, projectId])
      let datos: any = { ...files }

      const q = query(
        collection(db, 'files'),
        where('projectId', '==', projectId),
        orderBy('createdAt', 'asc')
      )
      const querySnapshot = await getDocs(q)
      const fetchTasks = [...fetchedTasks]
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const allData = { ...data, id: doc.id }
        if (!datos[doc.id]) {
          datos = { ...datos, [doc.id]: allData }
          if (!fetchedTasks.includes(data.taskId)) {
            fetchTasks.push(data.taskId)
          }
        }
      })
      setFetchedTasks(fetchTasks)
      setFiles(datos)
    }
    setLoading(false)
  }

  const deleteFile = async (
    idRef: string,
    urlRef: string
  ): Promise<HookResponse> => {
    try {
      setLoading(true)
      const storageRef = ref(storage, urlRef)
      const name = files[idRef].name
      await deleteObject(storageRef)
        .then(() => {
          console.log('Archivo borrada exitosamente')
        })
        .catch((error) => {
          console.log(error)
        })
      await deleteDoc(doc(db, table, idRef))
      setLoading(false)
      delete files[idRef]
      return {
        status: 'success',
        message: 'Archivo eliminado correctamente'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  const uploadFile = async (
    file: File,
    userId: string,
    taskId: string,
    projectId: string
  ) => {
    try {
      setLoading(true)
      const storageRef = ref(storage, `/${file.name}`)
      const uploadTask = await uploadBytesResumable(storageRef, file)
      const url = await getDownloadURL(uploadTask.ref)
      setDownloadURL(url)
      await addDoc(collection(db, table), {
        name: file.name,
        url,
        extension: file.type,
        userId,
        taskId,
        projectId,
        createdAt: new Date(),
        updateAt: new Date()
      })
      getFilesOfTask(taskId)
      setLoading(false)
      return {
        status: 'success',
        message: `${file.name} guardado correctamente`
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
    uploadFile,
    loading,
    progress,
    downloadURL,
    getFilesOfTask,
    files,
    deleteFile,
    loadingUpload,
    getFilesOfProject
  }
}

export default useFile
