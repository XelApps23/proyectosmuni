import React, { useCallback, useEffect, useState } from 'react'
import Button from '../main/Button'
import DocumentAddIcon from '../icons/DocumentAddIcon'
import ArchiveIcon from '../icons/ArchiveIcon'
import ChatIcon from '../icons/ChatIcon'
import UpdateView from './update'
import { formatDate } from '@/services/Utils'
import EditIcon from '../icons/EditIcon'
import Bubble from '../main/Bubble'
import Divider from '../main/Divider'
import { useDisclosure } from '@chakra-ui/react'
import Tabs from '../main/Tabs'
import Modal from '../main/Modal'
import useFile from '@/hooks/useFile'
import useUsers from '@/hooks/useUsers'
import { Task } from '@/hooks/types/Task'
import useUpdates from '@/hooks/useUpdates'
import { useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import WordIcon from '../icons/WordIcon'
import ExcelIcon from '../icons/ExcelIcon'
import TrashIcon from '../icons/TrashIcon'
import VisibilityIcon from '../icons/VisibilityIcon'
import MenuIcon from '../icons/MenuIcon'

type Props = {
  currentTask: Task,
  onClose: () => void
  isOpen: boolean
}

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 gap-2 p-2',
  colTitle: 'font-semibold text-sm'
}

const TaskModal = ({ currentTask, onClose, isOpen }: Props) => {
  const [file, setFile] = useState([])
  const { uploadFile, getFilesOfTask, files, deleteFile } = useFile()
  const { getUsers, users } = useUsers()
  const [willUpload, setWillUpload] = useState(false)

  useEffect(() => {
    setFile([])
  }, [willUpload])

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      setFile((previousFiles: any) => [
        ...previousFiles,
        ...acceptedFiles
      ])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'aplication/pdf': []
    }
  })

  const { id } = useSelector((state) => state.login)
  const { getUpdatesOfTask } = useUpdates()

  const enviarArchivo = () => {
    if (file.length !== 0) {
      file.map(newFile => {
        console.log(newFile)
        uploadFile(newFile, id, currentTask.id)
      })
      setWillUpload(false)
    } else {
      console.log('No se ha seleccionado un archivo')
    }
  }

  const cancelUpload = () => {
    setWillUpload(false)
  }

  const deleteFileFromList = (idRef: string, urlRef: string) => {
    deleteFile(idRef, urlRef)
  }

  const handleChangeTab = (tab: number) => {
    if (tab === 1) {
      getUpdatesOfTask(currentTask.id)
    }
    if (tab === 2) {
      getFilesOfTask(currentTask.id)
      getUsers({ perPage: 1 })
    }
  }

  return (
    <Modal
      size="2xl"
      title={currentTask.name}
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
                <p>{currentTask.description}</p>
                <Divider />
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Estado</h2>
                  <p className="col-span-2 flex">
                    <div className="w-20">
                      <Bubble type={currentTask.status} />
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
                      <Bubble type={currentTask.priority} />
                    </div>
                    <div className="ml-4 w-6 h-6">
                      <EditIcon color="#888888" />
                    </div>
                  </p>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Fecha de inicio</h2>
                  <p className="col-span-2 flex">
                    {formatDate(currentTask.initialDate, 'PPPP')}
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
                    {formatDate(currentTask.expectedDate, 'PPPP')}
                    <div className="ml-4 w-6 h-6">
                      <EditIcon color="#888888" />
                    </div>
                  </p>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Fecha de finalización</h2>
                  <p className="col-span-2 flex hover:bg-fondo">
                    {formatDate(currentTask.endDate, 'PPPP')}
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
                <UpdateView currentTask={currentTask.id} users={users}/>
            )
          },
          {
            name: 'Archivos',
            icon: <ArchiveIcon />,
            component: (
              <>
                {willUpload
                  ? (
                  <>
                    <div
                      {...getRootProps({
                        className:
                          'w-full px-4 py-7 border-2 border-dashed rounded-xl cursor-pointer'
                      })}
                    >
                      <span className="flex justify-start space-x-2">
                        <input {...getInputProps()} />
                        {file.length > 0
                          ? (
                          <ul>
                            {file.map((file) => (
                              <li key={file.name}>{file.name}</li>
                            ))}
                          </ul>
                            )
                          : (
                          <div className="flex items-center space-x-2">
                            <div className="w-7">
                              <DocumentAddIcon />
                            </div>
                            {isDragActive
                              ? (
                              <p>Suelte los archivos a subir aquí</p>
                                )
                              : (
                              <p>
                                Puede arrastrar y soltar archivos aquí o hacer
                                click para seleccionarlos
                              </p>
                                )}
                          </div>
                            )}
                      </span>
                    </div>
                    <br />
                    <div className="flex justify-start space-x-2">
                      <Button
                        onClick={enviarArchivo}
                        variant="primary"
                        text="Guardar"
                      />
                      <Button
                        onClick={cancelUpload}
                        variant="primary"
                        text="Cancelar"
                      />
                    </div>
                  </>
                    )
                  : (
                  <Button
                    onClick={() => setWillUpload(true)}
                    variant="primary"
                    text="Agregar Archivo"
                  />
                    )}
                {Object.keys(files)
                  .map((key) => files[key])
                  .filter((listedFile) => listedFile.taskId === currentTask)
                  .map((listedFile, index) => (
                      <div key={index} className='flex space-x-4 border-2 border-gray-300 rounded-xl my-4 p-2'>
                        <div className='w-[75px]'>
                          {listedFile.extension.includes('word')
                            ? <WordIcon />
                            : <ExcelIcon />}
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
  )
}

export default TaskModal
