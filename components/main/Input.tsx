import type { HTMLInputTypeAttribute } from 'react'
import { ReactNode, useState } from 'react'
import { Controller, FieldError } from 'react-hook-form'

interface InputProps {
  icon?: ReactNode
  secondaryIcon?: ReactNode
  text?: string
  type?: HTMLInputTypeAttribute
  variant?: 'normal' | 'search'
  control: any
  error?: FieldError
  name: string
  defaultValue?: string
  label: string,
  size: 'sm' | 'md' | 'lg' | 'xl'
}

const variantsInput = {
  normal: {
    input: `bg-white border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2] 
    invalid:border-[#E2445C] invalid:text-black focus:invalid:border-[#E2445C] focus:invalid:ring-1 
    focus:invalid:ring-[#E2445C]`,
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  },
  search: {
    input:
      'bg-white border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2]',
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  }
}

const sizeInput = {
  sm: {
    input: 'w-[40%] sm:w-[35%] md:w-[35%] lg:w-[25%] xl:w-[15%] 2xl:w-[15%]'
  },
  md: {
    input: 'w-[65%]  sm:w-[60%] md:w-[70%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%]'
  },
  lg: {
    input: 'w-[90%]  sm:w-[95%] md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-[80%]'
  },
  xl: {
    input: 'w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]'
  }
}

const Input = ({
  control,
  variant = 'normal',
  type = 'text',
  icon,
  name,
  defaultValue,
  secondaryIcon,
  label,
  error,
  text,
  size
}: InputProps) => {
  const [state, setState] = useState(false)
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setState(!state)
    if (type === 'password') {
      setShow(!show)
    }
  }
  return (
    <>
      <div>
        <h1 className='text-sm text-black2'>
          {label}
        </h1>
        {type === 'password'
          ? (
          <div>
            <Controller
              control={control}
              defaultValue={defaultValue || ''}
              name={name}
              render={({ field }) => (
                <input
                  defaultValue={defaultValue}
                  type={show ? 'text' : 'password'}
                  className={`rounded-lg ${variantsInput[variant].input} ${sizeInput[size].input}`}
                  placeholder={text}
                  {...field}
                />
              )}
            />
            {icon && (
              <div
                className={variantsInput[variant].icon}
                onClick={handleClick}
              >
                {state ? <div>{icon}</div> : <div>{secondaryIcon}</div>}
              </div>
            )}
          </div>
            )
          : (
          <div>
            {
            <Controller
                control={control}
                defaultValue={defaultValue || ''}
                name={name}
                render={({ field }) => (
                  <input
                    {...field}
                    type={type}
                    className={`rounded-lg ${variantsInput[variant].input} ${sizeInput[size].input}`}
                    placeholder={text}
                    {...field}
                  />
                )}
            />
            }
            {icon && (
              <div
                className={variantsInput[variant].icon}
                onMouseOut={() => {
                  setState(false)
                }}
                onMouseOver={() => {
                  setState(true)
                }}
              >
                {state ? <div>{icon}</div> : <div>{secondaryIcon}</div>}
              </div>
            )}
          </div>
            )}
            <p className={`text-errorDefault text-xs ${sizeInput[size].input}`}>
              {error && error.message}
            </p>
      </div>
    </>
  )
}

export default Input
