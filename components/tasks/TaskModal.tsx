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
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Tabs from '../main/Tabs'
import TrashIcon from '../icons/TrashIcon'
import UpdateView from './update'
import useFile from '@/hooks/useFile'
import VisibilityIcon from '../icons/VisibilityIcon'
import WordIcon from '../icons/WordIcon'
import { FileList } from '@/hooks/types/File'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea
} from '@chakra-ui/react'

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
  updateTask: (id: string, field: string, value: any) => void
}

const statusBubbles = ['Listo', 'En Curso', 'Detenido', 'No Iniciado']

const priorityBubbles = ['Sin definir', 'Critica', 'Alta', 'Media', 'Baja']

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 mb-1',
  colTitle: 'font-semibold text-sm p-2'
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
  requestUpdates,
  updateTask
}: Props) => {
  const expectedDateRef = useRef()
  const endDateRef = useRef()
  const initialDateRef = useRef()
  const [file, setFile] = useState<globalThis.File[]>([])
  const { uploadFile, deleteFile } = useFile()
  const [willUpload, setWillUpload] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [text, setText] = useState(currentTask.description)
  const [status, setStatus] = useState(currentTask.status)
  const [priority, setPriority] = useState(currentTask.priority)
  const [expectedDate, setExpectedDate] = useState<Date | undefined>(
    currentTask.expectedDate?.toDate()
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    currentTask.endDate?.toDate()
  )
  const [initialDate, setInitialDate] = useState<Date | undefined>(
    currentTask.initialDate?.toDate()
  )

  useEffect(() => {
    setFile([])
  }, [willUpload])

  useEffect(() => {
    setText(currentTask.description)
    setStatus(currentTask.status)
  }, [currentTask])

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

  const handleExpectedDate = () => {
    expectedDateRef.current!.showPicker()
  }

  const handleEndDate = () => {
    endDateRef.current!.showPicker()
  }

  const handleInitialDate = () => {
    initialDateRef.current!.showPicker()
  }

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

  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const formatDefaultDate = (date: Date | undefined | null) => {
    if (date) {
      return `${date.getFullYear().toString().padStart(4, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    } else {
      return undefined
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
                    <Textarea
                      defaultValue={currentTask.description}
                      onChange={changeText}
                      value={text}
                    />
                      )
                    : (
                    <p>{text}</p>
                      )}
                  {!editingDescription && (
                    <div
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => setEditingDescription(true)}
                    >
                      <EditIcon color="gray" />
                    </div>
                  )}
                  {editingDescription && (
                    <div className="flex gap-x-1 mt-1 mb-8 items-center">
                      <Button
                        onClick={() => {
                          updateTask(currentTask.id, 'description', text)
                          setEditingDescription(false)
                        }}
                        variant="primary"
                        text="Guardar"
                      />
                      <Button
                        onClick={() => setEditingDescription(false)}
                        variant="simple"
                        text="Cancelar"
                      />
                    </div>
                  )}
                </div>
                <Divider />
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Estado</h2>
                  <Menu>
                    <MenuButton className="col-span-2 flex hover:bg-fondo w-full rounded-lg px-2 cursor-pointer">
                      <div className="w-24">
                        <Bubble type={status} />
                      </div>
                    </MenuButton>
                    <MenuList className="flex flex-col flex-wrap">
                      {statusBubbles.map((bubble) => (
                        <MenuItem
                          key={bubble}
                          onClick={() => {
                            setStatus(bubble)
                            if (status !== bubble) {
                              updateTask(currentTask.id, 'status', bubble)
                            }
                          }}
                          className="hover:bg-fondo p-2 cursor-pointer"
                        >
                          <div className="w-full">
                            <Bubble type={bubble} />
                          </div>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Prioridad</h2>
                  <Menu>
                    <MenuButton className="col-span-2 flex hover:bg-fondo w-full rounded-lg px-2 cursor-pointer">
                      <div className="w-24">
                        <Bubble type={priority} />
                      </div>
                    </MenuButton>
                    <MenuList className="flex flex-col flex-wrap">
                      {priorityBubbles.map((bubble) => (
                        <MenuItem
                          key={bubble}
                          onClick={() => {
                            setPriority(bubble)
                            updateTask(currentTask.id, 'priority', bubble)
                          }}
                          className="hover:bg-fondo p-2 cursor-pointer"
                        >
                          <div className="w-full">
                            <Bubble type={bubble} />
                          </div>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Fecha de inicio</h2>
                  <div
                    onClick={handleInitialDate}
                    className="col-span-2 h-10 flex items-center hover:bg-fondo w-full p-2 rounded-lg cursor-pointer"
                  >
                    {formatDate(initialDate, 'PPPP')}
                    <input
                      ref={initialDateRef}
                      className="absolute h-0 p-0 w-0 invisible"
                      defaultValue={formatDefaultDate(
                        currentTask.initialDate?.toDate()
                      )}
                      onChange={(e) => {
                        updateTask(
                          currentTask.id,
                          'initialDate',
                          new Date(
                            new Date(e.target.value).getTime() +
                              6 * 60 * 60 * 1000
                          )
                        )
                        setInitialDate(
                          new Date(
                            new Date(e.target.value).getTime() +
                              6 * 60 * 60 * 1000
                          )
                        )
                      }}
                      placeholder="Test"
                      type="date"
                    />
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>
                    Fecha de finalización prevista
                  </h2>
                  <div
                    onClick={handleExpectedDate}
                    className="col-span-2 h-10 flex items-center hover:bg-fondo w-full p-2 rounded-lg cursor-pointer"
                  >
                    {formatDate(expectedDate, 'PPPP')}
                    <input
                      ref={expectedDateRef}
                      className="absolute h-0 p-0 w-0 invisible"
                      defaultValue={formatDefaultDate(
                        currentTask.expectedDate?.toDate()
                      )}
                      onChange={(e) => {
                        updateTask(
                          currentTask.id,
                          'expectedDate',
                          new Date(
                            new Date(e.target.value).getTime() +
                              6 * 60 * 60 * 1000
                          )
                        )
                        setExpectedDate(
                          new Date(
                            new Date(e.target.value).getTime() +
                              6 * 60 * 60 * 1000
                          )
                        )
                      }}
                      placeholder="Test"
                      type="date"
                    />
                  </div>
                </div>
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Fecha de finalización</h2>
                  <div
                    onClick={handleEndDate}
                    className="col-span-2 flex hover:bg-fondo w-full p-2 rounded-lg cursor-pointer"
                  >
                    {formatDate(endDate, 'PPPP')}
                    <input
                      ref={endDateRef}
                      className="absolute h-0 p-0 w-0 invisible"
                      defaultValue={formatDefaultDate(
                        currentTask.endDate?.toDate()
                      )}
                      onChange={(e) => {
                        updateTask(
                          currentTask.id,
                          'endDate',
                          new Date(
                            new Date(e.target.value).getTime() +
                              6 * 60 * 60 * 1000
                          )
                        )
                        setEndDate(
                          new Date(
                            new Date(e.target.value).getTime() +
                              6 * 60 * 60 * 1000
                          )
                        )
                      }}
                      placeholder="Test"
                      type="date"
                    />
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
