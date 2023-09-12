import { ReactNode } from 'react'
import Image from 'next/image'
import Folder from '@/public/Folder.svg'
import ProyectoIcon from '../icons/ProyectoIcon'

type CardFolderProps = {
    onClick?: () => void
    text: string
}

const CardClasses = `rounded-lg	 outline outline-1  bg-white w-[280px] h-[202] grid gap-3 items-center justify-center p-2.5 
 hover:border-0 hover:outline-0	`
const ShadowClasses = `  
hover:shadow-[0px_2.767256498336792px_2.2138051986694336px_0px_rgba(0,0,0,1)]
hover:shadow-[0px_6.650102138519287px_5.32008171081543px_0px_rgba(0,0,0,0.0283)]
hover:shadow-[0px_12.521552085876465px_10.017241477966309px_0px_rgba(0,0,0,0.035)]
hover:shadow-[0px_22.3363094329834px_17.869047164916992px_0px_rgba(0,0,0,0.0417)]
hover:shadow-[0px_41.777610778808594px_33.422088623046875px_0px_rgba(0,0,0,0.0503)]
hover:shadow-[0px_100px_80px_0px_rgba(0,0,0,0.07)]
`
const TextClasses = 'text-base	text-black'
const IconClasses = 'w-4 h-4 mr-4'
const baseClasses = 'flex w-full items-center justify-center'

const CardFolder = ({
  onClick,
  text
}: CardFolderProps) => {
  return (
        <button
            className={CardClasses + ShadowClasses}
            onClick={onClick}
            type={'button'}
        >
            <div>
                <div className={baseClasses}>
                    <Image src={Folder} alt="Hello" />
                </div>
                <div className={baseClasses}>
                    <div className={IconClasses}>
                        <ProyectoIcon />
                    </div>
                    <p className={TextClasses} >
                        {text}
                    </p>
                </div>
            </div>
        </button>
  )
}

export default CardFolder
