import { Timestamp } from 'firebase/firestore'

type File = {
  id: string
  name: string
  url: string
  userId: string
  taskId: string
  projectId: string
  extension: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface FileList {
  [key: string]: File
}

interface FileInput extends Omit<File, 'id'> {}
type FileUpdate = Partial<FileInput>

export type { FileList, File, FileInput, FileUpdate }
