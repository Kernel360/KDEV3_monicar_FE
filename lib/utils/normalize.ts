import { ClusterInfoModel } from '@/types/map'
import { VehicleInfoModel, VehicleInfoResponse } from '@/types/vehicle'

export const normalizeCoordinate = (coordinateValue: number): number => coordinateValue / 1000000
export const denormalizeCoordinate = (coordinateValue: number): number => Math.round(coordinateValue * 1000000)

export const normalizeVehicleResponse = (data: VehicleInfoResponse): VehicleInfoModel => {
    return {
        vehicleId: data.vehicleId,
        vehicleNumber: data.vehicleNumber,
        coordinate: {
            lat: normalizeCoordinate(data.recentCycleInfo.lat),
            lng: normalizeCoordinate(data.recentCycleInfo.lng),
        },
    }
}

export const normalizeClusterResponse = (data: ClusterInfoModel[]) => {
    const normalizedClusterInfo = data.map((clusterInfo: ClusterInfoModel) => {
        return {
            ...clusterInfo,
            lat: normalizeCoordinate(clusterInfo.lat),
            lng: normalizeCoordinate(clusterInfo.lng),
        }
    })

    return normalizedClusterInfo
}
