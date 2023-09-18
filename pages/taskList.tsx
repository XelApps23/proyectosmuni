import { useState } from 'react'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'
import ResponsibleIcon from '@/components/icons/ResponsibleIcon'
import DocumentAddIcon from '@/components/icons/DocumentAddIcon'
import ArrowFitIcon from '@/components/icons/ArrowFitIcon'
import ChatIcon from '@/components/icons/ChatIcon'
import ChatHoverIcon from '@/components/icons/ChatHoverIcon'
import AddIcon from '@/components/icons/AddIcon'
import SearchFocusIcon from '@/components/icons/SearchFocusIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import Input from '@/components/main/Input'
import PeopleSuggested from '@/components/main/PeopleSuggested'
import TaskListHeader from './taskListHeader'
import Link from 'next/link'
export default function taskList () {
  const tasks = [
    {
      id: 0,
      task: 'Tarea 1',
      date: '25 de Julio',
      status: 'No Iniciado'
    },
    {
      id: 1,
      task: 'Tarea 2',
      date: '27 de Julio',
      status: 'No Iniciado'
    },
    {
      id: 2,
      task: 'Tarea 3',
      date: '30 de Julio',
      status: 'No Iniciado'
    },
    {
      id: 3,
      task: 'Tarea 4',
      date: '30 de Diciembre',
      status: 'No Iniciado'
    },
    {
      id: 4,
      task: 'Tarea 5',
      date: '12 de Julio',
      status: 'No Iniciado'
    },
    {
      id: 5,
      task: 'Tarea 6',
      date: '27 de Feberero',
      status: 'No Iniciado'
    },
    {
      id: 6,
      task: 'Tarea 7',
      date: '31 de Diciembre',
      status: 'No Iniciado'
    },
    {
      id: 7,
      task: 'Tarea 8',
      date: '19 de Septiembre',
      status: 'No Iniciado'
    }
  ]
  const [controls, setControls] = useState([
    { id: 0, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 1, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 2, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 3, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 4, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 5, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 6, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' },
    { id: 7, chat: false, isOpenPriority: false, isClickResponsible: false, statePriority: 'Baja', bgPriority: 'border-solid border-gray3 border-2 bg-prioridadBaja', isOpenStatus: false, stateStatus: 'No Iniciado', bgStatus: 'border-solid border-gray3 border-2 bg-estadoNoIniciado' }
  ])
  const changeStatusChat = (id: number, status: boolean) => {
    const newControls = controls.map(control => {
      if (control.id === id) {
        return {
          ...control,
          chat: status
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const changeOpenPriority = (id: number) => {
    const newControls = controls.map(control => {
      if (control.id === id) {
        console.log(!control.isOpenPriority)
        return {
          ...control,
          isOpenPriority: !control.isOpenPriority
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const changeClickResponsible = (id: number) => {
    const newControls = controls.map(control => {
      if (control.id === id) {
        return {
          ...control,
          isClickResponsible: !control.isClickResponsible
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const changeOpenStatus = (id: number) => {
    const newControls = controls.map(control => {
      if (control.id === id) {
        return {
          ...control,
          isOpenStatus: !control.isOpenStatus
        }
      } else {
        return control
      }
    })
    setControls(newControls)
  }
  const handleClickPriority = (id: number, status: string, bg: string) => {
    const newControls = controls.map(control => {
      if (control.id === id) {
        return {
          ...control,
          isOpenPriority: false,
          statePriority: status,
          bgPriority: bg
        }
      } else {
        return control
      }
    })
    const elem = document.getElementById('Priority' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById('Text' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }
  const handleClickStatus = (id: number, status: string, bg: string) => {
    const newControls = controls.map(control => {
      if (control.id === id) {
        return {
          ...control,
          isOpenStatus: false,
          stateStatus: status,
          bgStatus: bg
        }
      } else {
        return control
      }
    })
    const elem = document.getElementById('Status' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById('TextStatus' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }
  return (
    <div className='bg-white1 p-[2%]'>
      <TaskListHeader/>
      <div className='flex'>
        <div className='w-[1%]'>
          <ArrowDownIcon/>
        </div>
        <p>FASE FORMULACIÓN DEL PROYECTO</p>
      </div>
      <table className="border-solid border-gray3 border-2 mt-4 md:mt-8">
        <thead>
          <tr>
            <th className="border-solid border-gray3 border-2 w-[10%]">Tareas</th>
            <th className="border-solid border-gray3 border-2 w-[10%]"> Responsables</th>
            <th className="border-solid border-gray3 border-2 w-[10%]"> Fecha</th>
            <th className="border-solid border-gray3 border-2 w-[10%]"> Estado</th>
            <th className="border-solid border-gray3 border-2 w-[10%]"> Prioridad</th>
            <th className="border-solid border-gray3 border-2 w-[10%]"> Archivos</th>
          </tr>
        </thead>
        <tbody >
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border-solid border-gray3 border-2">
                  <div className='flex'>
                    <div className='w-[85%] grid grid-cols-2 group'>
                        <p>{task.task}</p>
                        <div className='self-end group'>
                        <div className='invisible group-hover:visible'>
                            <Link className='flex text-gray3' href='/task'>
                              Abrir
                              <div className='w-5 h-5'> <ArrowFitIcon/> </div>
                            </Link>
                            <div className='flex relative -bottom'>
                            <div className='absolute grid place-items-center'>
                                <div className="w-0 h-0 bg-transparent border-l-4 border-l-transparent border-b-4 border-b-black2 border-r-4 border-r-transparent"></div>
                                <p className='bg-black2 p-1 w-[100%] text-white1 text-center rounded-md text-xs'>Abrir pestaña</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='w-[15%] border-l-solid border-l-gray3 border-l-2' onMouseOut={() => { changeStatusChat(task.id, false) }} onMouseOver={() => { changeStatusChat(task.id, true) }}>
                      {
                        controls[task.id].chat
                          ? <div>
                              <button className='w-7 h-7 grid align-center justify-center'>
                                <ChatHoverIcon/>
                              </button>
                              <div className='relative -bottom'>
                                <div className='absolute grid place-items-center'>
                                  <div className="w-0 h-0 bg-transparent border-l-4 border-l-transparent border-b-4 border-b-black2 border-r-4 border-r-transparent"></div>
                                  <div className='bg-black2 p-1 w-[160%] text-white1 text-center rounded-md text-xs'> <p>Chat</p> </div>
                                </div>
                              </div>
                            </div>
                          : <div className='grid place-items-center'>
                              <button className='w-7 h-7 p-0'>
                                <ChatIcon/>
                              </button>
                            </div>
                      }
                    </div>
                  </div>
              </td>
              <td className="border-solid border-gray3 border-2 group">
                <button onClick={() => { changeClickResponsible(task.id) }}>
                  <div className='grid'>
                    <div className='w-[10%] place-self-center'>
                      <ResponsibleIcon/>
                    </div>
                  </div>
                  <div className='relative'>
                    <div className='invisible group-hover:visible mx-2 my-2 absolute -bottom-2 left-0 h-4 w-4'>
                        <AddIcon/>
                    </div>
                  </div>
                </button>
                {
                controls[task.id].isClickResponsible &&
                <div className='relative -bottom'>
                  <div className='absolute grid place-items-center w-[100%]'>
                    <div className="w-0 h-0 bg-transparent
                      border-l-8 border-l-transparent
                      border-b-8 border-b-white1
                      border-r-8 border-r-transparent">
                    </div>
                    <div className='bg-white1 flex flex-col p-1 gap-2 w-[98%] rounded-lg drop-shadow-xl'>
                      <p className='text-gray1'>Personas sugeridas</p>
                      <Input
                        variant="search"
                        typeInput="text"
                        text="Buscar nombres"
                        whitIcon={true}
                        icon={<SearchFocusIcon/>}
                        secondaryIcon={<SearchIcon/>}
                      />
                      <PeopleSuggested icon={<ResponsibleIcon/>} text='correo@gmail.com'/>
                      <PeopleSuggested icon={<ResponsibleIcon/>} text='correo@gmail.com'/>
                    </div>
                  </div>
                </div>
              }
              </td>
              <td className="border-solid border-gray3 border-2 text-center">{task.date}</td>
              <td className={ controls[task.id].bgStatus } id = { 'Status' + controls[task.id].id}>
                <div>
                  <button className='w-[100%]' onClick={() => changeOpenStatus(task.id)}>
                    <p className='text-white1' id = { 'TextStatus' + controls[task.id].id }>{controls[task.id].stateStatus}</p>
                    {
                    controls[task.id].isOpenStatus &&
                    <div className='relative -bottom'>
                      <div className='absolute grid place-items-center w-[100%]'>
                        <div className="w-0 h-0
                            bg-transparent
                            border-l-8 border-l-transparent
                            border-b-8 border-b-white1
                            border-r-8 border-r-transparent">
                        </div>
                        <div className='bg-white1 flex flex-col p-2 gap-2 w-[100%] drop-shadow-xl rounded-lg'>
                            <p className='bg-estadoListo text-white1' onClick={() => handleClickStatus(task.id, 'Listo', 'border-solid border-gray3 border-2 bg-estadoListo')}>
                              Listo
                            </p>
                            <p className='bg-estadoEnCurso text-white1' onClick={() => handleClickStatus(task.id, 'En Curso', 'border-solid border-gray3 border-2 bg-estadoEnCurso')}>
                              En Curso
                            </p>
                            <p className='bg-estadoDetenido text-white1' onClick={() => handleClickStatus(task.id, 'Detenido', 'border-solid border-gray3 border-2 bg-estadoDetenido')}>
                              Detenido
                            </p>
                            <p className='bg-estadoNoIniciado text-white1' onClick={() => handleClickStatus(task.id, 'No Iniciado', 'border-solid border-gray3 border-2 bg-estadoNoIniciado')}>
                              No Iniciado
                            </p>
                        </div>
                      </div>
                    </div>
                    }
                  </button>
                </div>
              </td>
              <td className={ controls[task.id].bgPriority } id = { 'Priority' + controls[task.id].id}>
                <div>
                  <button className='w-[100%]' onClick={() => changeOpenPriority(task.id)}>
                    <p className='text-white1' id = { 'Text' + controls[task.id].id }>{controls[task.id].statePriority}</p>
                    {
                    controls[task.id].isOpenPriority &&
                    <div className='relative -bottom'>
                      <div className='absolute grid place-items-center w-[100%]'>
                        <div className="w-0 h-0
                            bg-transparent
                            border-l-8 border-l-transparent
                            border-b-8 border-b-white1
                            border-r-8 border-r-transparent">
                        </div>
                        <div className='bg-white1 flex flex-col p-2 gap-2 w-[100%] drop-shadow-xl rounded-lg'>
                            <p className='bg-prioridadCritica text-white1' onClick={() => handleClickPriority(task.id, 'Critica', 'border-solid border-gray3 border-2 bg-prioridadCritica')}>
                                Crítica
                            </p>
                            <p className='bg-prioridadAlta text-white1' onClick={() => handleClickPriority(task.id, 'Alta', 'border-solid border-gray3 border-2 bg-prioridadAlta')}>
                                Alta
                            </p>
                            <p className='bg-prioridadMedia text-white1' onClick={() => handleClickPriority(task.id, 'Media', 'border-solid border-gray3 border-2 bg-prioridadMedia')}>
                                Media
                            </p>
                            <p className='bg-prioridadBaja text-white1' onClick={() => handleClickPriority(task.id, 'Baja', 'border-solid border-gray3 border-2 bg-prioridadBaja')}>
                                Baja
                            </p>
                        </div>
                      </div>
                    </div>
                    }
                  </button>
                </div>
              </td>
              <td className="border-solid border-gray3 border-2 group">
                <div className='invisible group-hover:visible grid'>
                  <button className='w-[10%] place-self-center'>
                    <DocumentAddIcon/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
