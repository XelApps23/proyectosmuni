import Button from '@/components/main/Button'
import React from 'react'

const Buttons = () => {
  return (
    <div>
      <Button variant="cancelar" text="cancelar"></Button>
      <Button variant="icon" text="icon"></Button>
      <Button variant="login" text="login"></Button>
      <Button variant="primary" text="primary"></Button>
      <Button variant="secondary" text="simple"></Button>
    </div>
  )
}

export default Buttons
