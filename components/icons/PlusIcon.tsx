type Props = {
  color?: string
}

const PlusIcon = ({ color = '#000000' }: Props) => {
  return (
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7V8H8V15H7V8H0V7H7V0H8V7H15Z" fill={color} />
        </svg>

  )
}

export default PlusIcon
