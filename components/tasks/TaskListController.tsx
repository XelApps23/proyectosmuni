import React, { useEffect, useState } from 'react'
import TaskListTable from './TaskListTable'
import useTasks from '@/hooks/useTasks'
import ArrowRightIcon from '../icons/ArrowRightIcon'

type Props = {
  projectId: string
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

const TaskListController = ({ projectId }: Props) => {
  const [fetchedPhases, setFetchedPhases] = useState<number[]>([])
  const [openPhases, setOpenPhases] = useState<number[]>([])
  const { getTaskFiltered, tasks, loading } = useTasks()

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
      {Object.keys(phasesList).map((key: string) => (
        <div key={key}>
          <button
            className="flex items-center p-2 rounded-lg hover:bg-fondo transition-colors mb-1"
            onClick={() => handleFetchTasks(Number(key))}
          >
            <div
              className={
                'w-5 h-5 mr-2' +
                ` ${
                  openPhases.includes(Number(key)) ? 'rotate-90' : 'rotate-0'
                } transition-transform`
              }
            >
              <ArrowRightIcon />
            </div>
            <span className="text-base">{phasesList[Number(key)]}</span>
          </button>
          {openPhases.includes(Number(key)) && (
            <TaskListTable
              idPhase={Number(key)}
              tasks={Object.keys(tasks)
                .map((key) => tasks[key])
                .filter((task) => task.phase === Number(key))
                .reduce((cur, task) => {
                  return Object.assign(cur, { [task.id]: task })
                }, {})}
              loading={loading}
              projectId={projectId}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskListController
