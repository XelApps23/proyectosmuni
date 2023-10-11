import { useState } from 'react'
import Notification from './Notification'

const tabs = ['Reciente', 'Todos', 'No Leído', 'Asignaciones']

const NotificationPanel = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="border-b border-fondo mt-4">
        <ul className="flex flex-wrap text-sm text-center text-gray1">
          {tabs.map((tab, index) => (
            <li className="mr-2" key={tab}>
              <a
                onClick={() => setActiveTab(index)}
                href="#"
                className={
                  (activeTab === index
                    ? 'border-blue2 border-b-2'
                    : ' border-fondo border-b') +
                  ' flex items-center justify-center p-2   rounded-t-lg group'
                }
              >
                <span>{tab}.</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {[
          {
            emiter: 'Donald Daniel Abac Lopez',
            type: 'added',
            read: false,
            object: 'Tarea 1'
          },
          {
            emiter: 'Donald Daniel Abac Lopez',
            type: 'added',
            read: true,
            object: 'Tarea 2',
            message: 'Te ha asignado la tarea 2',
            objectType: 'task'
          }
        ].map((n, index) => (
          <Notification key={index} notification={n} />
        ))}
      </div>
    </>
  )
}

export default NotificationPanel
