import { useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../services/Firebase'

const useFile = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')

  const uploadFile = async (file: File) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url)
          setLoading(false)
        })
      }
    )
  }

  return { uploadFile, loading, progress, downloadURL }
}

export default useFile
