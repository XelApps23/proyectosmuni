import React from 'react'
import Button from './Button'
import { AddIcon } from '@chakra-ui/icons'
import Divider from './Divider'

type Props = {
  title: string
  actionText?: string
  actionButton?: () => void
  permission?: boolean
}

const PageHeader = ({ title, actionButton, actionText, permission = false }: Props) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl">{title}</div>
          {
            actionButton && actionText && (
              <div className="w-40">
                <Button
                  disabled={!permission}
                  variant="primary"
                  text={actionText}
                  icon={<AddIcon />}
                  onClick={actionButton}
                />
              </div>
            )
          }
      </div>
      <Divider />
    </>
  )
}

export default PageHeader
