import { useCallback, useState } from 'react'

export const useDisclosure = (
    initialState = false,
    callback: {
        onOpen: () => void
        onClose: () => void
    },
) => {
    const [isOpen, setIsOpen] = useState(initialState)
    const { onOpen, onClose } = callback

    const open = useCallback(() => {
        setIsOpen((isOpen) => {
            if (!isOpen) {
                onOpen?.()
                return true
            }
            return isOpen
        })
    }, [onOpen])

    const close = useCallback(() => {
        setIsOpen((isOpen) => {
            if (isOpen) {
                onClose?.()
                return false
            }
            return isOpen
        })
    }, [onClose])

    const toggle = useCallback(() => {
        if (isOpen) {
            close()
        } else {
            open()
        }
    }, [close, open, isOpen])

    return [isOpen, { open, close, toggle }] as const
}
