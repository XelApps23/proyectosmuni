import GanttIcon from '@/components/icons/GanttIcon'
import GraphicsIcon from '@/components/icons/GraphicsIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import Card from '@/components/main/Card'
import PageHeader from '@/components/main/PageHeader'
import Tabs from '@/components/main/Tabs'
import ProjectSummary from '@/components/projects/ProjectSummary'
import TaskList from '@/components/tasks/TaskList'
import useProjects from '@/hooks/useProjects'
import GanttChart from '@/pages-done/ganttChart'
import Graphic from '@/pages-done/graphic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProjectIndex = () => {
  const { query } = useRouter()
  const { getProject, projects } = useProjects()

  useEffect(() => {
    getProject(query.id as string)
  }, [])

  return (
    <Card>
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl">{projects[query.id as string]?.name}</div>
      </div>
      <Tabs
        tabs={[
          {
            component: <ProjectSummary />,
            name: 'Resumen',
            icon: <HomeIcon />
          },
          {
            component: <TaskList projectId='sdasda' />,
            name: 'Tareas',
            icon: <GanttIcon />
          },
          {
            component: <GanttChart />,
            name: 'Diagrama de Gantt',
            icon: <GraphicsIcon />
          }
        ]}
      />
    </Card>
  )
}

export default ProjectIndex
