import Card from '@/components/main/Card'
import CardFolder from '@/components/main/CardFolder'
import PageHeader from '@/components/main/PageHeader'
import NotificationPanel from '@/components/notifications/NotificationPanel'
import useProjects from '@/hooks/useProjects'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useEffect } from 'react'

const Home = () => {
  const { projects, getProjects } = useProjects()

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <Card>
      <PageHeader title="Inicio Rápido"></PageHeader>
      <div className="grid grid-cols-2">
        <div>
          <div className="text-xl mb-4">Proyectos Recientes</div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-4 grid-cols-2 justify-start bg-white pr-8">
            {Object.keys(projects).map((key, index) => (
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
            ))}
          </div>
        </div>
        <div>
          <span className="text-xl">Notificaciones</span>
          <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Actions
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
        </div>
      </div>
    </Card>
  )
}

export default Home
