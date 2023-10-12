import HomeIcon from '@/components/icons/HomeIcon'
import SignOutIcon from '@/components/icons/SignOutIcon'
import UserIcon from '@/components/icons/UserIcon'
import Button from '../main/Button'
import { useRouter } from 'next/router'
import ProyectoIcon from '../icons/ProyectoIcon'

// const sidebarItems = [
//   {
//     name: 'Inicio',
//     href: '/',
//     icon: <HomeIcon />
//   },
//   {
//     name: 'Perfil',
//     href: '/profile',
//     icon: <UserIcon />
//   },
//   {
//     name: 'Papelera',
//     href: '/paperbin',
//     icon: <TrashIcon />
//   },
//   {
//     name: 'Archivo',
//     href: '/archive',
//     icon: <ArchiveIcon />
//   },
//   {
//     name: 'Administracion',
//     href: '/administration',
//     icon: <SettingIcon />
//   },
//   {
//     name: 'Equipos',
//     href: '/workTeams',
//     icon: <GroupUserIcon />
//   },
//   {
//     name: 'Invitar Miembros',
//     href: '/inviteMembers',
//     icon: <PlusIcon />
//   },
//   {
//     name: 'Cambiar Tema',
//     href: '/changeTheme',
//     icon: <ChangeThemeIcon />
//   },
//   {
//     name: 'Cerrar Sesión',
//     href: '/signOff',
//     icon: <SignOutIcon />
//   }
// ]

const sidebarItems = [
  {
    name: 'Inicio',
    href: '/home',
    icon: <HomeIcon />
  },
  {
    name: 'Proyectos',
    href: '/projects',
    icon: <ProyectoIcon />
  },
  {
    name: 'Usuarios',
    href: '/users',
    icon: <UserIcon />
  },
  {
    name: 'Roles',
    href: '/roles',
    icon: <UserIcon />
  },
  {
    name: 'Cerrar Sesión',
    href: '/logout',
    icon: <SignOutIcon />
  }
]

const Sidebar = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <div className="fixed z-20 top-0 bg-white1 h-screen w-48 transition-all">
      <div className="sm:h-36 h-24 relative">
        <div className="bg-blue1 h-1/2" />
        <div className="absolute bg-black1 w-20 h-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="px-4">
        {sidebarItems.map(({ name, href, icon: Icon }) => {
          return (
            <div key={name}>
              <Button
                text={name}
                icon={Icon}
                onlyIcon={false}
                variant="menu"
                fullWidth
                onClick={() =>
                  router.push({
                    pathname: href
                  })
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
