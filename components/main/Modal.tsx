import {
  ModalOverlay,
  Modal as CkModal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ThemingProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
  size?: ThemingProps<'Modal'>['size']
}

const Modal = ({ isOpen, onClose, title, children, actions, size = 'md' }: Props) => {
  return (
    <CkModal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{actions}</ModalFooter>
      </ModalContent>
    </CkModal>
  )
}

export default Modal
