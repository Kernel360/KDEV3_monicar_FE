import { useModal } from '@/hooks/useModal'

export const useDetailModal = () => {
    const {
        isModalOpen: isConfirmModalOpen,
        message: confirmModalMessage,
        closeModal: closeConfirmModal,
        openModalWithMessage: showConfirmMessage,
    } = useModal()
    const {
        isModalOpen: isAlertModalOpen,
        message: alertModalMessage,
        closeModal: closeAlertModal,
        openModalWithMessage: showAlertMessage,
    } = useModal()

    return {
        isConfirmModalOpen,
        confirmModalMessage,
        closeConfirmModal,
        showConfirmMessage,
        isAlertModalOpen,
        alertModalMessage,
        closeAlertModal,
        showAlertMessage,
    }
}
