import type { ComponentProps} from 'react'
import { ReactNode } from 'react'
import { useState } from 'react'

interface MiniButtonProps extends ComponentProps<'button'> {
  icon: ReactNode
  secondaryIcon?: ReactNode
  tertiaryIcon?: ReactNode
  variant: 'expand' | 'cancel' | 'radio'
}

const variantsMiniButton = {
  expand: `border rounded-sm`,
  cancel: `border-none`,
  radio: `border-none`
}

const MiniButton = ({
    icon,
    secondaryIcon,
    tertiaryIcon,
    variant
    }: MiniButtonProps) => {
      let [state, setState] = useState(false)
      let [stateHover, setStateHover] = useState(false)
      const handleClick = () =>{
        setState(!state)
      }
      return (
        <>
          <div className={`h-6 w-5 ${variantsMiniButton[variant]}`} onMouseOut={()=>{setStateHover(false)}} onMouseOver={() =>{setStateHover(true)}}>
            <button className='h-5 w-5' onClick={handleClick}>
              {
                secondaryIcon ? 
                <div> { 
                  state ? <div>{icon}</div> : 
                  <div>
                    {stateHover ? <div>{secondaryIcon}</div> : <div>{tertiaryIcon}</div>}
                  </div>
                  }
                 </div>
                :
                <div> {icon} </div>
              }
            </button>
          </div>
        </>
  )
}

export default MiniButton