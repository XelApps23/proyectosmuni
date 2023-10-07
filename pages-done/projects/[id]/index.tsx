import Tabs from '@/components/main/Tabs'
import TaskList from '@/components/tasks/TaskList'
import GanttChart from '@/pages-done/ganttChart'
import BaseLayout from '@/src/components/BaseLayout'
import { useRouter } from 'next/router'

const ProjectIndex = () => {
  const { query } = useRouter()

  return (
    <BaseLayout>
      <div className="mt-20 px-16 w-full ">
        <Tabs
          color="blue1"
          taskList={<TaskList projectId={query.id} />}
          gantt={<GanttChart />}
          projectId={query.id}
        />
        ;
      </div>
    </BaseLayout>
  )
}

export default ProjectIndex
