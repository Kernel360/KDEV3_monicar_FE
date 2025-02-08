import { useState } from 'react'

import { useModal } from '@/hooks/useModal'
import { vehicleService } from '@/lib/apis'
import { validateVehicleNumber } from '@/lib/utils/validation'
import { VehicleOperationPeriodModel } from '@/types/vehicle'

export const useSearchVehicle = (vehicleNumber: string = '') => {
    const [searchedVehicle, setSearchedVehicle] = useState<VehicleOperationPeriodModel | null>()
    const [searchableDates, setSearchableDates] = useState({ firstDateAt: '', lastDateAt: '' })

    const { isModalOpen, message, closeModal, openModalWithMessage } = useModal()

    const searchVehicle = async () => {
        const validation = validateVehicleNumber(vehicleNumber)

        if (!validation.isValid) {
            openModalWithMessage(validation.message!)
            return
        }

        try {
            const response = await vehicleService.getVehicleOperationPeriod(vehicleNumber)

            if (!response.isValid) {
                openModalWithMessage('등록되지 않은 차량번호입니다.')
                setSearchedVehicle(null)
                return
            }

            const vehicleOperationPeriodInfo = {
                vehicleId: response.value.vehicleId,
                vehicleNumber: response.value.vehicleNumber,
                searchableDates: {
                    firstDateAt: response.value.firstDateAt,
                    lastDateAt: response.value.lastDateAt,
                },
            }

            setSearchedVehicle(vehicleOperationPeriodInfo)
            setSearchableDates(vehicleOperationPeriodInfo.searchableDates)
        } catch (error) {
            console.error(error)
            openModalWithMessage('차량 정보를 불러오는데 실패했습니다')
        }
    }

    return {
        searchedVehicle,
        searchableDates,
        isModalOpen,
        message,
        searchVehicle,
        setSearchableDates,
        closeModal,
    }
}
