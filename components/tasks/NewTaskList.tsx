import { TaskList } from '@/hooks/types/Task'
import React, { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import Modal from '../main/Modal'
import Divider from '../main/Divider'
import Bubble from '../main/Bubble'
import { formatDate } from '@/services/Utils'
import Tabs from '../main/Tabs'
import MenuIcon from '../icons/MenuIcon'
import ArchiveIcon from '../icons/ArchiveIcon'
import ChatIcon from '../icons/ChatIcon'
import EditIcon from '../icons/EditIcon'
import useFile from '@/hooks/useFile'
import { useSelector } from 'react-redux'
import UpdateView from './update'
import useUpdates from '@/hooks/useUpdates'
import { useDropzone } from 'react-dropzone'
import DocumentAddIcon from '../icons/DocumentAddIcon'
import Button from '../main/Button'
import WordIcon from '../icons/WordIcon'
import ExcelIcon from '../icons/ExcelIcon'
import TrashIcon from '../icons/TrashIcon'
import VisibilityIcon from '../icons/VisibilityIcon'
import useUsers from '@/hooks/useUsers'
import { useToast } from '@chakra-ui/react'

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
  const [file, setFile] = useState([])
  const { uploadFile, getFilesOfTask, files, deleteFile } = useFile()
  const { getUsers, users } = useUsers()
  const [willUpload, setWillUpload] = useState(false)
  const toast = useToast()


  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      setFile(previousFiles => [
        ...previousFiles,
        ...acceptedFiles
      ])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'aplication/pdf': []
    }
  })

  const { id } = useSelector((state) => state.login)
  const { getUpdatesOfTask } = useUpdates()
  const handleModal = (key: string) => {
    onOpen()
    setCurrentTask(key)
  }
  useEffect(() => {
    setFile([])
  }, [willUpload])

  const enviarArchivo = async () => {
    if (file.length != 0) {
      file.map(async newFile => {
        console.log(newFile)
        const response = await uploadFile(newFile, id, currentTask)
        if (response.status === 'success') {
          toast({
            title: response.message,
            status: 'success',
            duration: 4000,
            isClosable: true
          })
        }
        if (response.status === 'error') {
          toast({
            title: response.message,
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        }
      })
      setWillUpload(false)
    } else {
      console.log('No se ha seleccionado un archivo')
    }
  }

  const cancelUpload = () => {
    setWillUpload(false)
  }

  const deleteFileFromList = async (idRef: string, urlRef: string) => {
    const response = await deleteFile(idRef, urlRef)
    if (response.status === 'success') {
      toast({
        title: response.message,
        status: 'success',
        duration: 4000,
        isClosable: true
      })
    }
    if (response.status === 'error') {
      toast({
        title: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleChangeTab = (tab: number) => {
    if (tab === 1) {
      getUpdatesOfTask(currentTask)
    }
    if (tab === 2) {
      getFilesOfTask(currentTask)
    }
  }
  useEffect(() => {
    getUsers({})
  }, [])

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
          changedTab={(tab) => handleChangeTab(tab)}
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
              component: (
                <UpdateView currentTask={currentTask} users={users} />
              )
            },
            {
              name: 'Archivos',
              icon: <ArchiveIcon />,
              component: (
                <>
                  {willUpload ?
                    (<>
                      <div {...getRootProps({
                        className: "w-full px-4 py-7 border-2 border-dashed rounded-xl cursor-pointer"
                      })}>
                        <span className="flex justify-start space-x-2">
                          <input {...getInputProps()} />
                          {
                            file.length > 0 ?
                              (<ul>
                                {file.map(file => (
                                  <li key={file.name}>{file.name}</li>
                                ))}
                              </ul>) :
                              (<div className='flex items-center space-x-2'>
                                <div className='w-7'>
                                  <DocumentAddIcon />
                                </div>
                                {
                                  isDragActive ?
                                    <p>Suelte los archivos a subir aquí</p> :
                                    <p>Puede arrastrar y soltar archivos aquí o hacer click para seleccionarlos</p>
                                }
                              </div>)
                          }
                        </span>
                      </div>
                      <br />
                      <div className='flex justify-start space-x-2'>
                        <Button
                          onClick={enviarArchivo}
                          variant="primary"
                          text="Guardar" />
                        <Button
                          onClick={cancelUpload}
                          variant="primary"
                          text="Cancelar" />
                      </div>
                    </>) : (
                      <Button
                        onClick={() => setWillUpload(true)}
                        variant="primary"
                        text="Agregar Archivo"
                      />)}
                  {Object.keys(files)
                    .map((key) => files[key])
                    .filter((listedFile) => listedFile.taskId === currentTask)
                    .map((listedFile, index) => (
                      <div className='flex space-x-4 border-2 border-gray-300 rounded-xl my-4 p-2'>
                        <div className='w-[75px]'>
                          {listedFile.extension.includes('word') ?
                            <WordIcon /> : <ExcelIcon />}
                        </div>
                        <div className='grid grid-rows-2 items-center gap-y-[50%]'>
                          <div className='flex justify-between'>
                            <p key={listedFile.id}>{listedFile.name}</p>
                            <div className='flex w-10'>
                              <Button
                                onClick={() => deleteFileFromList(listedFile.id, listedFile.url)}
                                variant="icon"
                                icon={<TrashIcon />}
                              />
                              <a href={listedFile.url}>
                                <Button
                                  onClick={onOpen}
                                  variant="icon"
                                  icon={<VisibilityIcon />}
                                />
                              </a>
                            </div>
                          </div>
                          <div className='flex space-x-8'>
                            {
                              Object.keys(users).map((key) => users[key])
                                .filter((user) => user.id === listedFile.userId)
                                .map((user, index) => (
                                  <p>{user.firstname} {user.lastname}</p>
                                ))
                            }
                            <p>{formatDate(listedFile.createdAt, 'PPPPp')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )
            }
          ]}
        ></Tabs>
      </Modal>
    </motion.div>
  )
}

export default NewTaskList
