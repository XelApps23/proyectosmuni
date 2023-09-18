import CancelIcon from '@/components/icons/CancelIcon'
import MiniButton from '@/components/main/MiniButton'
import Link from 'next/link'
const TaskHeader = () => {
  return (
    <>
      <header>
        <Link href={'/taskList'}><MiniButton icon={<CancelIcon />} variant="cancel"/></Link>
        <h1><b>Tarea</b></h1>
        <nav className='border-b-2 border-b-solid border-b-fondo text-gray3'>
          <ul className='flex'>
            <li className='flex flex-row hover:border-b-2 border-solid border-blue2 w-[7%]'>
              <Link href="/task">Descripción</Link>
            </li>
            <li className='flex flex-row hover:border-b-2 border-solid border-blue2 w-[9%]'>
              <Link href="#">Actualizaciones</Link>
            </li>
            <li className='flex flex-row hover:border-b-2 border-solid border-blue2 w-[4%]'>
              <Link href="#">Archivo</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default TaskHeader
