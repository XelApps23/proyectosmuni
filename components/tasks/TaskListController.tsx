import React, { useState } from 'react'
import useTasks from '@/hooks/useTasks'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import NewTaskList from './NewTaskList'
import { AnimatePresence } from 'framer-motion'
import { FileList } from '@/hooks/types/File'
import { UpdateList } from '@/hooks/types/Update'
import { UserList } from '@/hooks/types/User'

type Props = {
  projectId: string
  files: FileList
  requestFiles: (task: string) => void
  requestUpdates: (update: string) => void
  updates: UpdateList
  users: UserList
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
  projectId,
  files,
  requestFiles,
  requestUpdates,
  updates,
  users
}: Props) => {
  const [fetchedPhases, setFetchedPhases] = useState<number[]>([])
  const [openPhases, setOpenPhases] = useState<number[]>([])
  const { getTaskFiltered, tasks } = useTasks()

  const handleFetchTasks = (phase: number) => {
    console.log(fetchedPhases)
    console.log(openPhases)

    if (!fetchedPhases.includes(phase)) {
      getTaskFiltered(projectId, phase)
      setFetchedPhases((prev) => [...prev, phase])
    }

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
                requestFiles={requestFiles}
                requestUpdates={requestUpdates}
                updates={updates}
                files={files}
                projectId={projectId}
                tasks={Object.keys(tasks)
                  .map((key) => tasks[key])
                  .filter((task) => task.phase === Number(key))
                  .reduce((cur, task) => {
                    return Object.assign(cur, { [task.id]: task })
                  }, {})}
                loading={false}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default TaskListController
