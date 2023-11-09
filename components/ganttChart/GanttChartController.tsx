import RcGantt, { GanttProps } from 'rc-gantt'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { ganttLocaleEs } from '@/services/Utils'
import { Tooltip } from '@chakra-ui/react'
import { TaskList } from '@/hooks/types/Task'
import { Timestamp } from 'firebase/firestore'
import { PhaseList } from '@/hooks/types/Phase'
import { useSelector } from 'react-redux'

type Props = {
  tasks: TaskList
  phases: PhaseList
  requestPhase: (phase: number) => void
  updateTask: (id: string, startDate: Date, endDate: Date) => Promise<void>
  updatePhase: (id: string, startDate: Date, endDate: Date) => Promise<void>
  selectedTask: (id: string) => void
}

const handleDate = (timestamp: Timestamp | null) => {
  if (timestamp) {
    return dayjs(timestamp.toDate()).format('YYYY-MM-DD')
  } else {
    return undefined
  }
}

const GanttChartController = ({
  phases,
  tasks,
  requestPhase,
  updateTask,
  updatePhase,
  selectedTask
}: Props) => {
  const [collapsedPhases, setCollapsedPhases] = useState<number[]>([])
  const [data, setData] = useState<GanttProps['data']>(
    Object.keys(phases).map((key) => ({
      name: (
        <Tooltip label={phases[key].name} key={phases[key].index}>
          <div className="text-ellipsis overflow-hidden">
            {phases[key].name}
          </div>
        </Tooltip>
      ),
      id: key,
      key: phases[key].index,
      startDate: handleDate(phases[key].initialDate),
      endDate: handleDate(phases[key].expectedDate),
      collapsed: true,
      content: 'phase',
      children: [
        {
          name: 'Cargando...',
          startDate: '2023-07-10',
          endDate: '2023-07-12',
          content: 'task'
        }
      ]
    }))
  )
  dayjs.locale('es')

  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      handleChangeData()
    }
  }, [tasks])

  const handleExpand = (phase: number) => {
    requestPhase(phase)
    if (!collapsedPhases.includes(phase)) {
      setCollapsedPhases((prev) => [...prev, phase])
    } else {
      setCollapsedPhases((prev) => prev.filter((item) => item !== phase))
    }
  }

  const { permissions } = useSelector(state => state.login)

  const handleChangeData = () => {
    setData((prevData) => {
      const newData = prevData.map((phaseData) => {
        const phaseTasks = Object.keys(tasks)
          .map((key) => tasks[key])
          .filter((task) => task.phase === Number(phaseData.key))
        return {
          ...phaseData,
          collapsed: !collapsedPhases.includes(Number(phaseData.key)),
          children:
            phaseTasks.length > 0
              ? phaseTasks.map((task) => ({
                name: (
                    <Tooltip key={task.id} label={task.description}>
                      <div className="text-ellipsis overflow-hidden cursor-pointer" onClick={() => selectedTask(task.id)}>
                        {task.name} {task.description}
                      </div>
                    </Tooltip>
                ),
                startDate: handleDate(task.initialDate),
                endDate: handleDate(task.expectedDate),
                content: task.description
              }))
              : [
                  {
                    name: 'Cargando...',
                    startDate: '2023-07-10',
                    endDate: '2023-07-12',
                    content: '123123123'
                  }
                ]
        }
      })
      return newData
    })
  }

  return (
    <div style={{ width: '100%', height: 700 }} className="select-none">
      <RcGantt
        disabled={!permissions?.includes('projects/task-update-all')}
        locale={ganttLocaleEs}
        unit={'day'}
        data={data}
        columns={[
          {
            name: 'name',
            label: 'Tarea',
            width: 200,
            maxWidth: 400,
            minWidth: 200
          }
        ]}
        onExpand={(record) => handleExpand(Number(record.name.key))}
        onUpdate={async (row, startDate, endDate) => {
          if (row.content === 'phase') {
            if (startDate.length > 12 && endDate.length > 12) {
              await updatePhase(row.id, new Date(startDate), new Date(endDate))
            } else if (startDate.length > 12 && endDate.length < 12) {
              console.log(endDate)
              await updatePhase(
                row.id,
                new Date(startDate),
                new Date(endDate + ' 23:59:59')
              )
            } else if (startDate.length < 12 && endDate.length > 12) {
              await updatePhase(
                row.id,
                new Date(startDate + ' 00:00:00'),
                new Date(endDate)
              )
            }
          } else {
            if (startDate.length > 12 && endDate.length > 12) {
              await updateTask(
                row.name.key,
                new Date(startDate),
                new Date(endDate)
              )
            } else if (startDate.length > 12 && endDate.length < 12) {
              console.log(endDate)
              await updateTask(
                row.name.key,
                new Date(startDate),
                new Date(endDate + ' 23:59:59')
              )
            } else if (startDate.length < 12 && endDate.length > 12) {
              await updateTask(
                row.name.key,
                new Date(startDate + ' 00:00:00'),
                new Date(endDate)
              )
            }
          }
          return true
        }}
      />
    </div>
  )
}

export default GanttChartController
