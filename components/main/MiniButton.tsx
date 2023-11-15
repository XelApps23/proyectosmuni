import type { ComponentProps } from 'react'
import { ReactNode, useState } from 'react'

interface MiniButtonProps extends ComponentProps<'button'> {
  icon: ReactNode
  secondaryIcon?: ReactNode
  tertiaryIcon?: ReactNode
  variant: 'expand' | 'cancel' | 'radio' | 'arrow'
}

const variantsMiniButton = {
  expand: 'border rounded-sm',
  cancel: 'border-none',
  radio: 'border-none',
  arrow: 'border-none'
}

const MiniButton = ({
  icon,
  secondaryIcon,
  tertiaryIcon,
  variant
}: MiniButtonProps) => {
  const [state, setState] = useState(false)
  const [stateHover, setStateHover] = useState(false)
  const handleClick = () => {
    setState(!state)
  }
  return (
        <>
          <div className={`h-5 w-5 ${variantsMiniButton[variant]}`} onMouseOut={() => { setStateHover(false) }} onMouseOver={() => { setStateHover(true) }}>
            <button className='h-5 w-5' onClick={handleClick}>
              {
                secondaryIcon
                  ? <div> {
                  state
                    ? <div className='w-4 h-4'>{icon}</div>
                    : <div>
                    {stateHover ? <div className='w-4 h-4'>{secondaryIcon}</div> : <div className='w-4 h-4'>{tertiaryIcon}</div>}
                  </div>
                  }
                 </div>
                  : <div> {icon} </div>
              }
            </button>
          </div>
        </>
  )
}

export default MiniButton
