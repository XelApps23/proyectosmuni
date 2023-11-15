import { Timestamp } from 'firebase/firestore'

type Update = {
  id: string
  userId: string
  taskId: string
  description: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface UpdateList {
  [key: string]: Update
}

interface UpdateInput extends Omit<Update, 'id'> {}
type UpdateUpdate = Partial<UpdateInput>

export type { UpdateList, Update, UpdateInput, UpdateUpdate }
