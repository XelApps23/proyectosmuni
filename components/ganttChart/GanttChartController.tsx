import RcGantt, { GanttProps } from 'rc-gantt'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { ganttLocaleEs } from '@/services/Utils'
import { Tooltip } from '@chakra-ui/react'
import { TaskList } from '@/hooks/types/Task'
import { Timestamp } from 'firebase/firestore'

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

type Props = {
  tasks: TaskList
  requestPhase: (phase: number) => void
  update: (id: string, startDate: Date, endDate: Date) => Promise<void>
}

const GanttChartController = ({ tasks, requestPhase, update }: Props) => {
  const [collapsedPhases, setCollapsedPhases] = useState<number[]>([])
  const [data, setData] = useState<GanttProps['data']>(
    Object.keys(phasesList).map((phase) => ({
      name: (
        <Tooltip label={phasesList[Number(phase)]} key={Number(phase)}>
          <div className="text-ellipsis overflow-hidden">
            {phasesList[Number(phase)]}
          </div>
        </Tooltip>
      ),
      key: phase,
      startDate: '2023-07-10',
      endDate: '2023-07-12',
      collapsed: true,
      content: '123123123',
      children: [
        {
          name: 'Cargando...',
          startDate: '2023-07-10',
          endDate: '2023-07-12',
          content: '123123123'
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

  const handleDate = (timestamp: Timestamp | null) => {
    if (timestamp) {
      return dayjs(timestamp.toDate()).format('YYYY-MM-DD')
    } else {
      return undefined
    }
  }

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
                      <div className="text-ellipsis overflow-hidden">
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
    <div style={{ width: '100%', height: 500 }} className="select-none">
      <RcGantt
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
          console.log(startDate, endDate)
          if (startDate.length > 12 && endDate.length > 12) {
            await update(row.name.key, new Date(startDate), new Date(endDate))
          } else if (startDate.length > 12 && endDate.length < 12) {
            console.log(endDate)
            await update(
              row.name.key,
              new Date(startDate),
              new Date(endDate + ' 23:59:59')
            )
          } else if (startDate.length < 12 && endDate.length > 12) {
            await update(
              row.name.key,
              new Date(startDate + ' 00:00:00'),
              new Date(endDate)
            )
          }
          return true
        }}
      />
    </div>
  )
}

export default GanttChartController
