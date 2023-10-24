import { TaskList } from '@/hooks/types/Task'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import Modal from '../main/Modal'
import Divider from '../main/Divider'
import Bubble from '../main/Bubble'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { formatDate } from '@/services/Utils'
import Tabs from '../main/Tabs'
import MenuIcon from '../icons/MenuIcon'
import ArchiveIcon from '../icons/ArchiveIcon'
import ChatIcon from '../icons/ChatIcon'
import EditIcon from '../icons/EditIcon'

type Props = {
  tasks: TaskList
  loading: boolean
}

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 gap-2 p-2',
  colTitle: 'font-semibold text-sm'
}

const NewTaskList = ({ tasks, loading }: Props) => {
  const [currentTask, setCurrentTask] = useState<string>('')
  const { onClose, isOpen, onOpen } = useDisclosure()

  const handleModal = (key: string) => {
    onOpen()
    setCurrentTask(key)
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
              <tbody className="divide-y divide-gray2">
                {Object.keys(tasks).map((key, index) => (
                  <tr
                    key={index}
                    onClick={() => handleModal(key)}
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
      <Modal
        size="2xl"
        title={tasks[currentTask]?.name}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Tabs
          tabs={[
            {
              icon: <MenuIcon />,
              name: 'Información',
              component: (
                <>
                  <p>{tasks[currentTask]?.description}</p>
                  <Divider />
                  <div className={styles.gridContainer}>
                    <h2 className={styles.colTitle}>Estado</h2>
                    <p className="col-span-2 flex">
                    <div className="w-20">
                        <Bubble type={tasks[currentTask]?.status} />
                      </div>
                      <div className="ml-4 w-6 h-6">
                        <EditIcon color="#888888" />
                      </div>
                    </p>
                  </div>
                  <div className={styles.gridContainer}>
                    <h2 className={styles.colTitle}>Prioridad</h2>
                    <p className="col-span-2 flex">
                      <div className="w-20">
                        <Bubble type={tasks[currentTask]?.priority} />
                      </div>
                      <div className="ml-4 w-6 h-6">
                        <EditIcon color="#888888" />
                      </div>
                    </p>
                  </div>
                  <div className={styles.gridContainer}>
                    <h2 className={styles.colTitle}>Fecha de inicio</h2>
                    <p className="col-span-2 flex">
                      {formatDate(tasks[currentTask]?.initialDate, 'PPPP')}
                      <div className="ml-4 w-6 h-6">
                        <EditIcon color="#888888" />
                      </div>
                    </p>
                  </div>
                  <div className={styles.gridContainer}>
                    <h2 className={styles.colTitle}>
                      Fecha de finalización prevista
                    </h2>
                    <p className="col-span-2 flex">
                      {formatDate(tasks[currentTask]?.expectedDate, 'PPPP')}
                      <div className="ml-4 w-6 h-6">
                        <EditIcon color="#888888" />
                      </div>
                    </p>
                  </div>
                  <div className={styles.gridContainer}>
                    <h2 className={styles.colTitle}>Fecha de finalización</h2>
                    <p className="col-span-2 flex hover:bg-fondo">
                      {formatDate(tasks[currentTask]?.endDate, 'PPPP')}
                      <div className="ml-4 w-6 h-6">
                        <EditIcon color="#888888" />
                      </div>
                    </p>
                  </div>
                </>
              )
            },
            {
              name: 'Actualizaciones',
              icon: <ChatIcon />,
              component: <>Hello</>
            },
            {
              name: 'Archivos',
              icon: <ArchiveIcon />,
              component: <>Hello</>
            }
          ]}
        ></Tabs>
      </Modal>
    </motion.div>
  )
}

export default NewTaskList
