import { useState } from 'react'
import { useRouter } from 'next/router'
import ArchiveIcon from '@/components/icons/ArchiveIcon'
import ChangeThemeIcon from '@/components/icons/ChangeThemeIcon'
import GroupUserIcon from '@/components/icons/GroupUserIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import SettingIcon from '@/components/icons/SettingIcon'
import SignOutIcon from '@/components/icons/SignOutIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import UserIcon from '@/components/icons/UserIcon'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon'
import Button from '@/components/main/Button'
import MenuIcon from '@/components/icons/MenuIcon'
import MiniButton from '@/components/main/MiniButton'
import CancelIcon from '@/components/icons/CancelIcon'

const sidebarItems = [
  {
    name: 'Inicio',
    href: '/',
    icon: <HomeIcon />
  },
  {
    name: 'Perfil',
    href: '/profile',
    icon: <UserIcon />
  },
  {
    name: 'Papelera',
    href: '/paperbin',
    icon: <TrashIcon />
  },
  {
    name: 'Archivo',
    href: '/archive',
    icon: <ArchiveIcon />
  },
  {
    name: 'Administracion',
    href: '/administration',
    icon: <SettingIcon />
  },
  {
    name: 'Equipos',
    href: '/workTeams',
    icon: <GroupUserIcon />
  },
  {
    name: 'Invitar Miembros',
    href: '/inviteMembers',
    icon: <PlusIcon />
  },
  {
    name: 'Cambiar Tema',
    href: '/changeTheme',
    icon: <ChangeThemeIcon />
  },
  {
    name: 'Cerrar Sesión',
    href: '/signOff',
    icon: <SignOutIcon />
  }
]

export default function Sidebar () {
  const router = useRouter()
  const ancho = screen.width
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(ancho < 768)
  const toogleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev)
  }
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const Navegar = (ruta: string) => {
    router.push(ruta)
  }

  return (

    <div className={'fixed md:relative flex md:w-max h-full bg-white1 ' + (showMenu ? 'w-screen  ' : ' ') }>
      <div className={'relative md:block ' + (showMenu ? ' ' : 'hidden') }>

        <div className={'bg-blue1 flex justify-center items-center ' + (isCollapsedSidebar ? 'h-16 w-28' : 'h-20 w-48')}>
          <img className={'rounded-full  block ' + (isCollapsedSidebar ? ' w-10 h-10 mt-16' : 'w-20  h-20 mt-20')} src="https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg" />
        </div>

        <button className={'flex justify-center aling-center w-7 h-7  items-center absolute cursor-pointer bg-white1 border border-gray1 rounded  -right-3.5 ' + (isCollapsedSidebar ? 'top-12' : ' top-16 ') } onClick={toogleSidebarCollapseHandler} >
          <div className='w-4 h-4'>
            {isCollapsedSidebar ? <ArrowRightIcon /> : <ArrowLeftIcon />}
          </div>
        </button>

        <nav className={'h-fit bg-white1 p-4 ' + (isCollapsedSidebar ? 'w-28' : ' w-48 ')}>
          <div className={'grid gap-2.5 ' + (isCollapsedSidebar ? 'mt-12 ' : 'mt-9')}>
            {sidebarItems.map(({ name, href, icon: Icon }) => {
              return (
                <div key={name}>
                  <Button
                    text={name}
                    icon={Icon}
                    onlyIcon={isCollapsedSidebar}
                    variant="menu"
                    onClick={() => Navegar(href)}
                  />

                </div>
              )
            })}
          </div>
        </nav>
      </div>
      <div onClick={toggleMenu} className={'w-6 h-6 flex md:hidden m-8  outline outline-2 outline-black1 justify-center items-center  rounded  hover:bg-fondo ' + (showMenu ? 'absolute right-10 ' : 'absolute') }>
      <MiniButton icon={!showMenu ? <MenuIcon /> : <CancelIcon />} variant='cancel'/>
      </div>
    </div>

  )
};
