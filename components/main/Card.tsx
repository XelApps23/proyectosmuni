import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Card = ({ children }: Props) => {
  return <div className="bg-white1 p-6 rounded-lg">{children}</div>
}

export default Card
