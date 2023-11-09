import React, { useEffect, useState } from 'react'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import NewTaskList from './NewTaskList'
import { AnimatePresence } from 'framer-motion'
import { UserList } from '@/hooks/types/User'
import { TaskList } from '@/hooks/types/Task'
import { Phase, PhaseList } from '@/hooks/types/Phase'
import { formatDate } from '@/services/Utils'

type Props = {
  users: UserList
  tasks: TaskList
  requestPhase: (phase: number) => void
  openTask: (id: string) => void
  phases: PhaseList
  handleDelete: (id: string) => void
}

const TaskListController = ({
  users,
  tasks,
  requestPhase,
  openTask,
  phases,
  handleDelete
}: Props) => {
  const [openPhases, setOpenPhases] = useState<string[]>([])

  const handleFetchTasks = (phase: Phase) => {
    requestPhase(phase.index)

    if (!openPhases.includes(phase.id)) {
      setOpenPhases((prev) => [...prev, phase.id])
    } else {
      setOpenPhases((prev) => prev.filter((item) => item !== phase.id))
    }
  }

  return (
    <div className="mt-2">
      <div className="border border-gray2 rounded-lg overflow-hidden bg-fondo py-2 px-4 mb-1 grid grid-cols-4">
        <span className="text-base col-span-1">Fase</span>
        <span className="text-base col-span-1">Fecha de inicio</span>
        <span className="text-base col-span-1">
          Fecha prevista de finalización
        </span>
        <span className="text-base col-span-1">Tareas finalizadas</span>
      </div>
      {Object.keys(phases).map((key: string) => (
        <div key={key}>
          <button
            className="grid grid-cols-4 rounded-lg hover:bg-fondo bg-white border-fondo border w-full p-4 -pb-4 transition-colors mb-1"
            onClick={() => handleFetchTasks(phases[key])}
          >
            <div className="flex col-span-1">
              <div
                className={
                  'w-5 h-5 mr-2 ' +
                  ` ${
                    openPhases.includes(key) ? 'rotate-90' : 'rotate-0'
                  } transition-transform`
                }
              >
                <ArrowRightIcon />
              </div>
              <span className="text-base text-left">{phases[key].name}</span>
            </div>
            <span className="col-span-1 flex">
              {formatDate(phases[key].initialDate, 'PPPP')}
            </span>
            <span className="col-span-1 flex">
              {formatDate(phases[key].expectedDate, 'PPPP')}
            </span>
            <div className="w-full flex items-center">
              <div className="bg-fondo rounded-full h-3 w-1/2">
                <div
                  style={{
                    width: `${(phases[key].doneTasks / phases[key].totalTasks) * 100}%`
                  }}
                  className={'bg-estadoListo rounded-full h-3 '}
                />
              </div>
              <p className="text-sm ml-4 text-gray2">
                {phases[key].doneTasks} de {phases[key].totalTasks}
              </p>
            </div>
          </button>

          <AnimatePresence mode="wait">
            {openPhases.includes(key) && (
              <NewTaskList
                handleDelete={handleDelete}
                users={users}
                openTask={(id) => openTask(id)}
                tasks={Object.keys(tasks)
                  .map((key) => tasks[key])
                  .filter((task) => task.phase === Number(phases[key].index))
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
