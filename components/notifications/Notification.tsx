import React from 'react'
import Button from '../main/Button'
import NotificationIcon from '../icons/NotificationIcon'
import CircleIcon from '../icons/CircleIcon'
import CheckIcon from '../icons/CheckIcon'

type NotificationType = {
  read?: boolean
  type?: string
  message?: string
  emiter?: string
  object?: string
  objectType?: string
  mention?: string
}

type Props = {
  notification: NotificationType
}

const Notification = ({ notification }: Props) => {
  return (
    <div
      className={
        (notification.read ? 'bg-skyBlue' : 'bg-fondo') +
        ' w-full rounded-lg mb-4 flex p-4'
      }
    >
      <img className="min-h-[60px] min-w-[60px] bg-aprobadoHoverig md:bg-black1"></img>
      <div className="text-sm ml-4 flex flex-col justify-between w-full">
        <div>
          <span>{notification.emiter}</span> <span>{notification.type}</span>{' '}
          <span>{notification.object}</span>
        </div>
        {notification.message && (
          <div className="my-2">
            <span>{notification.mention}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray1 text-sm">4d • {notification.object}</span>
          <div>
            <button className="w-4 h-4">
              {notification.read ? <CircleIcon /> : <CheckIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
