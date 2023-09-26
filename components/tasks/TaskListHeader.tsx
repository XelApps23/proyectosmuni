import NotificationIcon from '@/components/icons/NotificationIcon'
import UserAddIcon from '@/components/icons/UserAddIcon'
import TaskNavBar from './taskListNavBar'

const TaskListHeader = () => {
  return (
    <>
    <header>
      <div className='flex'>
        <h1 className='w-[90%]'>Nombre Proyecto</h1>
        <div className='flex gap-2'>
          <button className='hover:bg-fondo rounded-sm'>
          <div className='w-4 h-4 m-2'>
            <NotificationIcon/>
          </div>
          </button>
          <button className='flex gap-x-1 p-2 bg-blue2 rounded-md text-white1 text-xs hover:bg-blue1'>
            <div className= 'w-4 h-4'>
              <UserAddIcon/>
            </div>
            Invitar
          </button>
        </div>
      </div>
      <br/>
      <TaskNavBar/>
      <br/>
    </header>
    </>
  )
}

export default TaskListHeader
