import { useState } from 'react'

import { useModal } from '@/hooks/useModal'
import { vehicleService } from '@/lib/apis'
import { validateVehicleNumber } from '@/lib/utils/validation'
import { VehicleInfoModel } from '@/types/vehicle'

export const useVehicleLocationSearch = (vehicleNumber: string) => {
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfoModel>()

    const { isModalOpen, message, closeModal, openModalWithMessage } = useModal()

    const searchVehicleWithNumber = async () => {
        const validation = validateVehicleNumber(vehicleNumber)

        if (!validation.isValid) {
            openModalWithMessage(validation.message!)
            return
        }

        const result = await vehicleService.getVehicleInfo(vehicleNumber)

        if (!result.isValid) {
            openModalWithMessage(result.value as string)
            return
        }

        if (typeof result.value === 'string') return

        setVehicleInfo(result.value)

        return result.value
    }

    return {
        vehicleInfo,
        isModalOpen,
        message,
        closeModal,
        searchVehicleWithNumber,
    }
}
