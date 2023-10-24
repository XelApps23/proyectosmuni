import React from 'react'
import Button from './Button'
import PlusIcon from '../icons/PlusIcon'
import Divider from './Divider'

type Props = {
  title: string
  actionText?: string
  actionButton?: () => void
}

const PageHeader = ({ title, actionButton, actionText }: Props) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl">{title}</div>
          {
            actionButton && actionText && (
              <div className="w-40">
                <Button
                  variant="primary"
                  text={actionText}
                  icon={<PlusIcon color="white" />}
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
