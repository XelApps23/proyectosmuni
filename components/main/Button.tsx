import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  onClick?: () => void
  text: string
  icon?: ReactNode
  onlyIcon?: boolean
  onlyText?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant?: 'menu' | 'primary' | 'login' | 'cancelar'
  fullWidth?: boolean
}

const buttonVariants = {
  menu: {
    button: 'flex px-2 py-2.5 mb-2 rounded-lg hover:bg-fondo focus:bg-skyBlue ',
    icon: 'w-5 h-5 ',
    text: 'text-sm text-black2'
  },
  primary: {
    button: 'flex px-2.5 py-2.5 rounded-lg bg-blue2 hover:bg-prioridadBaja',
    icon: 'w-4 h-4 ',
    text: 'text-base text-white1 '
  },
  login: {
    button: `flex text-white1 px-2.5 py-2.5 rounded-[50px] bg-blue2
    hover:outline hover:bg-white1 hover:text-blue2`,
    text: 'text-base '
  },
  cancelar: {
    button: `flex text-white1  px-2.5 py-2.5 rounded-[50px] bg-errorDefault
    hover:bg-white1  hover:outline hover:text-errorHoverig `,
    text: 'text-base '
  }
}

const Button = ({
  onClick,
  text,
  icon,
  type = 'button',
  onlyIcon = false,
  onlyText = false,
  fullWidth = false,
  variant = 'menu'
}: ButtonProps) => {
  return (
    <button
      className={
        buttonVariants[variant].button +
        (fullWidth ? ' w-full ' : ' ') +
        ' transition-all'
      }
      onClick={onClick}
      type={type}
    >
      <div
        className={
          'flex w-full items-center ' +
          (onlyText ? ' justify-center ' : ' ') +
          (onlyIcon ? ' justify-center ' : ' ')
        }
      >
        {icon && (
          <div
            className={
              (onlyText ? 'hidden ' : ' ') +
              buttonVariants[variant].icon +
              (!onlyText && !onlyIcon ? ' mr-2.5' : ' ')
            }
          >
            {icon}
          </div>
        )}
        <p
          className={
            (onlyIcon ? 'hidden ' : ' ') + buttonVariants[variant].text
          }
        >
          {text}
        </p>
      </div>
    </button>
  )
}

export default Button
