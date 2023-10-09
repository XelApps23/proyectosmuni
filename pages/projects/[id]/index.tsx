import GanttIcon from '@/components/icons/GanttIcon'
import GraphicsIcon from '@/components/icons/GraphicsIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import UserIcon from '@/components/icons/UserIcon'
import Card from '@/components/main/Card'
import Table from '@/components/main/Table'
import Tabs from '@/components/main/Tabs'
import ProjectSummary from '@/components/projects/ProjectSummary'
import TaskList from '@/components/tasks/TaskList'
import useProjects from '@/hooks/useProjects'
import useUsers from '@/hooks/useUsers'
import GanttChart from '@/pages-done/ganttChart'
import Graphic from '@/pages-done/graphic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProjectIndex = () => {
  const { query } = useRouter()
  const { getProject, projects } = useProjects()
  const { users, getUsers } = useUsers()

  useEffect(() => {
    getProject(query.id as string)
    getUsers({})
  }, [])

  return (
    <Card>
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl">{projects[query.id as string]?.name}</div>
      </div>
      <Tabs
        changedTab={(tab: number) => console.log(tab)}
        tabs={[
          {
            component: <ProjectSummary />,
            name: 'Resumen',
            icon: <HomeIcon />
          },
          {
            component: <TaskList />,
            name: 'Tareas',
            icon: <GanttIcon />
          },
          {
            component: <GanttChart />,
            name: 'Diagrama de Gantt',
            icon: <GraphicsIcon />
          },
          {
            component: (
              <div className="mt-4">
                <Table
                cells={Object.keys(users).map((key) => ({
                  name: `${users[key].firstname} ${users[key].lastname}`,
                  email: users[key].email,
                  testt: users[key].firstname
                }))}
                headers={['Nombre', 'Correo', 'Acciones']}
              />
              </div>
            ),
            name: 'Colaboradores',
            icon: <UserIcon />
          }
        ]}
      />
    </Card>
  )
}

export default ProjectIndex
