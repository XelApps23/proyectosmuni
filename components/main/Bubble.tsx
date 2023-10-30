import React from 'react'

type Props = {
  type: string
}

type Styles = {
  [key: string]: {
    color: string
  }
}

const baseStyle =
  'text-white text-xs font-bold rounded-full px-2 py-1 flex justify-center '
const styles: Styles = {
  Critica: {
    color: baseStyle + 'bg-prioridadCritica text-white1'
  },
  Alta: {
    color: baseStyle + 'bg-prioridadAlta text-white1'
  },
  Media: {
    color: baseStyle + 'bg-prioridadMedia'
  },
  Baja: {
    color: baseStyle + 'bg-prioridadBaja'
  },
  'Sin definir': {
    color: baseStyle + 'bg-estadoNoIniciado'
  },
  Listo: {
    color: baseStyle + 'bg-estadoListo'
  },
  'En Curso': {
    color: baseStyle + 'bg-estadoEnCurso'
  },
  Detenido: {
    color: baseStyle + 'bg-estadoDetenido'
  },
  'No Iniciado': {
    color: baseStyle + 'bg-estadoNoIniciado'
  }
}

const Bubble = ({ type }: Props) => {
  return (
    <div className={styles[type].color}>
      {type}
    </div>
  )
}

export default Bubble
