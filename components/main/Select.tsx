import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  children: ReactNode
  defaultValue?: string
  type?: HTMLInputTypeAttribute
  placeholder?: boolean
  label: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'normal' | 'search'
  control: any
  name: string
}

const variantsInput = {
  normal: {
    input: `bg-white2 w-full p-2 border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2] 
    invalid:border-[#E2445C] invalid:text-black focus:invalid:border-[#E2445C] focus:invalid:ring-1 
    focus:invalid:ring-[#E2445C]`,
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  },
  search: {
    input:
      'bg-white2 border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2]',
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  }
}

const sizeInput = {
  sm: {
    input: ''
  },
  md: {
    input: ''
  },
  lg: {
    input: ''
  },
  xl: {
    input: 'p-2'
  }
}

const Select = ({
  control,
  defaultValue,
  placeholder,
  children,
  name,
  label,
  variant = 'normal',
  size = 'md'
}: Props) => {
  return (
    <>
      <h1 className="text-lg text-black2 mb-2">{label}</h1>

      <Controller
        control={control}
        defaultValue={defaultValue || -1}
        name={name}
        render={({ field }) => (
          <select
            className={`rounded-lg ${variantsInput[variant].input} ${sizeInput[size].input}`}
            placeholder={placeholder ? label : ''}
            {...field}
          >
            <option value={-1} disabled selected className="text-fondo1">
              {label}
            </option>
            {children}
          </select>
        )}
      />
    </>
  )
}

export default Select
