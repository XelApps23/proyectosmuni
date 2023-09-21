import BaseLayout from '@/src/components/BaseLayout'
import Card from '../src/components/Card'
import Button from '@/components/main/Button'
import useProjects from '@/hooks/useProjects'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
  const { getProjects, projects } = useProjects()
  const router = useRouter()

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <BaseLayout>
      <div className="p-10 w-full">
        <div className="mt-12 flex justify-between items-center px-12">
          <h1 className="text-xl">Proyectos Recientes</h1>
          <div>
            <Button variant="primary" text="Nuevo proyecto" onClick={() => router.push('/projects/new-project')}/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-9">
          {Object.keys(projects).map((key, index) => (
            <Card
              projectId={key}
              key={index}
              title={projects[key].name}
              imageUrl={'/img/Folder.png'}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home
