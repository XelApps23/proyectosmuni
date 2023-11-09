import { useState, useEffect, useRef } from 'react'
import Grid from '../../components/ganttChart/Grid'
import Tasks from '../../components/ganttChart/Tasks'
import TimeTable from '../../components/ganttChart/TimeTable'
import client from '../../utils/fetchWrapper'
import useTasks from '@/hooks/useTasks'
import { TaskList } from '@/hooks/types/Task'
import { useDraggable } from 'react-use-draggable-scroll'

type Props = {
  tasks: TaskList
  requestPhase: (phase: number) => void
}

export default function GanttChart({ tasks, requestPhase }: Props) {
  const [openPhases, setOpenPhases] = useState<number[]>([])
  const ref = useRef<any>() // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref)

  const [timeRange] = useState({
    fromSelectMonth: 9,
    fromSelectYear: '2023',
    toSelectMonth: 11,
    toSelectYear: '2023'
  })

  const handleFetchTasks = (phase: number) => {
    requestPhase(phase)

    if (!openPhases.includes(phase)) {
      setOpenPhases((prev) => [...prev, phase])
    } else {
      setOpenPhases((prev) => prev.filter((item) => item !== phase))
    }
  }

  return (
    <div
      id="gantt-container"
      className="rounded-lg h-[70vh] overflow-y-scroll"
      ref={ref}
      {...events}
    >
      <Grid>
        <Tasks
          tasks={Object.keys(tasks)
            .map((key) => tasks[key])
            .filter((task) => task.phase === Number(key))
            .reduce((cur, task) => {
              return Object.assign(cur, { [task.id]: task })
            }, {})}
          clickPhase={(phase: number) => handleFetchTasks(phase)}
        />
        {openPhases.map((key) => (
          <>
            {openPhases.includes(Number(key)) && (
              <TimeTable
                timeRange={timeRange}
                tasks={Object.keys(tasks)
                  .map((key) => tasks[key])
                  .filter((task) => task.phase === Number(key))
                  .reduce((cur, task) => {
                    return Object.assign(cur, { [task.id]: task })
                  }, {})}
              />
            )}
          </>
        ))}
      </Grid>
      <style jsx>{`
        #gantt-container {
          --color-text: #272a2e;
          --color-primary-dark: #0195e4;
          --color-primary-light: #9ddcff;
          --color-secondary: #0073ea;
          --color-tertiary: #f7f7f7;
          --color-orange: #ef5350;
          --color-outline: #e9eaeb;
          --border-radius: 8px;
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}
