import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/main/Button'
import HomeIcon from '@/components/icons/HomeIcon'
import UserIcon from '@/components/icons/UserIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import ArchiveIcon from '@/components/icons/ArchiveIcon'
import SettingIcon from '@/components/icons/SettingIcon'
import GroupUserIcon from '@/components/icons/GroupUserIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import SignOutIcon from '@/components/icons/SignOutIcon'
import ChangeThemeIcon from '@/components/icons/ChangeThemeIcon'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon'

const sidebarItems = [
  {
    name: 'Inicio',
    href: '/',
    icon: <HomeIcon />
  },
  {
    name: 'Perfil',
    href: '/profile',
    icon: <UserIcon/>
  },
  {
    name: 'Papelera',
    href: '/paperbin',
    icon: <TrashIcon/>
  },
  {
    name: 'Archivo',
    href: '/archive',
    icon: <ArchiveIcon/>
  },
  {
    name: 'Administracion',
    href: '/administration',
    icon: <SettingIcon/>
  },
  {
    name: 'Equipos',
    href: '/workTeams',
    icon: <GroupUserIcon/>
  },
  {
    name: 'Invitar Miembros',
    href: '/inviteMembers',
    icon: <PlusIcon/>
  },
  {
    name: 'Cambiar Tema',
    href: '/changeTheme',
    icon: <ChangeThemeIcon/>
  },
  {
    name: 'Cerrar Sesión',
    href: '/signOff',
    icon: <SignOutIcon/>
  }
]

export default function Sidebar2 () {
  const router = useRouter()
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState <boolean>(false)
  const toogleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev)
  }

  const Navegar = (ruta: string) => {
    console.log(ruta)
    router.push(ruta)
  }

  return (

    <div className="sidebar__wrapper">
      <div className={`bg-blue1 h-24 flex justify-center items-center ${isCollapsedSidebar ? 'hidden' : 'block'}`}>
        <img className="rounded-full  w-32 h-32 mt-20" src="https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg" />
      </div>
      <button className="btn" onClick={toogleSidebarCollapseHandler} >
       { isCollapsedSidebar ? <ArrowRightIcon/> : <ArrowLeftIcon />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsedSidebar}>
        <div className="sidebar__top mt-6" >
        <div className="w-80 h-88 bg-sky-600" />
          <p className="sidebar__Profil_name"></p>
        </div>
        <div className="grid gap-3">
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
      </aside>
    </div>

  )
};
