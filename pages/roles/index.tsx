import Card from '@/components/main/Card'
import Modal from '@/components/main/Modal'
import PageHeader from '@/components/main/PageHeader'
import Table from '@/components/main/Table'
import useRoles from '@/hooks/useRoles'
import { formatDate } from '@/services/Utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import VisibilityIcon from '@/components/icons/VisibilityIcon'
import EditIcon from '@/components/icons/EditIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Button from '@/components/main/Button'
import Info from '@/components/main/Info'

const index = () => {
  const router = useRouter()

  const { getRoles, roles, deleteRole } = useRoles()
  const [targetRole, setTargetRole] = useState<string>('')

  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isOpenInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo
  } = useDisclosure()

  useEffect(() => {
    getRoles({})
  }, [])

  const handleDelete = (id: string) => {
    setTargetRole(id)
    onOpen()
  }

  const handleView = (id: string) => {
    setTargetRole(id)
    onOpenInfo()
  }

  const confirmDelete = () => {
    deleteRole(targetRole)
    delete roles[targetRole]
    onClose()
  }

  return (
    <Card>
      <PageHeader
        title="Roles"
        actionButton={() => router.push('/roles/new-role')}
        actionText="Crear nuevo rol"
      />
      <Table
        cells={Object.keys(roles).map((key) => ({
          name: roles[key].name,
          updatedAt: formatDate(roles[key].updatedAt, 'PPPP'),
          createdAt: formatDate(roles[key].createdAt, 'PPPP'),
          test: (
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
                  <div
                    className="w-5 h-5 mr-2 cursor-pointer"
                    onClick={() => router.push(`/roles/${key}/edit`)}
                  >
                    <EditIcon />
                  </div>
                </Tooltip>
                <Tooltip label="Borrar">
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
        headers={['Tipo de rol', 'Creado en', 'Última actualización', 'Acciones']}
      />
      <Modal
        title="¿Estás seguro de que deseas eliminar este rol?"
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
          Se eliminaran los permisos a los usuarios que tengan este rol activo
        </p>
      </Modal>

      <Modal
        withEdit
        editRoute={`/roles/${targetRole}/edit`}
        title={roles[targetRole]?.name || ''}
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        size="xl"
      >
        <Info title="Tipo de rol">{roles[targetRole]?.name}</Info>
        <Info title="Descripción">{roles[targetRole]?.description}</Info>
        <Info title="Última actualización">
          {formatDate(roles[targetRole]?.updatedAt, 'PPPPp')}
        </Info>
        <Info title="Fecha de creación">
          {formatDate(roles[targetRole]?.createdAt, 'PPPPp')}
        </Info>
      </Modal>
    </Card>
  )
}

export default index
