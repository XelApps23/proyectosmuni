import { Timestamp } from 'firebase/firestore'

type Notification = {
  id: string
  receiver: string
  emiter: string
  title: string
  message: string
  object: string,
  objectType: string
  type: string
  read: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface NotificationList {
  [key: string]: Notification
}

interface NotificationInput extends Omit<Notification, 'id'> {}
type NotificationUpdate = Partial<NotificationInput>

export type { NotificationList, Notification, NotificationInput, NotificationUpdate }
