import { TbChartInfographic } from 'react-icons/tb'
import { LuGanttChart } from 'react-icons/lu'
import { ReactNode, useEffect, useState } from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { RiUserAddLine } from 'react-icons/ri'
import { IoMdNotificationsOutline } from 'react-icons/io'
import useProjects from '@/hooks/useProjects'
import { useRouter } from 'next/router'

type Props = {
  color: string
  taskList: ReactNode
  gantt: ReactNode
  projectId: string
}

const Tabs = ({ color, taskList, gantt, projectId }: Props) => {
  const [openTab, setOpenTab] = useState(1)
  const { getProject, projects } = useProjects()

  const router = useRouter()
  useEffect(() => {
    getProject(projectId)
  }, [])

  return (
    <>
      <div className=" w-full">
        <h1 className="text-neutral-700 text-lg font-medium flex font-sans-regular md:font-sans ">
          {projects[projectId]?.name ?? ''}
        </h1>
        <div className="w-full mt-3">
          <div className="flex justify-between ">
            <ul className="flex space-x-9 justify-start " role="tablist">
              <li className=" ">
                <a
                  className={
                    'inline-flex text-lg font px-5 py-3 text-gray1 rounded block leading-normal' +
                    (openTab === 1
                      ? ' items-center justify-center gap-2 p-4 text-blue1 border-b-2 border-blue1 rounded-t-lg active dark:text-blue1 dark:border-blue1 text-center inline-flex' +
                      color +
                      '-600'
                      : 'border-b-2 border-gray1')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(1)
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <HiOutlineHome className="w-6 h-6" />
                  Tabla principal
                </a>
              </li>
              <li className=" gap-3">
                <a
                  className={
                    'inline-flex text-lg font px-5 py-3 text-gray1 rounded block leading-normal gap-3' +
                    (openTab === 2
                      ? 'items-center justify-center p-4 gap-2 text-blue1 border-b-2 border-blue1 rounded-t-lg active dark:text-blue1 dark:border-blue1 ' +
                      color +
                      '-600'
                      : 'border-b-2 border-gray1 ' + color + '-600 bg-white1')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(2)
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <TbChartInfographic className="w-6 h-6 gap-4"></TbChartInfographic>
                  Grafica
                </a>
              </li>
              <li className="">
                <a
                  className={
                    ' inline-flex text-lg font px-5 py-3 text-gray1 rounded block leading-normal ' +
                    (openTab === 3
                      ? 'items-center justify-center p-4 gap-2 text-blue1 border-b-2 border-blue1 rounded-t-lg active dark:text-blue1 dark:border-blue1 ' +
                      color +
                      '-600'
                      : 'border-b-2 border-gray1 ' + color + '-600 bg-white1')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(3)
                    router.push('/ganttChart')
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <LuGanttChart className="w-6 h-6 gap-4 "></LuGanttChart>
                  Gantt
                </a>
              </li>
            </ul>
            <div className="inline-flex gap-4">
              <button className="bg-transparent hover:bg-skyBlue text-blue-700 font-semibold hover:text-white py-2 px-4  hover:border-transparent rounded ">
                <IoMdNotificationsOutline className="w-6 h-6" />
              </button>
              <button className="inline-flex items-center px-5 py-2.5 text-lg font-normal gap-3 text-center text-white1 bg-blue1 rounded-lg hover:bg-blue1 focus:ring-4 focus:outline-none focus:ring-blue1 dark:bg-blue1 dark:hover:bg-prioridadBaja ">
                <RiUserAddLine className="w-6 h-6" />
                Invitar
              </button>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={openTab === 1 ? 'block' : 'hidden'}
                  id="/mainTable"
                >
                  <div className=" w-full">{taskList}</div>
                </div>
                <div
                  className={openTab === 2 ? 'block' : 'hidden'}
                  id="/graphic"
                >
                  Graphic page
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'} id="/gantt">
                  Gantt page
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tabs
