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

// 점검현황
export interface AlarmResponse {
    id: number
    vehicleNumber: string
    managerName: string
    drivingDistance: number
    status: 'REQUIRED' | 'SCHEDULED' | 'INPROGRESS' | 'COMPLETED'
}

// 점검현황 알림 컴포넌트
export interface InspectionStatusAlarmModel {
    status: StatusType
    iconType: IconType
    icon: React.ReactNode
    title: string
    vehicleNumber: string
    drivingDistance: number
    managerName: string
}

type StatusType = 'REQUIRED' | 'SCHEDULED' | 'INPROGRESS' | 'COMPLETED'
type IconType = 'bell' | 'alert' | 'button' | 'check'

// 점검현황 통계
export interface InspectionStatusItem {
    status: string
    count: number
}

// useState에서 사용할 타입
export type InspectionStatusType = InspectionStatusItem[]
