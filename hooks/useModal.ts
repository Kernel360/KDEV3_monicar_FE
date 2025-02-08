import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

export const useModal = () => {
    const [message, setMessage] = useState('')
    const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure()

    const openModalWithMessage = (message: string) => {
        setMessage(message)
        openModal()
    }

    return {
        isModalOpen,
        message,
        closeModal,
        openModalWithMessage,
    }
}
