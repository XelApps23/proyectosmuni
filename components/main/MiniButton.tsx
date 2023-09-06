import type { ComponentProps} from 'react'
import { ReactNode } from 'react'
import { useState } from 'react'

interface MiniButtonProps extends ComponentProps<'button'> {
  icon: ReactNode
  secondaryIcon?: ReactNode
  variant: 'expand' | 'cancel'
}

const variantsMiniButton = {
  expand: `border rounded-sm`,
  cancel: `border-none`
}

const MiniButton = ({
    icon,
    secondaryIcon,
    variant
    }: MiniButtonProps) => {
      let [state, setState] = useState(true)
      const handleClick = () =>{
        setState(!state)
      }
      return (
        <>
          <div className={`h-6 w-5 ${variantsMiniButton[variant]}`}>
            <button className='h-5 w-5' onClick={handleClick}>
              {
                secondaryIcon ?
                <div> { state ? <div>{icon}</div> : <div>{secondaryIcon}</div> }</div>
                :
                <div> { <div>{icon}</div> } </div>
              }
            </button>
          </div>
        </>
  )
}

export default MiniButton