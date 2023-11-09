import { ButtonHTMLAttributes, ReactElement } from 'react'
import { ButtonGroup, Button as ChButton, IconButton } from '@chakra-ui/react'

type ButtonProps = {
  onClick?: () => void
  text?: string
  icon?: ReactElement
  onlyIcon?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant?: 'menu' | 'primary' | 'login' | 'cancelar' | 'icon' | 'secondary'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
}

const buttonVariants = {
  menu: {
    color: 'gray',
    style: 'mb-2 w-full',
    text: 'font-light'
  },
  primary: {
    color: 'blue',
    style: 'mb-2',
    text: 'font-light'
  },
  secondary: {
    color: 'gray',
    style: 'mb-2',
    text: 'font-light'
  },
  icon: {
    color: 'whiteAlpha',
    style: 'mb-2',
    text: 'font-light'
  },
  login: {
    color: 'blue',
    style: 'mb-2 w-full',
    text: 'font-light'
  },
  cancelar: {
    color: 'blue',
    style: 'mb-2',
    text: 'font-light'
  }
}

const Button = ({
  onClick,
  text,
  icon,
  type = 'button',
  onlyIcon = false,
  variant = 'menu',
  loading,
  disabled = false
}: ButtonProps) => {
  return (
    <>
      {
      onlyIcon
        ? <IconButton
        aria-label=''
        onClick={onClick}
        icon={icon}
        variant={'ghost'}
        type={type}
      />
        : <div>
          {
            variant === 'menu'
              ? <ButtonGroup onClick={onClick} isAttached className='w-full'>
                  <IconButton aria-label='' icon={icon} />
                  <ChButton className={buttonVariants[variant].style}>
                    <p className={buttonVariants[variant].text}>{text}</p>
                  </ChButton>
            </ButtonGroup>
              : <ChButton
            isLoading = {loading}
            disabled={disabled}
            loadingText='Cargando'
            spinnerPlacement='start'
            onClick={onClick}
            className={buttonVariants[variant].style}
            leftIcon={icon}
            colorScheme={buttonVariants[variant].color}
            type={type}
          >
             <p className={buttonVariants[variant].text}>{text}</p>
          </ChButton>
          }
        </div>
      }
    </>
  )
}

export default Button
