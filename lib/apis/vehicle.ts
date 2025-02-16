import { RegisterVehicleModel, VehicleTypeModel } from '@/app/(main)/log/register/types'
import { httpClient } from '@/lib/apis'
import { normalizeCoordinate } from '@/lib/utils/normalize'
import { removeSpaces } from '@/lib/utils/string'
import { Result } from '@/types/apis/common'
import { VehicleDetail, VehicleLocation, VehicleStatusSummary } from '@/types/vehicle'

export const vehicleService = {
    // 차량 정보 조회
    getVehicleInfo: async (vehicleNumber: string): Promise<Result<VehicleLocation>> => {
        const response = await httpClient.get(`api/v1/vehicle/search`, {
            params: {
                'vehicle-number': removeSpaces(vehicleNumber),
            },
        })
        if (!response.data.isSuccess) {
            const { errorCode } = response.data
            if (errorCode === 1003) {
                return { isSuccess: false, error: '등록되지 않은 차량입니다' }
            } else if (errorCode === 2000) {
                return { isSuccess: false, error: '해당 차량의 위치를 찾을 수 없습니다' }
            } else {
                return { isSuccess: false, error: response.data.errorMessage }
            }
        }

        const { result } = response.data

        if (!result) {
            return { isSuccess: false, error: '차량 정보 조회에 실패했습니다' }
        }

        const normalizeResult = {
            vehicleId: result.vehicleId,
            vehicleNumber: result.vehicleNumber,
            coordinate: {
                lat: normalizeCoordinate(result.recentCycleInfo.lat),
                lng: normalizeCoordinate(result.recentCycleInfo.lng),
            },
        }

        return { isSuccess: true, data: normalizeResult }
    },

    // 차량 번호 자동완성 검색
    getVehicleAutocomplete: async (vehicleNumber: string, signal?: AbortSignal) => {
        if (!removeSpaces(vehicleNumber)) {
            return { isValid: true, value: [] }
        }

        const response = await httpClient.get('/api/v1/vehicle/find', {
            params: {
                keyword: vehicleNumber,
            },
            signal,
        })

        if (!response.data.isSuccess) {
            const { errorCode } = response.data
            return { isValid: false, value: errorCode }
        }

        const { result } = response.data

        return { isValid: true, value: result }
    },

    // 차량 상세정보 조회
    getVehicleDetail: async (vehicleId: string): Promise<Result<VehicleDetail>> => {
        if (!vehicleId) return { isSuccess: false, error: '차량 ID가 필요합니다' }

        const response = await httpClient.get(`api/v1/vehicle/${vehicleId}`)
        if (!response.data.isSuccess) {
            return { isSuccess: false, error: response.data.errorMessage }
        }

        const { result } = response.data

        if (!result) {
            return { isSuccess: false, error: '차량 상세정보 조회에 실패했습니다' }
        }

        return { isSuccess: true, data: result }
    },

    // 차량 운행 상태별 현황 조회 (전체/운행중/미운행)
    getVehicleStatus: async (): Promise<Result<VehicleStatusSummary>> => {
        const response = await httpClient.get(`api/v1/vehicle/status`)

        if (!response.data.isSuccess) {
            return { isSuccess: false, error: response.data.errorMessage as string }
        }

        if (!response.data.result) {
            return { isSuccess: false, error: '차량현황 조회에 실패하였습니다' }
        }

        return { isSuccess: true, data: response.data.result }
    },

    // 차량번호로 운행 이력 기간 조회
    getVehicleOperationPeriod: async (vehicleNumber: string) => {
        const response = await httpClient.get(`api/v1/vehicle`, {
            params: {
                vehicleNumber: removeSpaces(vehicleNumber),
            },
        })

        const { result } = response.data

        if (!result) {
            const { errorMessage } = response.data
            return { isValid: false, value: errorMessage[0] }
        }

        const vehicleOperationHistory = {
            vehicleId: result.vehicleId,
            vehicleNumber: result.vehicleNumber,
            operationPeriod: {
                firstDateAt: result.firstDateAt,
                lastDateAt: result.lastDateAt,
            },
        }

        return { isValid: true, value: vehicleOperationHistory }
    },

    // 등록 가능한 차량 번호 조회
    getAvailableVehicleNumber: async (vehicleNumber: string) => {
        const response = await httpClient.get(`api/v1/vehicle/check`, { params: { vehicleNumber } })
        if (!response.data.isSuccess) {
            throw response.data.errorMessage
        }
        return response.data
    },

    // 등록 가능한 차량 유형 목록 조회
    getAvailableVehicleTypes: async (): Promise<VehicleTypeModel[]> => {
        const response = await httpClient.get(`api/v1/log/vehicle-type`)

        return response.data.result
    },

    // 신규 차량 정보 등록
    registerVehicle: async (data: RegisterVehicleModel) => {
        const response = await httpClient.post(`api/v1/vehicle/register`, data)

        if (!response.data.isSuccess) {
            if (response.data.errorCode === 1001) {
                return response.data.errorMessage
            }
        }

        return response.data
    },

    // 등록된 차량 정보 삭제
    deleteVehicle: async (vehicleId: number) => {
        const response = await httpClient.delete(`api/v1/vehicle/${vehicleId}`)

        if (!response.data && response.data.errorCode === 1006) {
            return {
                isSuccess: false,
                message: '해당 차종이 존재하지 않습니다.',
            }
        }
        return response.data
    },

    // 상태별 알람 조회
    getInspectionStatus: async (page: number = 0, size: number = 8) => {
        const response = await httpClient.get('/api/v1/alarm', {
            params: {
                page,
                size,
            },
        })

        if (!response.data.isSuccess) {
            return { isSuccess: false, error: response.data.errorMessage }
        }

        return { isSuccess: true, data: response.data.result.content }
    },

    // 점검현황 승인
    patchInspectionStatus: async (alarmId: number) => {
        const response = await httpClient.patch(`/api/v1/alarm/${alarmId}`)
        return response.data
    },

    // 점검현황 통계
    getInspectionStatusStats: async () => {
        const response = await httpClient.get('/api/v1/alarm/status/stats')

        if (!response.data.isSuccess) {
            return { isSuccess: false, error: response.data.errorMessage }
        }

        return { isSuccess: true, data: response.data.result }
    },
}
