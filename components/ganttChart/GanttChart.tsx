// components
import { useState, useEffect } from 'react'
import Grid from '../../components/ganttChart/Grid'
import Tasks from '../../components/ganttChart/Tasks'
import TimeTable from '../../components/ganttChart/TimeTable'
import client from '../../utils/fetchWrapper'
import useTasks from '@/hooks/useTasks'
import { TaskList } from '@/hooks/types/Task'

type Props = {
  tasks: TaskList
  requestPhase: (phase: number) => void
}

export default function GanttChart({ tasks, requestPhase }: Props) {
  const [timeRange] = useState({
    fromSelectMonth: 9,
    fromSelectYear: '2023',
    toSelectMonth: 11,
    toSelectYear: '2023'
  })

  useEffect(() => {
    requestPhase(1)
  }, [])

  return (
    <div id="gantt-container">
      <Grid>
        <Tasks tasks={tasks} />
        <TimeTable timeRange={timeRange} tasks={tasks} />
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
          --border-radius: 5px;
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}
