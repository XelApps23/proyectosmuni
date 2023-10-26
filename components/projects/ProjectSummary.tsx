import { Project } from '@/hooks/types/Project'
import React from 'react'

type Props = {
  project: Project
}

const ProjectSummary = ({
  project
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-3 w-full p-4 gap-4">
      <div className="flex justify-center items-center shadow-lg flex-col w-full h-48 rounded-lg">
        <span className="text-5xl text-black1 mb-4">{project.totalTasks}</span>
        <span className="text-base text-black2">Tareas</span>
        <span className="text-base text-gray3">Totales</span>
      </div>
      <div className="flex justify-center items-center shadow-lg flex-col w-full h-48 rounded-lg">
        <span className="text-5xl text-black1 mb-4">{project.doneTasks}</span>
        <span className="text-base text-black2">Tareas</span>
        <span className="text-base text-estadoListo">Listas</span>
      </div>
      <div className="flex justify-center items-center shadow-lg flex-col w-full h-48 rounded-lg">
        <span className="text-5xl text-black1 mb-4">{project.startedTasks}</span>
        <span className="text-base text-black2">Tareas</span>
        <span className="text-base text-estadoEnCurso">En curso</span>
      </div>
      <div className="flex justify-center items-center shadow-lg flex-col w-full h-48 rounded-lg">
        <span className="text-5xl text-black1 mb-4">{project.notStartedTasks}</span>
        <span className="text-base text-black2">Tareas</span>
        <span className="text-base text-estadoNoIniciado">No iniciadas</span>
      </div>
      <div className="flex justify-center items-center shadow-lg flex-col w-full h-48 rounded-lg">
        <span className="text-5xl text-black1 mb-4">{project.stoppedTasks}</span>
        <span className="text-base text-black2">Tareas</span>
        <span className="text-base text-estadoDetenido">Detenidas</span>
      </div>
    </div>
  )
}

export default ProjectSummary
