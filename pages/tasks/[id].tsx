import Card from '@/components/main/Card'
import PageHeader from '@/components/main/PageHeader'
import useTasks from '@/hooks/useTasks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const TaskInfo = () => {
  const { query } = useRouter()
  const { getTask, tasks } = useTasks()

  useEffect(() => {
    getTask(query.id as string)
  }, [])

  return (
    <Card>
      <PageHeader title={'Tarea - ' + tasks[query.id as string]?.name ?? ''} />
      <div>
        <span className="font-bold mr-1">Descripción:</span>
        <span>{tasks[query.id as string]?.description ?? ''}</span>
      </div>
    </Card>
  )
}

export default TaskInfo
