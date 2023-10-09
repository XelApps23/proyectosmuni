import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const LoginLayout = ({ children }: Props) => {
  return (
    <div>{children}</div>
  )
}

export default LoginLayout
