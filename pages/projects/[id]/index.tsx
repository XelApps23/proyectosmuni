import Tabs from '@/components/main/Tabs'
import TaskList from '@/components/tasks/TaskList'
import GanttChart from '@/pages-done/ganttChart'
import { useRouter } from 'next/router'

const ProjectIndex = () => {
  const { query } = useRouter()

  return (
    <div className="">
      <Tabs
        color="blue1"
        taskList={<TaskList projectId={query.id} />}
        gantt={<GanttChart />}
        projectId={query.id}
      />
    </div>
  )
}

export default ProjectIndex
