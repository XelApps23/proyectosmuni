import { ReactNode } from 'react'


type ButtonProps = {
  onClick?: () => void
  text: string
  icon?: ReactNode
  onlyIcon?: boolean
  onlyText?: boolean
  variant: 'menu' | 'primary' | 'login' | 'cancelar'
}



const buttonVariants = {
  menu:
  {
    button: `w-full flex px-1 py-1.5 rounded hover:bg-[#ECEFF8] focus:bg-[#CCE5FF] `,
    icon: `w-5 h-5 `,
    text: `text-sm text-black	`
  },
  primary:
  {
    button: `w-full flex px-2.5 py-2.5 rounded-lg bg-[#0073EA] hover:bg-[#1F76C2] `,
    icon: `w-4 h-4 `,
    text: `text-base	text-white `
  },
  login:
  {
    button: `w-full flex text-white  px-2.5 py-2.5 rounded-[50px] bg-[#0073EA]
    hover:outline hover:bg-[#FFFFFF] hover:text-[#0073EA]` ,
    text: `text-base `,
    icon: ``
  },
  cancelar:
  {
    button: `w-full flex text-white  px-2.5 py-2.5 rounded-[50px] bg-[#0073EA]
    hover:bg-[#FFFFFF] hover:border-[1px] hover:border-[#0073EA] hover:text-[#0073EA]` ,
    text: `text-base `,
    icon: ``
  }
}

const Button = ({
  onClick,
  text,
  icon,
  onlyIcon = false,
  onlyText = false,
  variant = 'menu'
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants[variant].button}
      onClick={onClick}
      type={"button"}
    >
      <div className={`flex w-full items-center ` + (onlyText && ` justify-center `)}>
        {
          icon &&
          <div className={(onlyText && `hidden `) + buttonVariants[variant].icon + ((!onlyText && !onlyIcon) && ` mr-2.5`)}>
            {icon}
          </div>}
        <p className={(onlyIcon && `hidden `) + buttonVariants[variant].text} >
          {text}
        </p>

      </div>

    </button>
  )
}

export default Button
