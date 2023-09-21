import { Timestamp } from 'firebase/firestore'

type Task = {
  id: string
  name: string
  description: string
  endDate: Timestamp
  initialDate: Timestamp
  idUser: string
  done: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface TaskList {
  [key: string]: Task
}

interface TaskInput extends Omit<Task, 'id'> {}
type TaskUpdate = Partial<TaskInput>

export type { TaskList, Task, TaskInput, TaskUpdate }
