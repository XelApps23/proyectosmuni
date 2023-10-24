import { useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../services/Firebase'
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { FileList } from './types/File'

const table = 'files'

const useFile = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')
  const [files, setFiles] = useState<FileList>({})

  const getFilesOfTask = async (taskId: string) => {
    setLoading(true)
    let datos: any = { ...files }

    const q = query(
      collection(db, 'files'),
      where('taskId', '==', taskId),
      orderBy('createdAt', 'asc')
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const userData = { ...doc.data(), id: doc.id }
      if (!datos[doc.id]) {
        datos = { ...datos, [doc.id]: userData }
        console.log(datos)
      }
    })

    setFiles(datos)
    setLoading(false)
  }

  const uploadFile = async (file: File, userId: string, taskId: string) => {
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
            url,
            extension: file.type,
            userId,
            taskId,
            createdAt: new Date(),
            updateAt: new Date()
          })
          console.log(docRef)
          setLoading(false)
        })
      }
    )
    setLoading(false)
  }

  return { uploadFile, loading, progress, downloadURL, getFilesOfTask, files }
}

export default useFile
