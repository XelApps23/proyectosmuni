import { TaskList } from '@/hooks/types/Task'
import Table from '../main/Table'
import { FileList } from '@/hooks/types/File'
import useFile from '@/hooks/useFile'
import Button from '../main/Button'
import TrashIcon from '../icons/TrashIcon'
import VisibilityIcon from '../icons/VisibilityIcon'
import Modal from '../main/Modal'
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'

type Props = {
  files: FileList
  tasks: TaskList
  deleteFile: (idRef: string, urlRef: string) => void
}

type TargetFile = {
  idRef: string
  urlRef: string
}

const FilesTable = ({ files, tasks, deleteFile }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [targetFile, setTargetFile] = useState<TargetFile>({} as TargetFile)

  const handleDelete = (idRef: string, urlRef: string) => {
    setTargetFile({
      idRef,
      urlRef
    })
    onOpen()
  }

  const confirmDelete = () => {
    deleteFile(targetFile.idRef, targetFile.urlRef)
    onClose()
  }

  return (
    <>
      <Table
        headers={['Nombre', 'Tarea perteneciente', 'Opciones']}
        cells={Object.keys(files).map((key) => ({
          name: files[key].name,
          task: tasks[files[key].taskId]?.name ?? 'No existe',
          option: (
            <div className="flex">
              <Tooltip label="Descargar archivo">
                <a
                  href={files[key].url}
                  className="flex w-6 h-6 justify-center items-center mr-2 cursor-pointer"
                >
                  <ExternalLinkIcon w={5} h={5} />
                </a>
              </Tooltip>
              <Tooltip label="Eliminar">
                <div
                  className="flex w-6 h-6 justify-center items-center mr-2 cursor-pointer"
                  onClick={() => handleDelete(key, files[key].url)}
                >
                  <TrashIcon />
                </div>
              </Tooltip>
            </div>
          )
        }))}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="¿Esta seguro de eliminar este archivo?"
        actions={
          <div className="flex items-center justify-between">
            <Button text="Cancelar" variant="simple" onClick={onClose} />
            <Button
              text="Confirmar"
              variant="cancelar"
              onClick={() => confirmDelete()}
            />
          </div>
        }
      >
        <div></div>
      </Modal>
    </>
  )
}

export default FilesTable
