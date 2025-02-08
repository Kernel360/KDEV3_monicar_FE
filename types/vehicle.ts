import { LatLng } from '@/types/location'

export interface VehicleInfoResponse {
    vehicleId: string
    vehicleNumber: string
    recentCycleInfo: RecentCycleInfo
    status: string
}

// 상세 클러스터링 데이터 (차량 10대 미만)
export interface VehicleInfoModel {
    vehicleId: string
    vehicleNumber: string
    coordinate: LatLng
}

interface RecentCycleInfo {
    speed: number
    lat: number
    lng: number
    lastUpdated: string
}

export interface VehicleOperationPeriodModel {
    vehicleId: string
    vehicleNumber: string
    searchableDates: {
        firstDateAt: string
        lastDateAt: string
    }
}

export interface VehicleDetailModel {
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

export interface VehicleStatusModel {
    allVehicles: number
    engineOnVehicles: number
    engineOffVehicles: number
}
