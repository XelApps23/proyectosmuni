import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useUpdates from '@/hooks/useUpdates'
import Button from '@/components/main/Button'
import CommentUpdate from './commentUpdate'
import { UserList } from '@/hooks/types/User'
import { useToast } from '@chakra-ui/react'

type Props = {
  currentTask: string
  users: UserList
}

const UpdateView = ({ currentTask, users }: Props) => {
  const { getUpdatesOfTask, updates, createUpdate } = useUpdates()
  const { id } = useSelector((state) => state.login)
  const [isWrite, setIsWrite] = useState(false)
  const [rows, setRows] = useState(1)
  const [text, setText] = useState('')
  const toast = useToast()

  useEffect(() => {
    getUpdatesOfTask(currentTask)
  }, [])
  const writeUpdate = () => {
    setIsWrite(true)
    setRows(4)
  }

  const changeText = (e) => {
    setText(e.target.value)
  }

  const cancel = () => {
    setText('')
    setIsWrite(false)
    setRows(1)
  }

  const sendUpdate = async (id: string) => {
    const response = await createUpdate({
      userId: id,
      taskId: currentTask,
      description: text
    })
    if (response.status === 'success') {
      toast({
        title: response.message,
        status: 'success',
        duration: 2000,
        isClosable: true
      })
      cancel()
      getUpdatesOfTask(currentTask)
    }
    if (response.status === 'error') {
      toast({
        title: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <textarea
        onClick={() => writeUpdate()}
        className='rounded-md w-[100%] border-solid border-2'
        rows={rows}
        placeholder='Añadir un comentario'
        value={text}
        onChange={changeText}
      ></textarea>
      {
        isWrite &&
        <div className='flex gap-x-1 mt-1'>
          <Button
            onClick={() => sendUpdate(id)}
            variant="primary"
            text="Enviar"
          />
          <Button
            onClick={cancel}
            variant="icon"
            text="Cancelar"
          />
        </div>
      }
      <div className='mt-2'>
        {Object.keys(updates)
          .map((key) => updates[key])
          .filter((update) => update.taskId === currentTask)
          .map((update, index) => (
            <div key={update.id}>
              <CommentUpdate update={update} users={users} currentTask={currentTask} />
            </div>
          ))}
      </div>
    </>
  )
}

export default UpdateView
