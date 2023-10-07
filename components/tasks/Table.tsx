import { useEffect, useState } from 'react'
import ResponsibleIcon from '@/components/icons/ResponsibleIcon'
import DocumentAddIcon from '@/components/icons/DocumentAddIcon'
import ArrowFitIcon from '@/components/icons/ArrowFitIcon'
import ChatIcon from '@/components/icons/ChatIcon'
import ChatHoverIcon from '@/components/icons/ChatHoverIcon'
import AddIcon from '@/components/icons/AddIcon'
import PeopleSuggested from '@/components/main/PeopleSuggested'
import Link from 'next/link'
import useTasks from '@/hooks/useTasks'

type Props = {
  idPhase: number,
  projectId: string
}
const Table = ({ idPhase, projectId }: Props) => {
  const { getTaskFiltered, tasks, loading } = useTasks()
  useEffect(() => {
    getTaskFiltered(projectId, idPhase)
  }, [])

  const [controls, setControls] = useState<{
    id: number;
    chat: boolean;
    isOpenPriority: boolean;
    isClickResponsible: boolean;
    statePriority: string;
    bgPriority: string;
    isOpenStatus: boolean;
    stateStatus: string;
    bgStatus: string
  }[]>([])

  const [reload, setReload] = useState(false)

  let cont = 0

  useEffect(() => {
    if (!reload) {
      for (let i = 0; i < Object.keys(tasks).length; i++) {
        const newControl = {
          id: cont,
          chat: false,
          isOpenPriority: false,
          isClickResponsible: false,
          statePriority: 'Baja',
          bgPriority: 'bg-prioridadBaja',
          isOpenStatus: false,
          stateStatus: 'No Iniciado',
          bgStatus: 'bg-estadoNoIniciado'
        }
        const aux = controls
        aux.push(newControl)
        setControls(aux)
        console.log('Controles: ', controls)
        cont++
        if (Object.keys(tasks).length == controls.length) {
          setReload(true)
        }
      }
    }
  }, [tasks, reload])

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
    const elem = document.getElementById(idPhase + '-Priority' + id)
    console.log(idPhase + '-Priority' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById(idPhase + '-Text' + id)
    console.log(idPhase + '-Text' + id)
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
    const elem = document.getElementById(idPhase + '-Status' + id)
    if (elem !== null) {
      elem.className = bg
    }
    const elem2 = document.getElementById(idPhase + '-TextStatus' + id)
    if (elem2 !== null) {
      elem2.innerText = status
    }
    setControls(newControls)
  }
  if (loading) return <>Cargando...</>
  return (
    <>
      {
        controls.length > 0 &&
        <div>
          <br />
          <div className="rounded-t-lg border-solid border-gray3 border-2">
            <table>
              <thead>
                <tr className='py-4'>
                  <th scope='col' className="bg-cell rounded-tl-lg font-nunito font-light w-[10%] leading-loose">Tareas</th>
                  <th scope='col' className="bg-cell font-nunito font-light w-[10%] leading-loose"> Responsables</th>
                  <th scope='col' className="bg-cell font-nunito font-light w-[10%] leading-loose"> Fecha</th>
                  <th scope='col' className="bg-cell font-nunito font-light w-[10%] leading-loose"> Estado</th>
                  <th scope='col' className="bg-cell font-nunito font-light w-[10%] leading-loose"> Prioridad</th>
                  <th scope='col' className="bg-cell rounded-tr-lg font-nunito font-light w-[10%] leading-loose"> Archivos</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(tasks).map((item, i) => (
                  <tr key={i}>
                    <td className="border-t-solid border-t-gray3 border-t-2">
                      <div className='flex hover:border-solid hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2'>
                        <div className='w-[85%] grid grid-cols-2 group'>
                          <p>{tasks[item].name}</p>
                          <div className='self-end group'>
                            <div className='invisible group-hover:visible'>
                              <Link className='flex text-gray3 text-sm' href='./Task'>
                                Abrir
                                <div className='w-5 h-4'> <ArrowFitIcon /> </div>
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
                        <div className='w-[15%]' onMouseOut={() => { changeStatusChat(i, false) }} onMouseOver={() => { changeStatusChat(i, true) }}>
                          {
                            controls[i].chat
                              ? <div>
                                <button className='h-7 grid align-center justify-center'>
                                  <ChatHoverIcon />
                                </button>
                                <div className='relative -bottom'>
                                  <div className='absolute grid place-items-center'>
                                    <div className="w-0 h-0 bg-transparent border-l-4 border-l-transparent border-b-4 border-b-black2 border-r-4 border-r-transparent"></div>
                                    <div className='bg-black2 p-1 w-[100%] text-white1 text-center rounded-md text-xs'> <p>Chat</p> </div>
                                  </div>
                                </div>
                              </div>
                              : <div className='grid place-items-center'>
                                <button className='h-7 p-0'>
                                  <ChatIcon />
                                </button>
                              </div>
                          }
                        </div>
                      </div>
                    </td>
                    <td className="border-t-solid border-t-gray3 border-t-2 group">
                      <div className='border-solid border-2 border-transparent hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2'>
                        <button onClick={() => { changeClickResponsible(i) }}>
                          <div className='grid'>
                            <div className='w-[10%] h-[100%] place-self-center'>
                              <ResponsibleIcon />
                            </div>
                            <div className='relative'>
                              <div className='invisible group-hover:visible mx-1 my-1 absolute -bottom-2 left-0 h-4 w-4'>
                                <AddIcon />
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                      {
                        controls[i].isClickResponsible &&
                        <div className='relative -bottom'>
                          <div className='absolute grid place-items-center w-[100%]'>
                            <div className="w-0 h-0 bg-transparent
                            border-l-8 border-l-transparent
                            border-b-8 border-b-white1
                            border-r-8 border-r-transparent">
                            </div>
                            <div className='bg-white1 flex flex-col p-1 gap-2 w-[98%] rounded-lg drop-shadow-xl'>
                              <p className='text-gray1'>Personas sugeridas</p>
                              <input type='email' />
                              <PeopleSuggested
                                icon={<ResponsibleIcon />}
                                text="correo@gmail.com"
                              />
                              <PeopleSuggested
                                icon={<ResponsibleIcon />}
                                text="correo@gmail.com"
                              />
                            </div>
                          </div>
                        </div>
                      }
                    </td>
                    <td className="border-t-solid border-t-gray3 border-t-2">
                      <input type="date" className='w-[100%] rounded-none text-center'></input>
                    </td>
                    <td className={`border-t-solid border-t-gray3 border-t-2 ${controls[i].bgStatus}`} id={idPhase + '-Status' + controls[i].id}>
                      <div className='hover:border-solid hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2'>
                        <button className='w-[100%]' onClick={() => changeOpenStatus(i)}>
                          <p className='text-white1' id={idPhase + '-TextStatus' + controls[i].id}>{controls[i].stateStatus}</p>
                          {
                            controls[i].isOpenStatus &&
                            <div className='relative -bottom'>
                              <div className='absolute grid place-items-center w-[100%]'>
                                <div className="w-0 h-0
                                      bg-transparent
                                      border-l-8 border-l-transparent
                                      border-b-8 border-b-white1
                                      border-r-8 border-r-transparent">
                                </div>
                                <div className='bg-white1 flex flex-col p-2 gap-2 w-[100%] drop-shadow-xl rounded-lg'>
                                  <p className='bg-estadoListo text-white1' onClick={() => handleClickStatus(i, 'Listo', 'border-t-solid border-t-gray3 border-t-2 bg-estadoListo')}>
                                    Listo
                                  </p>
                                  <p className='bg-estadoEnCurso text-white1' onClick={() => handleClickStatus(i, 'En Curso', 'border-t-solid border-t-gray3 border-t-2 bg-estadoEnCurso')}>
                                    En Curso
                                  </p>
                                  <p className='bg-estadoDetenido text-white1' onClick={() => handleClickStatus(i, 'Detenido', 'border-t-solid border-t-gray3 border-t-2 bg-estadoDetenido')}>
                                    Detenido
                                  </p>
                                  <p className='bg-estadoNoIniciado text-white1' onClick={() => handleClickStatus(i, 'No Iniciado', 'border-t-solid border-t-gray3 border-t-2 bg-estadoNoIniciado')}>
                                    No Iniciado
                                  </p>
                                </div>
                              </div>
                            </div>
                          }
                        </button>
                      </div>
                    </td>
                    <td className={`border-t-solid border-t-gray3 border-t-2 ${controls[i].bgPriority}`} id={idPhase + '-Priority' + controls[i].id}>
                      <div>
                        <button className='w-[100%] group
                        hover:border-solid hover:border-blue2 hover:border-2
                        active:border-solid active:border-blue2 active:border-2
                        focus:border-solid focus:border-blue2 focus:border-2' onClick={() => changeOpenPriority(i)}>
                          <p className='text-white1' id={idPhase + '-Text' + controls[i].id}>{controls[i].statePriority}</p>
                          {
                            controls[i].isOpenPriority &&
                            <div className='relative -bottom'>
                              <div className='absolute grid place-items-center w-[100%]'>
                                <div className="w-0 h-0
                                bg-transparent
                                border-l-8 border-l-transparent
                                border-b-8 border-b-white1
                                border-r-8 border-r-transparent">
                                </div>
                                <div className='bg-white1 flex flex-col p-2 gap-2 w-[100%] drop-shadow-xl rounded-lg'>
                                  <p className='bg-prioridadCritica text-white1' onClick={() => handleClickPriority(i, 'Critica', 'border-t-solid border-t-gray3 border-t-2 bg-prioridadCritica')}>
                                    Crítica
                                  </p>
                                  <p className='bg-prioridadAlta text-white1' onClick={() => handleClickPriority(i, 'Alta', 'border-t-solid border-t-gray3 border-t-2 bg-prioridadAlta')}>
                                    Alta
                                  </p>
                                  <p className='bg-prioridadMedia text-white1' onClick={() => handleClickPriority(i, 'Media', 'border-t-solid border-t-gray3 border-t-2 bg-prioridadMedia')}>
                                    Media
                                  </p>
                                  <p className='bg-prioridadBaja text-white1' onClick={() => handleClickPriority(i, 'Baja', 'border-t-solid border-t-gray3 border-t-2 bg-prioridadBaja')}>
                                    Baja
                                  </p>
                                </div>
                              </div>
                            </div>
                          }
                        </button>
                      </div>
                    </td>
                    <td className="border-t-solid border-t-gray3 border-t-2 group">
                      <div className='w-[100%] h-[100%] invisible group-hover:visible grid
                      hover:border-solid hover:border-blue2 hover:border-2
                      active:border-solid active:border-blue2 active:border-2
                      focus:border-solid focus:border-blue2 focus:border-2'>
                        <button className='w-[16%] place-self-center'>
                          <DocumentAddIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
        </div>
      }
    </>
  )
}

export default Table
