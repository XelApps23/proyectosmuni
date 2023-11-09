import { Task, TaskList } from '@/hooks/types/Task'
import { motion } from 'framer-motion'
import { Tooltip } from '@chakra-ui/react'
import Bubble from '../main/Bubble'
import { formatDate } from '@/services/Utils'
import { UserList } from '@/hooks/types/User'
import TrashIcon from '../icons/TrashIcon'
import ProfilePicture from '../main/ProfilePicture'
import { useSelector } from 'react-redux'

type Props = {
  tasks: TaskList
  users: UserList
  openTask: (id: string) => void
  handleDelete: (id: string) => void
}

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 gap-2 p-2',
  colTitle: 'font-semibold text-sm'
}

const NewTaskList = ({ tasks, openTask, users, handleDelete }: Props) => {
  const { permissions, id } = useSelector((state) => state.login)

  const displayRow = (task: Task) => {
    return (
      <tr
        key={task.id}
        onClick={() => openTask(task.id)}
        className="cursor-pointer"
      >
        <td className={styles.cell}>{task?.name}</td>
        <Tooltip label={task?.description}>
          <td className="px-6 py-4 max-w-[300px] overflow-x-hidden whitespace-nowrap text-ellipsis">
            {task?.description}
          </td>
        </Tooltip>
        <td className={styles.cell + ' flex'}>
          {task.assignedUsers.map((userId) => (
            <div key={userId} className="flex items-center">
              <Tooltip
                label={`${users[userId].firstname} ${users[userId].lastname} (${users[userId].email})`}
              >
                <div className="w-8 h-8 mr-2">
                  <ProfilePicture user={users[userId]} />
                </div>
              </Tooltip>
            </div>
          ))}
        </td>
        <td className={styles.cell}>
          {formatDate(task?.initialDate, 'dd-MM-yyyy')}
        </td>
        <td className={styles.cell}>
          {formatDate(task?.expectedDate, 'dd-MM-yyyy')}
        </td>
        <td className={styles.cell}>
          <Bubble type={task?.priority} />
        </td>
        <td className={styles.cell}>
          <Bubble type={task?.status} />
        </td>
        <td className={styles.cell}>
          {permissions.includes('projects/task-delete') && (
            <Tooltip label="Eliminar">
              <div
                className="w-5 h-5 mr-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(task.id)
                }}
              >
                <TrashIcon />
              </div>
            </Tooltip>
          )}
        </td>
      </tr>
    )
  }

  return (
    <motion.div
      className="flex flex-col bg-fondo mb-4"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block">
          <div className="border border-gray2 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray2">
              <thead>
                <tr>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Tarea
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Descripción
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Responsables
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Fecha de inicio
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Fecha prevista de finalización
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Prioridad
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Estado
                  </th>
                  <th
                    align="left"
                    className="py-2 px-6 font-normal text-black2 bg-fondo"
                  >
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray2">
                {permissions.includes('projects/task-view-all')
                  ? (
                      Object.keys(tasks).map((key, index) => displayRow(tasks[key]))
                    )
                  : permissions.includes('projects/task-view-assign')
                    ? (
                        Object.keys(tasks)
                          .map((key) => tasks[key])
                          .filter((task) => task.assignedUsers.includes(id))
                          .map((task: Task) => displayRow(task))
                      )
                    : (
                  <></>
                      )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NewTaskList
