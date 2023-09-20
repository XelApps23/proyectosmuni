import { app } from '@/services/Firebase'
import { getAuth } from 'firebase/auth'
import folder from '../public/img/Folder.png'
import BaseLayout from '@/src/components/BaseLayout'
import Image from 'next/image'
import Card from '../src/components/Card'
import React from 'react'
import { TbChartInfographic } from 'react-icons/tb'
import { LuGanttChart } from 'react-icons/lu'
// import Sidebar from "@/components/Sidebar";

const Tabs = ({ color }: any) => {
  const [openTab, setOpenTab] = React.useState(1)
  return (
    <>
      <div className=" w-full">
        <h1 className="text-neutral-700 text-2xl font-normal font-sans-regular md:font-sans ">Nombre del proyecto</h1>
        <div className="w-full mt-3">
          <div className='flex justify-between '>
            <ul className="flex space-x-5 justify-start " role="tablist">
              <li className=" ">
                <a
                  className={
                    'inline-flex text-xs font-bold uppercase px-5 py-3 rounded block leading-normal' +
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  Tabla principal
                </a>
              </li>
              <li className="">
                <a
                  className={
                    ' inline-flex text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal' +
                    (openTab === 2
                      ? 'items-center justify-center p-4 gap-2 text-blue1 border-b-2 border-blue1 rounded-t-lg active dark:text-blue1 dark:border-blue1 ' +
                      color +
                      '-600'
                      : 'border-b-2 border-gray1 ' + color + '-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(2)
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <TbChartInfographic className="w-6 h-6"></TbChartInfographic>
                  Grafica
                </a>
              </li>
              <li className="">
                <a
                  className={
                    ' inline-flex text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === 3
                      ? 'items-center justify-center p-4 gap-2 text-blue1 border-b-2 border-blue1 rounded-t-lg active dark:text-blue1 dark:border-blue1 ' +
                      color +
                      '-600'
                      : 'border-b-2 border-gray1 ' + color + '-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(3)
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <LuGanttChart className="w-6 h-6 " ></LuGanttChart>
                  Gantt
                </a>
              </li>
            </ul>
            <div className="inline-flex gap-4">
              <button className="bg-transparent hover:bg-skyBlue text-blue-700 font-semibold hover:text-white py-2 px-4  hover:border-transparent rounded ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
              </button>
              <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white1 bg-blue1 rounded-lg hover:bg-blue1 focus:ring-4 focus:outline-none focus:ring-blue1 dark:bg-blue1 dark:hover:bg-prioridadBaja ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                Invitar
              </button>

            </div>

          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="/mainTable">
                  <div className=" w-full">
                    Main table page
                  </div>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="/graphic">
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

const Home = () => {
  return (
    <BaseLayout>
      <div className="mt-20 px-16 w-full ">
        <Tabs color="blue1" />;
      </div>
    </BaseLayout>
  )
}

export default Home

