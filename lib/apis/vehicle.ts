import { RegisterVehicleModel, VehicleTypeModel } from '@/app/(main)/log/register/types'
import { httpClient } from '@/lib/apis/client'
import { normalizeVehicleResponse } from '@/lib/utils/normalize'
import { removeSpaces } from '@/lib/utils/string'

export const vehicleService = {
    // 개별차량 검색 조회
    getVehicleInfo: async (vehicleNumber: string) => {
        const response = await httpClient.get(`api/v1/vehicle/search`, {
            params: {
                'vehicle-number': removeSpaces(vehicleNumber),
            },
        })

        if (!response.data.isSuccess) {
            if (response.data.errorCode === 1003) {
                return { isValid: false, value: '등록되지 않은 차량입니다.' }
            }
        }

        const normalizeResult = normalizeVehicleResponse(response.data.result)
        return { isValid: true, value: normalizeResult }
    },
    // 개별차량 상세정보 조회
    getVehicleDetail: async (vehicleId: string) => {
        const response = await httpClient.get(`api/v1/vehicle/${vehicleId}`)

        return response.data.result
    },
    // 시동 여부에 따른 차량 현황 조회
    getVehicleStatus: async () => {
        const response = await httpClient.get(`api/v1/vehicle/status`)

        return response.data.result
    },
    getVehicleOperationPeriod: async (vehicleNumber: string) => {
        const response = await httpClient.get(`api/v1/vehicle`, {
            params: {
                vehicleNumber: removeSpaces(vehicleNumber),
            },
        })

        if (!response.data.result) {
            return { isValid: false, value: '등록되지 않은 차량입니다.' }
        }

        return { isValid: true, value: response.data.result }
    },
    getVehicleType: async (): Promise<VehicleTypeModel[]> => {
        const response = await httpClient.get(`api/v1/log/vehicle-type`)

        return response.data.result
    },

    postVehicleInfo: async (data: RegisterVehicleModel) => {
        const response = await httpClient.post(`api/v1/vehicle/register`, data)

        if (!response.data.isSuccess) {
            if (response.data.errorCode === 1001) {
                return {
                    isSuccess: false,
                    message: '해당 차종이 존재하지 않습니다.',
                }
            }
            if (response.data.errorCode === 1002) {
                return {
                    isSuccess: false,
                    message: '해당 차종이 존재하지 않습니다.',
                }
            }
        }

        return response.data.result
    },

    deleteVehicle: async (id: number) => {
        const response = await httpClient.delete(`api/v1/vehicle/${id}`)

        if (!response.data && response.data.errorCode === 1006) {
            return {
                isSuccess: false,
                message: '해당 차종이 존재하지 않습니다.',
            }
        }
        return response.data
    },
}
