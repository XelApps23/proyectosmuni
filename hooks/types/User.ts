import { Timestamp } from 'firebase/firestore'

type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  role: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface UserList {
  [key: string]: User
}

interface UserInput extends Omit<User, 'id'> {}
type UserUpdate = Partial<UserInput>

export type { UserList, User, UserInput, UserUpdate }
