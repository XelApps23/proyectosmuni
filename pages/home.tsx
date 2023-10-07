import BaseLayout from '@/src/components/BaseLayout'
import Button from '@/components/main/Button'
import useProjects from '@/hooks/useProjects'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CardFolder from '@/components/main/CardFolder'
import PlusIcon from '@/components/icons/PlusIcon'

const Home = () => {
  const { getProjects, projects } = useProjects()
  const router = useRouter()

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <BaseLayout>
      <div className="grid p-10 w-full bg-white1 rounded-lg gap-8">
        <div className="flex justify-between items-center w-full ">
          <h1 className="text-xl">Proyectos Recientes</h1>
          <div className='w-40'>
            <Button variant="primary" text="Nuevo proyecto" icon={<PlusIcon/>} onClick={() => router.push('/projects/new-project')}/>
          </div>
        </div>

        <div className="flex flex-wrap justify-start gap-y-8 gap-x-3.5 bg-white w-full">
          {Object.keys(projects).map((key, index) => (
         <CardFolder
          projectId={key}
          key={key}
          title={projects[key].name}
          porcentaje={22}
          />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home
