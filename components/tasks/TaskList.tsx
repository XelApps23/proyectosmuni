import { useState } from 'react'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'
import MiniButton from '@/components/main/MiniButton'
import ArrowIcon from '@/components/icons/ArrowIcon'
import Table from './Table'

type Props = {
  projectId: string
}

const TaskList = ({ projectId }: Props) => {
  const phases = [
    {
      id: 1,
      nombre: 'FASE FORMULACIÓN DE PROYECTO'
    },
    {
      id: 2,
      nombre: 'FASE CREACIÓN DE BASES'
    },
    {
      id: 3,
      nombre: 'FASE DE ADJUDICACIÓN DEL PROYECTO'
    },
    {
      id: 4,
      nombre: 'FASE DE CONTRATACIÓN DEL PROYECTO'
    },
    {
      id: 5,
      nombre: 'FASE DE EJECUCIÓN DEL PROYECTO ANTICIPO'
    },
    {
      id: 6,
      nombre: 'FASE DE EJECUCIÓN DEL PROYECTO ESTIMACIONES'
    },
    {
      id: 7,
      nombre: 'FASE DE EJECUCIÓN DEL PROYECTO DOCUMENTO DE CAMBIO'
    },
    {
      id: 8,
      nombre: 'FASE DE LIQUIDACIÓN DEL PROYECTO'
    }
  ]
  const [controlPhase, setControlPhase] = useState([
    { id: 0, isClickPhase: false },
    { id: 1, isClickPhase: false },
    { id: 2, isClickPhase: false },
    { id: 3, isClickPhase: false },
    { id: 4, isClickPhase: false },
    { id: 5, isClickPhase: false },
    { id: 6, isClickPhase: false },
    { id: 7, isClickPhase: false }
  ])
  const changeClickPhase = (id: number) => {

    const newControls = controlPhase.map(control => {
      if (control.id === id) {
        return {
          ...control,
          isClickPhase: !control.isClickPhase
        }
      } else {
        return control
      }
    })
    setControlPhase(newControls)
  }
  return (
    <div className='bg-white1 p-[2%] text-black2'>
      {
        phases.map((phase) => (
          <div key={phase.id}>
            <div className='flex' onClick={() => changeClickPhase(phase.id - 1)}>
              <MiniButton
                icon={<ArrowDownIcon />}
                variant="arrow"
                secondaryIcon={<ArrowIcon />}
                tertiaryIcon={<ArrowIcon />}
              />
              {phase.nombre}
            </div>
            {
              controlPhase[phase.id - 1].isClickPhase &&
              <Table idPhase={phase.id} projectId={projectId}/>
            }
          </div>
        ))
      }
    </div>
  )
}

export default TaskList
