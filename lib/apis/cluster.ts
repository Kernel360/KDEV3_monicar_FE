import { httpClient } from '@/lib/apis/client'
import { denormalizeCoordinate, normalizeClusterResponse } from '@/lib/utils/normalize'
import { MapState } from '@/types/map'
// import { VehicleInfoModel } from '@/types/vehicle'

export const clusterService = {
    // 뷰포트 영역 내 클러스터링 정보 조회
    getClusterInfo: async ({ level, swCoord, neCoord }: MapState) => {
        if (!level || !swCoord || !neCoord) return []

        const params = {
            zoomLevel: level,
            swLat: denormalizeCoordinate(swCoord.lat),
            swLng: denormalizeCoordinate(swCoord.lng),
            neLat: denormalizeCoordinate(neCoord.lat),
            neLng: denormalizeCoordinate(neCoord.lng),
        }

        const response = await httpClient.get(`api/v1/vehicle/clusters`, {
            params,
        })

        // console.log(response.data.result)

        const normalizedClusterInfo = normalizeClusterResponse(response.data.result)

        return normalizedClusterInfo
    },

    // 뷰포트 영역 내 클러스터링 정보(count)가 10 미만일 경우 전체 차량 정보 조회
    // getClusterDetailInfo: async ({ level, swCoord, neCoord }: MapState): Promise<VehicleInfoModel | null> => {
    //     if (!level || level > 9 || !swCoord || !neCoord) return null

    //     const params = {
    //         level: getNormalizedZoomLevel(level),
    //         swLat: denormalizeCoordinate(swCoord.lat),
    //         swLng: denormalizeCoordinate(swCoord.lng),
    //         neLat: denormalizeCoordinate(neCoord.lat),
    //         neLng: denormalizeCoordinate(neCoord.lng),
    //     }

    //     const response = await httpClient.get(`api/v1/vehicle/cluster/details`, {
    //         params,
    //     })

    //     const normalizedClusterDetailInfo: VehicleInfoModel = {
    //         vehicleId: response.data.result.vehicleId ?? null,
    //         vehicleNumber: response.data.result.vehicleNumber ?? null,
    //         coordinate: {
    //             lat: response.data.result.lat ?? null,
    //             lng: response.data.result.lng ?? null,
    //         },
    //     }

    //     return normalizedClusterDetailInfo
    // },
}
