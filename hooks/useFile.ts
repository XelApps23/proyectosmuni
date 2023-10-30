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

const table = 'files'

const useFile = () => {
  const [loading, setLoading] = useState(false)
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

  const getFilesOfProject = async (projectId: string) => {
    setLoading(true)
    if (!fetchedProjects.includes(projectId)) {
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

  const deleteFile = async (idRef: string, urlRef: string) => {
    setLoading(true)
    let datos = {}
    Object.keys(files)
      .map((key) => files[key])
      .filter((file) => file.id !== idRef)
      .forEach((file) => {
        datos = { ...datos, [file.id]: file }
      })
    setFiles(datos)
    const storageRef = ref(storage, urlRef)
    await deleteObject(storageRef)
      .then(() => {
        console.log('Imagen borrada exitosamente')
      })
      .catch((error) => {
        console.log(error)
      })
    await deleteDoc(doc(db, table, idRef))
    setLoading(false)
  }

  const uploadFile = async (file: File, userId: string, taskId: string, projectId: string) => {
    const storageRef = ref(storage, `/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progreso de carga
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

        // Estado de la carga
        switch (snapshot.state) {
          case 'paused':
            setLoading(false)
            break
          case 'running':
            setLoading(true)
            break
          case 'canceled':
            setLoading(false)
            break
        }
      },
      (error) => {
        console.log(error.message)
        setLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          setDownloadURL(url)
          const docRef = await addDoc(collection(db, table), {
            name: file.name,
            url,
            extension: file.type,
            userId,
            projectId,
            taskId,
            createdAt: new Date(),
            updateAt: new Date()
          })
          console.log(docRef)
          getFilesOfTask(taskId)
          setLoading(false)
        })
      }
    )
    setLoading(false)
  }

  return {
    uploadFile,
    loading,
    progress,
    downloadURL,
    getFilesOfTask,
    files,
    deleteFile,
    getFilesOfProject
  }
}

export default useFile
