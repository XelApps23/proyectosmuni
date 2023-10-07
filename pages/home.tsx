import BaseLayout from '@/src/components/BaseLayout'
import Button from '@/components/main/Button'
import useProjects from '@/hooks/useProjects'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CardFolder from '@/components/main/CardFolder'
import PlusIcon from '@/components/icons/PlusIcon'
import PageHeader from '@/components/main/PageHeader'

const Home = () => {
  const { getProjects, projects } = useProjects()
  const router = useRouter()

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <>
      <PageHeader title="Proyectos" />
      <h2 className="text-xl">Proyectos Recientes</h2>

      {/* <div className="flex justify-between items-center w-full ">
        <div className="w-40">
          <Button
            variant="primary"
            text="Nuevo proyecto"
            icon={<PlusIcon />}
            onClick={() => router.push('/projects/new-project')}
          />
        </div>
      </div> */}
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-cols-2 justify-start bg-white w-full">
        {Object.keys(projects).map((key, index) => (
          <CardFolder
            projectId={key}
            key={key}
            title={projects[key].name}
            progress={projects[key].progress || 22}
          />
        ))}
      </div>
    </>
  )
}

export default Home
