import { Timestamp } from 'firebase/firestore'

type Task = {
  id: string
  name: string
  index: number
  description: string
  initialDate: Timestamp | null
  endDate: Timestamp | null
  expectedDate: Timestamp | null
  projectId: string
  priority: string
  status: string
  phase: number
  files: string[]
  updated: string[]
  assignedUsers: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface TaskList {
  [key: string]: Task
}

interface TaskInput extends Omit<Task, 'id'> {}
type TaskUpdate = Partial<TaskInput>

export type { TaskList, Task, TaskInput, TaskUpdate }
