import ArchiveIcon from '@/components/icons/ArchiveIcon'
import GanttIcon from '@/components/icons/GanttIcon'
import GraphicsIcon from '@/components/icons/GraphicsIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import UserIcon from '@/components/icons/UserIcon'
import Button from '@/components/main/Button'
import Card from '@/components/main/Card'
import Modal from '@/components/main/Modal'
import Table from '@/components/main/Table'
import Tabs from '@/components/main/Tabs'
import UserSelector from '@/components/main/UserSelector'
import FilesTable from '@/components/projects/FilesTable'
import ProjectSummary from '@/components/projects/ProjectSummary'
import TaskListController from '@/components/tasks/TaskListController'
import useFile from '@/hooks/useFile'
import useProjects from '@/hooks/useProjects'
import useUpdates from '@/hooks/useUpdates'
import useUsers from '@/hooks/useUsers'
import GanttChart from '@/pages-done/ganttChart'
import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ProjectIndex = () => {
  const [ids, setIds] = useState<string[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { query } = useRouter()
  const { getProject, projects } = useProjects()
  const { users, getUsers } = useUsers()
  const { getUpdatesOfTask, updates } = useUpdates()
  const { getFilesOfProject, getFilesOfTask, files } = useFile()

  useEffect(() => {
    getProject(query.id as string)
  }, [])

  useEffect(() => {
    Object.keys(files).forEach(key => {
      getTask(files[key].taskId)
    })
  }, [files])
  

  const handleInvite = () => {
    console.log()
  }

  const handleTabChange = (tab: number) => {
    if (tab === 4) {
      getFilesOfProject(query.id as string)
    }
  }

  return (
    <Card>
      <Modal
        title="Agregar colaborador"
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <>
            <Button
              onClick={() => handleInvite()}
              variant="primary"
              text="Confirmar"
            ></Button>
          </>
        }
      >
        <UserSelector label="Agregar colaborador" setIds={setIds} />
      </Modal>
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl">{projects[query.id as string]?.name}</div>
        <div>
          <Button
            onClick={onOpen}
            variant="primary"
            icon={<PlusIcon color="white" />}
            text="Agregar colaborador"
          />
        </div>
      </div>
      <Tabs
        changedTab={(tab: number) => handleTabChange(tab)}
        tabs={[
          {
            component: projects[query.id as string] && (
              <ProjectSummary project={projects[query.id as string]} />
            ),
            name: 'Resumen',
            icon: <HomeIcon />
          },
          {
            component: projects[query.id as string] && (
              <TaskListController
                users={users}
                files={files}
                updates={updates}
                requestUpdates={(update) => getUpdatesOfTask(update)}
                requestFiles={(task) => getFilesOfTask(task)}
                projectId={projects[query.id as string].id}
              />
            ),
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
          },
          {
            component: <FilesTable files={files} tasks={tasks} />,
            name: 'Archivos',
            icon: <ArchiveIcon />
          }
        ]}
      />
    </Card>
  )
}

export default ProjectIndex
