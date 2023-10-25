// components
import { useState, useEffect } from 'react'
import Grid from '../../components/ganttChart/Grid'
import Tasks from '../../components/ganttChart/Tasks'
import TimeTable from '../../components/ganttChart/TimeTable'
import client from '../../utils/fetchWrapper'

export default function GanttChart () {
  const [tasks, setTasks] = useState(null)
  const [taskDurations, setTaskDurations] = useState(null)
  const [timeRange] = useState({
    fromSelectMonth: 9,
    fromSelectYear: '2023',
    toSelectMonth: 11,
    toSelectYear: '2023'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonResponse = await client()
        const { tasks, taskDurations } = JSON.parse(jsonResponse)
        setTasks(tasks)
        setTaskDurations(taskDurations)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div id="gantt-container">
      <Grid>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
        />
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
