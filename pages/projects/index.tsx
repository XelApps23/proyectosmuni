import useProjects from '@/hooks/useProjects'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CardFolder from '@/components/main/CardFolder'
import PageHeader from '@/components/main/PageHeader'
import Card from '@/components/main/Card'
import { useSelector } from 'react-redux'

const Home = () => {
  const { getProjects, projects } = useProjects()
  const router = useRouter()

  const { permissions, id } = useSelector((state) => state.login)

  useEffect(() => {
    getProjects()
  }, [])

  useEffect(( ) => {
    console.log(projects)
  }, [projects])

  return (
    <Card>
      <PageHeader
        actionText="Nuevo Proyecto"
        permission={permissions?.includes('projects/create')}
        actionButton={() => router.push('projects/new-project')}
        title="Proyectos"
      />
      <h2 className="text-xl mb-4">Proyectos en curso</h2>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-cols-2 justify-start bg-white w-full">
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
    </Card>
  )
}

export default Home
