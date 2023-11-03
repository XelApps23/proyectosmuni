import { Timestamp } from 'firebase/firestore'

type Phase = {
  id: string
  name: string
  index: number
  initialDate: Timestamp | null
  endDate: Timestamp | null
  expectedDate: Timestamp | null
  projectId: string
  doneTasks: number
  totalTasks: number
  startedTasks: number
  stoppedTasks: number
  notStartedTasks: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface PhaseList {
  [key: string]: Phase
}

interface PhaseInput extends Omit<Phase, 'id'> {}
type PhaseUpdate = Partial<PhaseInput>

export type { PhaseList, Phase, PhaseInput, PhaseUpdate }
