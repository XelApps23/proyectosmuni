import { useState } from 'react'
import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BsArchive, BsTrash, BsBoxArrowRight } from 'react-icons/bs'
import { FiSettings, FiSun } from 'react-icons/fi'
import { GrGroup, GrAdd } from 'react-icons/gr'
import { RiSearch2Line } from 'react-icons/ri'  
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
// import { useContext, useState } from "react";
import { SidebarContext } from '@/src/context/SidebarContext'
import { useRouter } from 'next/router'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const sidebarItems = [
  {
    name: 'Inicio',
    href: '/home',
    icon: AiOutlineHome
  },
  {
    name: 'Perfil',
    href: '/profile',
    icon: BiUser
  },
  {
    name: 'Papelera',
    href: '/paperbin',
    icon: BsTrash
  },
  {
    name: 'Archivo',
    href: '/archive',
    icon: BsArchive
  },
  {
    name: 'Administracion',
    href: '/administration',
    icon: FiSettings
  },
  {
    name: 'Equipos ',
    href: '/workTeams',
    icon: GrGroup
  },
  {
    name: 'Invitar Miembros',
    href: '/inviteMembers',
    icon: GrAdd
  },
  {
    name: 'Cambiar Tema',
    href: '/changeTheme',
    icon: FiSun
  },
  {
    name: 'Cerrar Sesión',
    href: '/signOff',
    icon: BsBoxArrowRight
  }
]

export default function Sidebar () {
  const router = useRouter()
  // const { isCollapsed } = useContext(SidebarContext);
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState <boolean>(false)
  const toogleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev)
  }

  return (

    <div className="relative">
      <div className={`bg-blue1 h-24 flex justify-center items-center ${isCollapsedSidebar ? 'hidden' : 'block'}`}>
        <img className="rounded-full  w-32 h-32 mt-20" src="https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg" />
      </div>
      <button className="absolute top-12 right-0 border-none bg-white1 w-6 h-6 border border-blue1 rounded-full flex justify-center items-center cursor-pointer translate-x-6 text-2xl" onClick={toogleSidebarCollapseHandler} >
       <MdKeyboardArrowLeft />
      </button>
      <aside className="w-60 h-full bg-white1 p-4 transition-all duration-400 ease-in-out overflow-hidden" data-collapse={isCollapsedSidebar}>
        <div className="w-full sm:w-max flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 pb-4 mb-4 border-b border-white1 mt-6" >
        <div className="w-80 h-88 bg-sky-600" />
          <p className="sidebar__Profil_name"></p>
        </div>
        <ul className="list-none">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item " key={name}>
                <Link
                  className={`inline-block text-base text-black no-underline px-4 py-2 flex items-center bg-white2 mb-4 rounded-lg ${router.pathname === href ? 'sidebar__link--active ' : ''
                    }`}
                  href={href}
                >
                  <span className="inline-block text-lg">
                    <Icon />
                  </span>
                  <span className="ml-2">{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </aside>
    </div>

  )
};
