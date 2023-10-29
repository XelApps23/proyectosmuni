import Button from '@/components/main/Button'
import React from 'react'

const Buttons = () => {
  return (
    <div>
      <Button variant="cancelar" text="cancelar"></Button>
      <Button variant="disabled" text="disabled"></Button>
      <Button variant="icon" text="icon"></Button>
      <Button variant="login" text="login"></Button>
      <Button variant="menu" text="menu"></Button>
      <Button variant="primary" text="primary"></Button>
      <Button variant="simple" text="simple"></Button>
    </div>
  )
}

export default Buttons
