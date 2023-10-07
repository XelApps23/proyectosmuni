import Image from 'next/image'
import Folder from '@/public/Folder.svg'
import { useRouter } from 'next/router'

type CardFolderProps = {
  title: string
  projectId: string
  progress: number
}

const CardFolder = ({ title, projectId, progress }: CardFolderProps) => {
  const router = useRouter()
  const Navegar = () => {
    router.push(`projects/${projectId}`)
  }
  return (
    <button
      onClick={Navegar}
      type="button"
      className="border-fondo hover:border-gray1 transition-all hover:bg-cell border-2 rounded-lg w-full flex flex-col items-center p-4 border-"
    >
      <Image src={Folder} alt="Folder" className="xl:w-32 sm:w-24 w-20 mb-4" />
      <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full mb-2">
        <span className="text-base">
          {title} dsa dsa dsa das as das dsa das dsa dasd
        </span>
      </div>
      <div className="w-full flex">
        <div className="bg-fondo rounded-full h-4 w-full">
          <div
            className={'bg-estadoListo rounded-full h-4 ' + `w-[${progress}%]`}
          />
        </div>
        <p className="text-sm ml-4 text-gray2 w-9 mb-2">{progress}%</p>
      </div>
      <div className="w-full">
        <p className="text-left text-sm text-gray1 ">Avance del Proyecto</p>
      </div>
    </button>
  )
}

export default CardFolder
