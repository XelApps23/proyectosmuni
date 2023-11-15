import { useContext } from 'react'
import MenuIcon from '../icons/MenuIcon'
import { MenuContext } from '@/context/MenuContext'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'

const Header = () => {
  const { openMenu, setOpenMenu } = useContext(MenuContext)

  return (
    <div
      className={
        'absolute transition-all top-0 md:px-52 px-12 flex items-center w-full bg-black h-12 z-10 bg-white1 font-semibold md:text-2xl text-lg '
      }
    >
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className={
          'md:invisible w-6 h-6 mr-4 absolute  z-50 ' +
          (openMenu ? 'left-52' : 'left-4')
        }
      >
        {openMenu ? (<ArrowLeftIcon />) : (<MenuIcon />)}
      </button>
      <div className={(openMenu ? 'ml-48 md:ml-0' : 'ml-0')}>ProyectosMuni</div>
    </div>
  )
}

export default Header
