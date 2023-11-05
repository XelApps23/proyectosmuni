import ArchiveIcon from '@/components/icons/ArchiveIcon'
import GanttChartController from '@/components/ganttChart/GanttChartController'
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
import usePhases from '@/hooks/usePhases'
import TaskModal from '@/components/tasks/TaskModal'
import { Task } from '@/hooks/types/Task'
import useProjects from '@/hooks/useProjects'
import useTasks from '@/hooks/useTasks'
import useUpdates from '@/hooks/useUpdates'
import useUsers from '@/hooks/useUsers'
import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ProjectIndex = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenU, onOpen: onOpenU, onClose: onCloseU } = useDisclosure()
  const { tasks, getTaskFiltered, updateTaskDates, getTask, updateTask } = useTasks()
  const [ids, setIds] = useState<string[]>([])
  const { query } = useRouter()
  const { getProject, projects, updateIncrementalField } = useProjects()
  const { users, getUser, getUsersOfProject } = useUsers()
  const { getUpdatesOfTask, updates } = useUpdates()
  const { getFilesOfProject, getFilesOfTask, files } = useFile()
  const { getPhasesOfProject, phases, updatePhaseDates, updatePhaseIncrementalField, refreshPhases } = usePhases()

  useEffect(() => {
    getProject(query.id as string)
    getPhasesOfProject(query.id as string)
  }, [])

  useEffect(() => {
    if (projects[query.id as string]) {
      projects[query.id as string]?.assignedUsers?.forEach((user) => {
        getUser(user)
      })
    }
  }, [projects])

  useEffect(() => {
    Object.keys(files).forEach((key) => {
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

  const requestPhase = (phase: number) => {
    getTaskFiltered(query.id as string, phase)
  }

  const handleSelectedTask = (key: string) => {
    setSelectedTask(tasks[key])
    onOpen()
  }

  const handleTasksUpdates = async (id: string, status: string) => {
    const phaseToUpdate = Object.keys(phases).map(key => phases[key]).find(phase => phase.index === tasks[id].phase)!
    let wasNotStarted = false

    if (tasks[id].status === 'Listo') {
      await updateIncrementalField(query.id as string, 'doneTasks', '--')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'doneTasks', '--')
    } else if (tasks[id].status === 'En Progreso') {
      await updateIncrementalField(query.id as string, 'startedTasks', '--')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'startedTasks', '--')
    } else if (tasks[id].status === 'Detenido') {
      await updateIncrementalField(query.id as string, 'stoppedTasks', '--')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'stoppedTasks', '--')
    } else if (tasks[id].status === 'No Iniciado') {
      await updateIncrementalField(query.id as string, 'notStartedTasks', '--')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'notStartedTasks', '--')
      wasNotStarted = true
    }

    if (status === 'Listo') {
      await updateIncrementalField(query.id as string, 'doneTasks', '++')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'doneTasks', '++')
      if (wasNotStarted) {
        await updateIncrementalField(query.id as string, 'notStartedTasks', '--')
        await updatePhaseIncrementalField(phaseToUpdate.id, 'notStartedTasks', '--')
      }
    } else if (status === 'En Curso') {
      console.log(status)
      await updateIncrementalField(query.id as string, 'startedTasks', '++')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'startedTasks', '++')
      if (wasNotStarted) {
        await updateIncrementalField(query.id as string, 'notStartedTasks', '--')
        await updatePhaseIncrementalField(phaseToUpdate.id, 'notStartedTasks', '--')
      }
    } else if (status === 'Detenido') {
      await updateIncrementalField(query.id as string, 'stoppedTasks', '++')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'stoppedTasks', '++')
      if (wasNotStarted) {
        await updateIncrementalField(query.id as string, 'notStartedTasks', '--')
        await updatePhaseIncrementalField(phaseToUpdate.id, 'notStartedTasks', '--')
      }
    } else if (status === 'No Iniciado') {
      await updateIncrementalField(query.id as string, 'notStartedTasks', '++')
      await updatePhaseIncrementalField(phaseToUpdate.id, 'notStartedTasks', '++')
    }
  }

  return (
    <Card>
      <Modal
        title="Agregar colaborador"
        isOpen={isOpenU}
        onClose={onCloseU}
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
            onClick={onOpenU}
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
                phases={phases}
                users={users}
                openTask={(id) => handleSelectedTask(id)}
                tasks={tasks}
                requestPhase={(phase) => requestPhase(phase)}
              />
            ),
            name: 'Tareas',
            icon: <GanttIcon />
          },
          {
            component: Object.keys(phases).length > 0 && (
              <GanttChartController
                phases={phases}
                selectedTask={(key) => handleSelectedTask(key)}
                tasks={tasks}
                requestPhase={(phase) => requestPhase(phase)}
                updateTask={(id, startDate, endDate) =>
                  updateTaskDates(id, startDate, endDate)
                }
                updatePhase={(id, startDate, endDate) =>
                  updatePhaseDates(id, startDate, endDate)
                }
              />
            ),
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
      {selectedTask && (
        <TaskModal
          updateTask={async (id, field, value) => {
            console.log(field, value)
            if (field === 'status') {
              await handleTasksUpdates(id, value)
            }
            await updateTask(id, field, value)
          }}
          requestUser={(user) => getUser(user)}
          files={files}
          updates={updates}
          users={users}
          projectId={query.id as string}
          requestFiles={(task) => getFilesOfTask(task)}
          requestUpdates={(update) => getUpdatesOfTask(update)}
          currentTask={selectedTask}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Card>
  )
}

export default ProjectIndex
