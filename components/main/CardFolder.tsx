import Image from 'next/image'
import Folder from '@/public/Folder.svg'
import ProyectoIcon from '../icons/ProyectoIcon'
import { useRouter } from 'next/router'

type CardFolderProps = {
    title: string
    projectId: string
    porcentaje: number
}

const Ancho = ' w-[280px] '
const CardClasses = 'rounded-lg outline outline-1  bg-white h-[264px]  grid gap-3  p-2.5 items-center justify-center  hover:border-0 hover:outline-0 '
const ShadowClasses = `  
hover:shadow-[0px_2.767256498336792px_2.2138051986694336px_0px_rgba(0,0,0,1)]
hover:shadow-[0px_6.650102138519287px_5.32008171081543px_0px_rgba(0,0,0,0.0283)]
hover:shadow-[0px_12.521552085876465px_10.017241477966309px_0px_rgba(0,0,0,0.035)]
hover:shadow-[0px_22.3363094329834px_17.869047164916992px_0px_rgba(0,0,0,0.0417)]
hover:shadow-[0px_41.777610778808594px_33.422088623046875px_0px_rgba(0,0,0,0.0503)]
hover:shadow-[0px_100px_80px_0px_rgba(0,0,0,0.07)]
`
const TextClasses = 'text-base text-black'
const IconClasses = 'w-4 h-4 mr-4'
const baseClasses = 'flex w-full items-center justify-center'

const CardFolder = ({
  title,
  projectId,
  porcentaje
}: CardFolderProps) => {
  const router = useRouter()
  const Navegar = () => {
    router.push(`projects/${projectId}`)
  }
  return (
        <button
            className={CardClasses + ShadowClasses + Ancho}
            onClick={Navegar}
            type={'button'}
        >
            <div className={'px-2.5' + Ancho}>
                <div className={baseClasses}>
                    <Image src={Folder} alt="Folder" />
                </div>
                <div className={baseClasses}>
                    <div className={IconClasses}>
                        <ProyectoIcon />
                    </div>
                    <p className={'truncate ' + TextClasses} >
                        {title}
                    </p>
                </div>
            </div>
            <div className={'px-2.5' + Ancho}>
                <div className={'flex justify-between'}>
                    <div className={'bg-fondo rounded-full h-4 w-[196px]'}>
                        <div className={'bg-estadoListo rounded-full h-4 ' + `w-[${porcentaje}%]`}></div>
                    </div>
                    <p className='text-sm text-gray2 w-9'>{porcentaje}%</p>
                </div>
                <p className='text-left text-sm text-gray1'>
                    Avance del Proyecto
                </p>
            </div>
        </button>
  )
}

export default CardFolder
