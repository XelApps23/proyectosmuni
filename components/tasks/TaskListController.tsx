import React, { useState } from 'react'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import NewTaskList from './NewTaskList'
import { AnimatePresence } from 'framer-motion'
import { UserList } from '@/hooks/types/User'
import { TaskList } from '@/hooks/types/Task'

type Props = {
  users: UserList
  tasks: TaskList
  requestPhase: (phase: number) => void
  openTask: (id: string) => void
}

type PhasesList = {
  [key: number]: string
}

const phasesList: PhasesList = {
  1: 'Formulación del proyecto',
  2: 'Creación de bases',
  3: 'Adjudicación del proyecto',
  4: 'Contratación del proyecto',
  5: 'Ejecución del proyecto anticipo',
  6: 'Ejecución del proyecto estimaciones',
  7: 'Ejecución del proyecto documento de cambio',
  8: 'Liquidación del proyecto',
  9: 'Otros'
}

const TaskListController = ({
  users, tasks, requestPhase, openTask
}: Props) => {
  const [openPhases, setOpenPhases] = useState<number[]>([])

  const handleFetchTasks = (phase: number) => {
    requestPhase(phase)

    if (!openPhases.includes(phase)) {
      setOpenPhases((prev) => [...prev, phase])
    } else {
      setOpenPhases((prev) => prev.filter((item) => item !== phase))
    }
  }

  return (
    <div className="mt-2">
      <div className="flex flex-col mb-4">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block">
            <div className="border border-gray2 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray2">
                <thead>
                  <tr>
                    <th
                      align="left"
                      className="py-2 px-6 font-normal text-black2 bg-fondo"
                    >
                      Fase y tarea
                    </th>
                    <th
                      align="left"
                      className="py-2 px-6 font-normal text-black2 bg-fondo w-1/2"
                    >
                      Descripción
                    </th>
                    <th
                      align="left"
                      className="py-2 px-6 font-normal text-black2 bg-fondo"
                    >
                      Estado
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      {Object.keys(phasesList).map((key: string) => (
        <div key={key}>
          <button
            className="flex items-start justify-between rounded-lg hover:bg-fondo bg-white border-fondo border w-full p-4 h-20 transition-colors mb-1"
            onClick={() => handleFetchTasks(Number(key))}
          >
            <span className="text-base">{phasesList[Number(key)]}</span>
            <div
              className={
                'w-5 h-5 mr-2 ' +
                ` ${
                  openPhases.includes(Number(key)) ? 'rotate-90' : 'rotate-180'
                } transition-transform`
              }
            >
              <ArrowRightIcon />
            </div>
          </button>

          <AnimatePresence mode="wait">
            {openPhases.includes(Number(key)) && (
              <NewTaskList
                users={users}
                openTask={(id) => openTask(id)}
                tasks={Object.keys(tasks)
                  .map((key) => tasks[key])
                  .filter((task) => task.phase === Number(key))
                  .reduce((cur, task) => {
                    return Object.assign(cur, { [task.id]: task })
                  }, {})}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default TaskListController
