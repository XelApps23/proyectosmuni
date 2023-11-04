import { formatDate } from '@/services/Utils'
import { Task } from '@/hooks/types/Task'
import { UpdateList } from '@/hooks/types/Update'
import { useDropzone } from 'react-dropzone'
import { UserList } from '@/hooks/types/User'
import { useSelector } from 'react-redux'
import ArchiveIcon from '../icons/ArchiveIcon'
import Bubble from '../main/Bubble'
import Button from '../main/Button'
import ChatIcon from '../icons/ChatIcon'
import Divider from '../main/Divider'
import DocumentAddIcon from '../icons/DocumentAddIcon'
import EditIcon from '../icons/EditIcon'
import ExcelIcon from '../icons/ExcelIcon'
import MenuIcon from '../icons/MenuIcon'
import Modal from '../main/Modal'
import React, { useCallback, useEffect, useState } from 'react'
import Tabs from '../main/Tabs'
import TrashIcon from '../icons/TrashIcon'
import UpdateView from './update'
import useFile from '@/hooks/useFile'
import VisibilityIcon from '../icons/VisibilityIcon'
import WordIcon from '../icons/WordIcon'
import { FileList } from '@/hooks/types/File'
import { Input, Textarea } from '@chakra-ui/react'

type Props = {
  currentTask: Task
  onClose: () => void
  isOpen: boolean
  projectId: string
  files: FileList
  updates: UpdateList
  users: UserList
  requestFiles: (task: string) => void
  requestUpdates: (task: string) => void
  requestUser: (id: string) => void
}

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 gap-2 p-2',
  colTitle: 'font-semibold text-sm'
}

const TaskModal = ({
  currentTask,
  requestUser,
  onClose,
  isOpen,
  projectId,
  files,
  updates,
  users,
  requestFiles,
  requestUpdates
}: Props) => {
  const [file, setFile] = useState<globalThis.File[]>([])
  const { uploadFile, deleteFile } = useFile()
  const [willUpload, setWillUpload] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)

  useEffect(() => {
    setFile([])
  }, [willUpload])

  const onDrop = useCallback((acceptedFiles: globalThis.File[]) => {
    if (acceptedFiles?.length) {
      setFile((previousFiles: any) => [...previousFiles, ...acceptedFiles])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'aplication/pdf': []
    }
  })

  const { id } = useSelector((state: any) => state.login)

  const enviarArchivo = () => {
    if (file.length !== 0) {
      file.forEach((newFile) => {
        console.log(newFile)
        uploadFile(newFile, id, currentTask.id, projectId)
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
      requestUpdates(currentTask.id)
    }
    if (tab === 2) {
      requestFiles(currentTask.id)
    }
  }

  return (
    <Modal
      size="2xl"
      title={currentTask.name}
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setEditingDescription(false)
      }}
    >
      <Tabs
        changedTab={(tab) => handleChangeTab(tab)}
        tabs={[
          {
            icon: <MenuIcon />,
            name: 'Información',
            component: (
              <>
                <div className="flex">
                  {editingDescription
                    ? (
                    <Textarea defaultValue={currentTask.description} />
                      )
                    : (
                    <p>{currentTask.description}</p>
                      )}
                  {!editingDescription && (
                    <div
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => setEditingDescription(true)}
                    >
                      <EditIcon color="gray" />
                    </div>
                  )}
                </div>
                <Divider />
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Estado</h2>
                  <div className="col-span-2 flex">
                    <div className="w-24">
                      <Bubble type={currentTask.status} />
                    </div>
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Prioridad</h2>
                  <div className="col-span-2 flex">
                    <div className="w-24">
                      <Bubble type={currentTask.priority} />
                    </div>
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Fecha de inicio</h2>
                  <div className="col-span-2 flex">
                    {formatDate(currentTask.initialDate, 'PPPP')}
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>
                    Fecha de finalización prevista
                  </h2>
                  <div className="col-span-2 flex">
                    {formatDate(currentTask.expectedDate, 'PPPP')}
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Fecha de finalización</h2>
                  <div className="col-span-2 flex">
                    {formatDate(currentTask.endDate, 'PPPP')}
                  </div>
                </div>
              </>
            )
          },
          {
            name: 'Actualizaciones',
            icon: <ChatIcon />,
            component: (
              <UpdateView
                requestUpdate={requestUpdates}
                updates={updates}
                currentTask={currentTask.id}
                users={users}
              />
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
                  .filter((listedFile) => listedFile.taskId === currentTask.id)
                  .map((listedFile, index) => (
                    <div
                      key={index}
                      className="flex space-x-4 border-2 border-gray-300 rounded-xl my-4 p-2"
                    >
                      <div className="w-[75px]">
                        {listedFile.extension.includes('word')
                          ? (
                          <WordIcon />
                            )
                          : (
                          <ExcelIcon />
                            )}
                      </div>
                      <div className="grid grid-rows-2 items-center gap-y-[50%]">
                        <div className="flex justify-between">
                          <p key={listedFile.id}>{listedFile.name}</p>
                          <div className="flex w-10">
                            <Button
                              onClick={() =>
                                deleteFileFromList(
                                  listedFile.id,
                                  listedFile.url
                                )
                              }
                              variant="icon"
                              icon={<TrashIcon />}
                            />
                            <a href={listedFile.url}>
                              <Button
                                variant="icon"
                                icon={<VisibilityIcon />}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="flex space-x-8">
                          {Object.keys(users)
                            .map((key) => users[key])
                            .filter((user) => user.id === listedFile.userId)
                            .map((user, index) => (
                              <p key={index}>
                                {user.firstname} {user.lastname}
                              </p>
                            ))}
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
