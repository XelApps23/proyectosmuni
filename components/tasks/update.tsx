import { ChangeEvent, useState } from 'react'
import { UpdateList } from '@/hooks/types/Update'
import { UserList } from '@/hooks/types/User'
import { useSelector } from 'react-redux'
import Button from '@/components/main/Button'
import CommentUpdate from './commentUpdate'
import useUpdates from '@/hooks/useUpdates'

type Props = {
  currentTask: string
  users: UserList
  requestUpdate: (task: string) => void
  updates: UpdateList
}

const UpdateView = ({ currentTask, users, requestUpdate, updates }: Props) => {
  const { createUpdate } = useUpdates()
  const { id } = useSelector((state: any) => state.login)
  const [isWrite, setIsWrite] = useState(false)
  const [rows, setRows] = useState(1)
  const [text, setText] = useState('')
  const writeUpdate = () => {
    setIsWrite(true)
    setRows(4)
  }

  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const cancel = () => {
    setText('')
    setIsWrite(false)
    setRows(1)
  }

  const sendUpdate = (id: string) => {
    createUpdate({
      userId: id,
      taskId: currentTask,
      description: text
    })
    cancel()
    requestUpdate(currentTask)
  }

  return (
    <>
      <textarea
        onClick={() => writeUpdate()}
        className="rounded-lg w-full border-solid border-2 p-2"
        rows={rows}
        placeholder="Añadir un comentario"
        value={text}
        onChange={changeText}
      />
      {isWrite && (
        <div className="flex gap-x-1 mt-1 mb-8 items-center">
          <Button
            onClick={() => sendUpdate(id)}
            variant="primary"
            text="Guardar"
          />
          <Button onClick={cancel} variant="simple" text="Cancelar" />
        </div>
      )}
      <div className="mt-2">
        {Object.keys(updates)
          .map((key) => updates[key])
          .filter((update) => update.taskId === currentTask)
          .map((update, index) => (
            <div key={update.id}>
              <CommentUpdate
                update={update}
                users={users}
                currentTask={currentTask}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default UpdateView
