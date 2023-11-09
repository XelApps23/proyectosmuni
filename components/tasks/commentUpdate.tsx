import React, { useState } from 'react'
import { formatDate } from '@/services/Utils'
import useUpdates from '@/hooks/useUpdates'
import Button from '@/components/main/Button'
import { Update } from '@/hooks/types/Update'
import { UserList } from '@/hooks/types/User'
import ProfilePicture from '../main/ProfilePicture'

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
    <div className="flex mb-1 p-1">
      <div className="w-10 h-10 mr-4">
        <ProfilePicture user={users[update.userId]} />
      </div>
      <div className="">
        <div className="flex gap-x-1 mb-2 items-center">
          <p className="font-semibold">
            {users[update.userId]?.firstname} {users[update.userId]?.lastname}
          </p>
          <p className="text-sm text-gray1">{formatDate(update.createdAt, 'PPPPp')}</p>
        </div>
        {isEdit
          ? (
          <div className="mb-1">
            <textarea
              className="rounded-lg p-2 w-full border-solid border-2"
              rows={2}
              value={newText}
              onChange={changeNewText}
            ></textarea>
            <div className="flex gap-x-1 mt-1 items-center">
              <Button
                onClick={() => sendUpdateUpdate(update.id, newText)}
                variant="primary"
                text="Guardar"
              />
              <Button
                onClick={() => cancelModification()}
                variant="secondary"
                text="Cancelar"
              />
            </div>
          </div>
            )
          : (
          <p className="mb-1">{update.description}</p>
            )}
        <div className="flex">
          {!isEdit && (
            <>
              <Button
                onClick={() => startEditing(update.description)}
                variant="secondary"
                text="Editar"
              />
              <Button
                onClick={() => deteleUpdate(update.id)}
                variant="secondary"
                text="Eliminar"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentUpdate
