import { TaskList } from '@/hooks/types/Task'
import { motion } from 'framer-motion'
import { Tooltip } from '@chakra-ui/react'
import Bubble from '../main/Bubble'
import { formatDate } from '@/services/Utils'
import { UserList } from '@/hooks/types/User'

type Props = {
  tasks: TaskList,
  users: UserList
  openTask: (id: string) => void
}

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 gap-2 p-2',
  colTitle: 'font-semibold text-sm'
}

const NewTaskList = ({
  tasks,
  openTask,
  users
}: Props) => {
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
              <tbody className="divide-y divide-gray2">
                {Object.keys(tasks).map((key, index) => (
                  <tr
                    key={index}
                    onClick={() => openTask(key)}
                    className="cursor-pointer"
                  >
                    <td className={styles.cell}>{tasks[key]?.name}</td>
                    <Tooltip label={tasks[key]?.description}>
                      <td className="px-6 py-4 max-w-[300px] overflow-x-hidden whitespace-nowrap text-ellipsis">
                        {tasks[key]?.description}
                      </td>
                    </Tooltip>
                    <td className={styles.cell}>Resp</td>
                    <td className={styles.cell}>
                      {formatDate(tasks[key]?.initialDate, 'dd-MM-yyyy')}
                    </td>
                    <td className={styles.cell}>
                      {formatDate(tasks[key]?.expectedDate, 'dd-MM-yyyy')}
                    </td>
                    <td className={styles.cell}>
                      <Bubble type={tasks[key]?.priority} />
                    </td>
                    <td className={styles.cell}>
                      <Bubble type={tasks[key]?.status} />
                    </td>
                    <td className={styles.cell}>OP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NewTaskList
