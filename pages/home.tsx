import Card from '@/components/main/Card'
import CardFolder from '@/components/main/CardFolder'
import PageHeader from '@/components/main/PageHeader'
import NotificationPanel from '@/components/notifications/NotificationPanel'
import useProjects from '@/hooks/useProjects'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { projects, getProjects } = useProjects()
  const { permissions, id } = useSelector((state) => state.login)

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <Card>
      <PageHeader title="Inicio Rápido"></PageHeader>
      <div>
        <div className="text-xl mb-4">Proyectos Recientes</div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 grid-cols-2 justify-start bg-white pr-8">
          {permissions?.includes('projects/view-all')
            ? (
                Object.keys(projects).map((key) => (
              <CardFolder
                projectId={key}
                key={key}
                title={projects[key].name}
                progress={Number(
                  (
                    (projects[key].doneTasks / projects[key].totalTasks) *
                    100
                  ).toFixed(2)
                )}
              />
                ))
              )
            : permissions?.includes('projects/view-assign')
              ? (
                  Object.keys(projects)
                    .map((key) => projects[key])
                    .filter((project) => project.assignedUsers?.includes(id))
                    .map((project) => (
                <CardFolder
                  projectId={project.id}
                  key={project.id}
                  title={project.name}
                  progress={Number(
                    ((project.doneTasks / project.totalTasks) * 100).toFixed(2)
                  )}
                />
                    ))
                )
              : (
            <div></div>
                )}
        </div>
      </div>
    </Card>
  )
}

export default Home
