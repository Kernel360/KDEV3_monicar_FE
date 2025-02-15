import { OPERATION_STATUS } from '@/components/common/Badge/constants'
import { LatLng } from '@/types/map'

// 차량 정보
export interface Vehicle extends Partial<VehicleOperationPeriod> {
    vehicleId: string
    vehicleNumber: string
}

//TODO: 위와 수정
export interface AutoVehicle {
    id: string
    vehicleNumber: string
}

// 차량의 현재 위치 정보
export interface VehicleLocation {
    vehicleId: string
    vehicleNumber: string
    status?: keyof typeof OPERATION_STATUS
    coordinate: LatLng
}

// 차량 운행 기간
export interface VehicleOperationPeriod {
    firstOperationDate: string | null
    lastOperationDate: string | null
}

// 차량 상세 정보
export interface VehicleDetail {
    recentVehicleInfo: {
        vehicleId: number
        vehicleNumber: string
        status: string
        lastEngineOn: string
        lastEngineOff: string
    }
    recentCycleInfo: {
        speed: number
        lat: number
        lng: number
        lastUpdated: string
    }
    todayDrivingHistory: {
        distance: number
        drivingTime: number
    }
    vehicleCompanyInfo: {
        companyName: string
    }
}

// 차량 운행 상태별 현황 요약 정보
export interface VehicleStatusSummary {
    allVehicles: number
    engineOnVehicles: number
    engineOffVehicles: number
}

// 주행거리 높은 순 랭킹
export interface RankingResponse {
    id: number
    vehicleNumber: string
    distance: number
}
