import {
  ModalOverlay,
  Modal as CkModal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
}

const Modal = ({ isOpen, onClose, title, children, actions }: Props) => {
  return (
    <CkModal isOpen={isOpen} onClose={onClose}>
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
