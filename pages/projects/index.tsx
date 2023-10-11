import useProjects from '@/hooks/useProjects'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CardFolder from '@/components/main/CardFolder'
import PageHeader from '@/components/main/PageHeader'
import Card from '@/components/main/Card'

const Home = () => {
  const { getProjects, projects } = useProjects()
  const router = useRouter()

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <Card>
      <PageHeader
        actionText="Nuevo Proyecto"
        actionButton={() => router.push('projects/new-project')}
        title="Proyectos"
      />
      <h2 className="text-xl mb-4">Proyectos en curso</h2>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-cols-2 justify-start bg-white w-full">
        {Object.keys(projects).map((key) => (
          <CardFolder
            projectId={key}
            key={key}
            title={projects[key].name}
            progress={20}
          />
        ))}
      </div>
      <h2 className="text-xl mb-4 mt-6">Proyectos en curso</h2>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-cols-2 justify-start bg-white w-full">
        {Object.keys(projects).map((key) => (
          <CardFolder
            projectId={key}
            key={key}
            title={projects[key].name}
            progress={20}
          />
        ))}
      </div>
    </Card>
  )
}

export default Home
