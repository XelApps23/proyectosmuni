import type { ComponentProps } from 'react'
import { ReactNode, use } from 'react'
import { useState } from 'react'

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode,
  secondaryIcon?: ReactNode,
  text?: string,
  typeInput: 'password' | 'text' | 'email',
  variant: 'normal' | 'search',
  whitIcon: boolean
}

const variantsInput = {
  normal: {
    input: `bg-white border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2] 
    invalid:border-[#E2445C] invalid:text-black focus:invalid:border-[#E2445C] focus:invalid:ring-1 
    focus:invalid:ring-[#E2445C]`,
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  },
  search: {
    input: `bg-white border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2]`,
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  }
}

const Input = ({
    variant,
    typeInput,
    icon,
    whitIcon,
    secondaryIcon,
    text
    }: InputProps) => {
        let [state, setState] = useState(false)
        let [show, setShow] = useState(false)
        const handleClick = () =>{
          setState(!state)
          if(typeInput==="password"){
            setShow(!show)
          }
        }
        return (
        <>
          <div className="relative w-min h-min">
            {
              typeInput === "password" ?
              <div>
                <input type={show ? "text" : "password"} className={`rounded-lg ${variantsInput[variant].input}`} placeholder={text}/>
                {
                  whitIcon &&
                  <div className={variantsInput[variant].icon} onClick={handleClick}>
                    { 
                      state ? <div>{icon}</div> : <div>{secondaryIcon}</div>
                    }
                  </div>
                }
              </div>
              :
              <div>
                <input type={typeInput} className={`rounded-lg ${variantsInput[variant].input}`} placeholder={text}/>
                {
                  whitIcon &&
                  <div className={variantsInput[variant].icon} onMouseOut={()=>{setState(false)}} onMouseOver={() =>{setState(true)}}>
                    { 
                      state ? <div>{icon}</div> : <div>{secondaryIcon}</div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </>
  )
}

export default Input