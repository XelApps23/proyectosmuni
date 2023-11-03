import React, { useState } from 'react'
import { formatDate } from '@/services/Utils'
import useUpdates from '@/hooks/useUpdates'
import Button from '@/components/main/Button'
import { Update } from '@/hooks/types/Update'
import { UserList } from '@/hooks/types/User'

type Props = {
  currentTask: string
  update: Update
  users: UserList
}

const CommentUpdate = ({ update, users, currentTask }: Props) => {
  const { deteleUpdate, updateUpdate } = useUpdates()
  const [isEdit, setIsEdit] = useState(false)
  const [newText, setNewText] = useState('')

  const changeNewText = (e) => {
    setNewText(e.target.value)
  }

  const sendUpdateUpdate = (id: string, text: string) => {
    updateUpdate(id, text)
    cancelModification()
  }
  const cancelModification = () => {
    setNewText('')
    setIsEdit(false)
  }

  const startEditing = (description: string) => {
    setIsEdit(true)
    setNewText(description)
  }
  return (
    <div className='flex mb-1 p-1'>
        <img className="h-[35px] w-[50px] bg-aprobadoHoverig md:bg-black1 mr-2"></img>
        <div className='text-gray1'>
        <div className='flex gap-x-1 mb-2'>
          <p>{users[update.userId]?.firstname} {users[update.userId]?.lastname}</p>
          <p>{formatDate(update.createdAt, 'PPPPp')}</p>
        </div>
        {isEdit
          ? <div className='mb-1'>
            <textarea
            className='rounded-md w-[100%] border-solid border-2'
            rows={2}
            value={newText}
            onChange={changeNewText}
            ></textarea>
            <div className='flex gap-x-1 mt-1'>
              <Button
                onClick={() => sendUpdateUpdate(update.id, newText)}
                variant="primary"
                text="Enviar"
              />
              <Button
                onClick={() => cancelModification()}
                variant="icon"
                text="Cancelar"
              />
            </div>
            </div>
          : <p className='mb-1'>{update.description}</p>
            }
            <div className='flex'>
              <Button
                onClick={() => startEditing(update.description)}
                variant="icon"
                text="Editar"
              />
              <Button
                onClick={() => deteleUpdate(update.id)}
                variant="icon"
                text="Eliminar"
              />
            </div>
        </div>
    </div>
  )
}

export default CommentUpdate
