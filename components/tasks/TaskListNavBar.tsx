import Link from 'next/link'
import HomeIcon from '@/components/icons/HomeIcon'
import GraphicsIcon from '@/components/icons/GraphicsIcon'
import GanttIcon from '@/components/icons/GanttIcon'
const TaskNavBar = () => {
  return (
    <nav className='border-b-2 border-b-solid border-b-fondo'>
      <ul className='flex'>
        <li className='flex flex-row hover:border-b-2 border-solid border-blue2 w-[10%]'>
          <div className='w-[15%]'>
            <HomeIcon/>
          </div>
          <Link href="/taskList">Tabla Principal</Link>
        </li>
        <li className='flex flex-row hover:border-b-2 border-solid border-blue2 w-[6%]'>
          <div className='w-[22%]'>
            <GraphicsIcon/>
          </div>
          <Link href="#">Gráfica</Link>
        </li>
        <li className='flex flex-row hover:border-b-2 border-solid border-blue2 w-[5%]'>
          <div className='w-[23%]'>
            <GanttIcon/>
          </div>
          <Link href="#">Gantt</Link>
        </li>
      </ul>
    </nav>
  )
}

export default TaskNavBar
