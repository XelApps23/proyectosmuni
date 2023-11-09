import EditIcon from '@/components/icons/EditIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import VisibilityIcon from '@/components/icons/VisibilityIcon'
import Button from '@/components/main/Button'
import Card from '@/components/main/Card'
import Info from '@/components/main/Info'
import Modal from '@/components/main/Modal'
import PageHeader from '@/components/main/PageHeader'
import Table from '@/components/main/Table'
import useUsers from '@/hooks/useUsers'
import { formatDate } from '@/services/Utils'
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const List = () => {
  const router = useRouter()

  const { getUsers, users, roles } = useUsers()
  const [targetUser, setTargetUser] = useState<string>('')

  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isOpenInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo
  } = useDisclosure()
  const { deleteUser } = useUsers()

  useEffect(() => {
    getUsers({ withRole: true })
  }, [])

  const handleDelete = (id: string) => {
    setTargetUser(id)
    onOpen()
  }

  const handleView = (id: string) => {
    setTargetUser(id)
    onOpenInfo()
  }

  const confirmDelete = () => {
    deleteUser(targetUser)
    delete users[targetUser]
    onClose()
  }

  return (
    <Card>
      <PageHeader
        title="Usuarios"
        actionButton={() => router.push('/users/new-user')}
        actionText="Crear usuario"
      />
      <Table
        cells={Object.keys(users).map((key) => ({
          name: `${users[key].firstname || ''} ${users[key].lastname || ''}`,
          email: users[key].email,
          phone: users[key].phone,
          role: roles[users[key].role]?.name,
          testt: (
            <>
              <div className="flex">
                <Tooltip label="Detalles">
                  <div
                    className="w-5 h-5 mr-2 cursor-pointer"
                    onClick={() => handleView(key)}
                  >
                    <VisibilityIcon />
                  </div>
                </Tooltip>

                <Tooltip label="Editar">
                  <div className="w-5 h-5 mr-2 cursor-pointer" onClick={() => router.push(`/users/${key}/edit`)}>
                    <EditIcon />
                  </div>
                </Tooltip>
                <Tooltip label="Eliminar">
                  <div
                    className="w-5 h-5 mr-2 cursor-pointer"
                    onClick={() => handleDelete(key)}
                  >
                    <TrashIcon />
                  </div>
                </Tooltip>
              </div>
            </>
          )
        }))}
        headers={['Nombre', 'Correo', 'Teléfono', 'Rol', 'Acciones']}
      />
      <Modal
        title="¿Estás seguro de que deseas eliminar este usuario?"
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <div className="flex items-center justify-between">
            <Button text="Cancelar" variant="simple" onClick={onClose} />
            <Button
              text="Confirmar"
              variant="cancelar"
              onClick={confirmDelete}
            />
          </div>
        }
      >
        <p>
          El usuario seguira apareciendo en los proyectos donde estuvo asignado,
          sin embargo no tendrá acceso a la aplicación.
        </p>
      </Modal>

      <Modal
        withEdit
        editRoute={`/users/${targetUser}/edit`}
        title={
          (users[targetUser]?.firstname || '') + ' ' + (users[targetUser]?.lastname || '')
        }
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        size="xl"
      >
        <Info title="Nombre(s)">{users[targetUser]?.firstname}</Info>
        <Info title="Apellido(s)">{users[targetUser]?.lastname}</Info>
        <Info title="Correo electrónico">{users[targetUser]?.email}</Info>
        <Info title="Teléfono">{users[targetUser]?.phone}</Info>
        <Info title="Rol">{roles[users[targetUser]?.role]?.name}</Info>
        <Info title="Última actualización">
          {formatDate(users[targetUser]?.updatedAt, 'PPPPp')}
        </Info>
        <Info title="Fecha de creación">
          {formatDate(users[targetUser]?.createdAt, 'PPPPp')}
        </Info>
      </Modal>
    </Card>
  )
}

export default List
