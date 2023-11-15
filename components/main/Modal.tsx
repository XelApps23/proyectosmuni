import {
  ModalOverlay,
  Modal as CkModal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ThemingProps,
  Tooltip
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import EditIcon from '../icons/EditIcon'
import { useRouter } from 'next/router'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
  size?: ThemingProps<'Modal'>['size']
  withEdit?: boolean
  editRoute?: string
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  withEdit = false,
  editRoute
}: Props) => {
  const router = useRouter()

  return (
    <CkModal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex items-center">
          {title} {withEdit && <Tooltip label="Editar"><div onClick={() => router.push(editRoute || '/')} className="ml-4 w-5 h-5 cursor-pointer"><EditIcon /></div></Tooltip>}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{actions}</ModalFooter>
      </ModalContent>
    </CkModal>
  )
}

export default Modal
