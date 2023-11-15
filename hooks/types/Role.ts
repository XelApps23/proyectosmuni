import { Timestamp } from 'firebase/firestore'

type Role = {
    id: string
    name: string
    description: string
    permissions: string[]
    status: string
    createdAt: Timestamp
    updatedAt: Timestamp
}

interface RoleList {
  [key: string]: Role
}

interface RoleInput extends Omit<Role, 'id'> {}
type RoleUpdate = Partial<RoleInput>

export type { RoleList, Role, RoleInput, RoleUpdate }
