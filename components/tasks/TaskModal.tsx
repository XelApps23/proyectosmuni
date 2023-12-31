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
import MenuIcon from '../icons/MenuIcon'
import Modal from '../main/Modal'
import { PiMicrosoftWordLogoThin, PiMicrosoftExcelLogoThin } from 'react-icons/pi'
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
import { FileList } from '@/hooks/types/File'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  useToast
} from '@chakra-ui/react'
import UserIcon from '../icons/UserIcon'
import ProjectUserSelector from '../main/ProjectUserSelector'
import ProfilePicture from '../main/ProfilePicture'

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
  assignUsers: (ids: any[]) => void
  deleteFile: (idRef: string, urlRef: string) => void
  fetchFiles: (id: string) => void
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
  updateTask,
  assignUsers,
  deleteFile,
  fetchFiles
}: Props) => {
  const expectedDateRef = useRef()
  const endDateRef = useRef()
  const initialDateRef = useRef()
  const [file, setFile] = useState<globalThis.File[]>([])
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  const { uploadFile, loading } = useFile()
  const [willUpload, setWillUpload] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [text, setText] = useState(currentTask.description)
  const [status, setStatus] = useState(currentTask.status)
  const [priority, setPriority] = useState(currentTask.priority)
  const [ids, setIds] = useState<any[]>([])
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
    setPriority(currentTask.priority)
    setExpectedDate(currentTask.expectedDate?.toDate())
    setEndDate(currentTask.endDate?.toDate())
    setInitialDate(currentTask.initialDate?.toDate())
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

  const toast = useToast()

  const { id, permissions } = useSelector((state: any) => state.login)

  const enviarArchivo = async () => {
    if (file.length != 0) {
      file.map(async newFile => {
        console.log(newFile)
        const response = await uploadFile(newFile, id, currentTask.id, projectId)
        if (response.status === 'success') {
          fetchFiles(currentTask.id)
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

  const handleAssign = () => {
    setIds([])
    assignUsers(ids)
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
                  {permissions?.includes('projects/task-update-all') && !editingDescription && (
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
                        variant="secondary"
                        text="Cancelar"
                      />
                    </div>
                  )}
                </div>
                <Divider />
                <div className={styles.gridContainer}>
                  <h2 className={styles.colTitle}>Estado</h2>
                  <Menu>
                    <MenuButton disabled={!permissions?.includes('projects/task-update-all')} className="col-span-2 flex hover:bg-fondo w-full rounded-lg px-2 cursor-pointer">
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
                    <MenuButton disabled={!permissions?.includes('projects/task-update-all')} className="col-span-2 flex hover:bg-fondo w-full rounded-lg px-2 cursor-pointer">
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
                      disabled={!permissions?.includes('projects/task-update-all')}
                      ref={initialDateRef}
                      className="absolute h-0 p-0 w-0 invisible"
                      defaultValue={formatDefaultDate(
                        currentTask.initialDate?.toDate()
                      )}
                      onChange={(e) => {
                        const newInitialDate = new Date(
                          new Date(e.target.value).getTime() +
                            6 * 60 * 60 * 1000
                        )
                        if (expectedDate && newInitialDate > expectedDate) {
                          toast({
                            title: 'Error',
                            description:
                              'La fecha de inicio no puede ser mayor que la fecha prevista de finalización',
                            status: 'error',
                            duration: 3000,
                            isClosable: true
                          })
                        } else if (endDate && newInitialDate > endDate) {
                          toast({
                            title: 'Error',
                            description:
                              'La fecha de inicio no puede ser mayor que la fecha de finalización',
                            status: 'error',
                            duration: 3000,
                            isClosable: true
                          })
                        } else {
                          updateTask(
                            currentTask.id,
                            'initialDate',
                            newInitialDate
                          )
                          setInitialDate(newInitialDate)
                        }
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
                      disabled={!permissions?.includes('projects/task-update-all')}
                      ref={expectedDateRef}
                      className="absolute h-0 p-0 w-0 invisible"
                      defaultValue={formatDefaultDate(
                        currentTask.expectedDate?.toDate()
                      )}
                      onChange={(e) => {
                        const newExpectedDate = new Date(
                          new Date(e.target.value).getTime() +
                            6 * 60 * 60 * 1000
                        )
                        if (initialDate && newExpectedDate < initialDate) {
                          toast({
                            title: 'Error',
                            description:
                              'La fecha prevista de finalización no puede ser menor que la fecha de inicio',
                            status: 'error',
                            duration: 3000,
                            isClosable: true
                          })
                        } else {
                          updateTask(
                            currentTask.id,
                            'expectedDate',
                            newExpectedDate
                          )
                          setExpectedDate(newExpectedDate)
                        }
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
                        const newEndDate = new Date(
                          new Date(e.target.value).getTime() +
                            6 * 60 * 60 * 1000
                        )
                        if (initialDate && newEndDate < initialDate) {
                          toast({
                            title: 'Error',
                            description:
                              'La fecha de finalización no puede ser menor que la fecha de inicio',
                            status: 'error',
                            duration: 3000,
                            isClosable: true
                          })
                        } else {
                          updateTask(currentTask.id, 'endDate', newEndDate)
                          setEndDate(newEndDate)
                        }
                      }}
                      placeholder="Test"
                      type="date"
                    />
                  </div>
                </div>
              </>
            )
          },
          permissions?.includes('projects/task-update') && {
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
                {(willUpload || loading)
                  ? (
                  <>
                    <div
                      {...getRootProps({
                        className:
                          'w-full px-4 py-7 border-2 border-dashed rounded-xl cursor-pointer'
                      })}
                    >
                      <div className="flex justify-start space-x-2">
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
                      </div>
                    </div>
                    <br />
                    <div className="flex justify-start space-x-2">
                      <Button
                        loading={loading}
                        onClick={enviarArchivo}
                        variant="primary"
                        text="Guardar"
                      />
                      <Button
                        onClick={cancelUpload}
                        variant="secondary"
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
                          <PiMicrosoftWordLogoThin className='w-20 h-20' />
                            )
                          : (
                          <PiMicrosoftExcelLogoThin className='w-20 h-20'/>
                            )}
                      </div>
                      <div className="grid grid-rows-2 items-center gap-y-[50%] p-2">
                        <div className="flex justify-between">
                          <p key={listedFile.id}>{listedFile.name}</p>
                          <div className="flex w-10">
                            <Button
                              onClick={() =>
                                deleteFile(listedFile.id, listedFile.url)
                              }
                              variant="icon"
                              icon={<div className="w-5 h-5"><TrashIcon /></div>}
                            />
                            <a href={listedFile.url}>
                              <Button
                                variant="icon"
                                icon={<div className="w-5 h-5"><VisibilityIcon /></div>}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="flex space-x-2">
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
          },
          {
            name: 'Asignados',
            icon: <UserIcon />,
            component: (
              <>
                <div className="text-lg font-bold">Personas asignadas</div>
                {currentTask.assignedUsers.map((user) => (
                  <div key={user} className="mx-2 my-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8">
                        <ProfilePicture user={users[user]} />
                      </div>
                      <div>
                        {users[user].firstname} {users[user].lastname ?? ''} (
                        {users[user].email})
                      </div>
                    </div>
                  </div>
                ))}
                <Divider />
                {isAssignOpen
                  ? (
                  <>
                    <div className="text-lg font-bold">Agregar personas</div>
                    <ProjectUserSelector
                      task={currentTask}
                      users={users}
                      setIds={setIds}
                    />
                    <div className="flex mt-4">
                      <div className="mr-4">
                        <Button
                          text="Confimar"
                          variant="primary"
                          onClick={() => {
                            setIsAssignOpen(false)
                            handleAssign()
                          }}
                        ></Button>
                      </div>
                      <Button
                        text="Cancelar"
                        onClick={() => {
                          setIsAssignOpen(false)
                        }}
                      ></Button>
                    </div>
                  </>
                    )
                  : (
                  <Button
                    onClick={() => setIsAssignOpen(true)}
                    variant="primary"
                    text="Agregar personas"
                  ></Button>
                    )}
              </>
            )
          }
        ]}
      ></Tabs>
    </Modal>
  )
}

export default TaskModal
