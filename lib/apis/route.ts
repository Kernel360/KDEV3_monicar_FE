import { httpClient } from '@/lib/apis'
import { formatISODateToISOString } from '@/lib/utils/date'
import { Result } from '@/types/apis/common'
import { LiveRouteParams, RouteDetailParams, RouteParams } from '@/types/apis/route'
import { Route } from '@/types/route'

export const routeService = {
    // 차량 이동 경로 이력 조회
    getVehicleRoutesData: async (
        vehicleId: string,
        dateRange: (Date | null)[],
        interval = 60,
    ): Promise<Result<Route[]>> => {
        const [startDate, endDate] = dateRange

        if (!startDate || !endDate)
            return {
                isSuccess: false,
                error: '선택되지 않는 날짜가 포함되어 있습니다',
            }

        const params: RouteParams = {
            startTime: formatISODateToISOString(startDate),
            endTime: formatISODateToISOString(endDate),
            interval,
        }

        const response = await httpClient.get(`api/v1/vehicle/${vehicleId}/routes`, {
            params,
        })

        const { result } = response.data

        return {
            isSuccess: true,
            data: result,
        }
    },
    // 지정된 시간 간격으로 경로 상세 정보 조회
    getVehicleRoutesDetail: async (
        vehicleId: string,
        startDate: string,
        endDate: string,
        page: number,
        interval = 60,
    ) => {
        const params: RouteDetailParams = {
            // startTime: formatToISODate(startDate),
            // endTime: formatToISODate(endDate),
            startTime: startDate,
            endTime: endDate,
            page,
            interval,
        }

        // params: {
        //     startTime: '2025-01-27T22:00:00',
        //     endTime: '2025-01-28T00:00:00',
        //     interval: 60,
        //     page: 27,
        // },

        const response = await httpClient.get(`api/v1/vehicle/${vehicleId}/routes/detail`, {
            params,
        })

        console.log(response.data.result)

        return response.data.result
    },
    // 차량 실시간 이동 경로 조회
    getVehicleLiveRoutes: async (vehicleId: string) => {
        // const currentTime = new Date()
        const params: LiveRouteParams = {
            currentTime: '2025-01-27T21:23:00',
            // currentTime,
        }

        const response = await httpClient.get(`api/v1/vehicle/${vehicleId}/recent/routes`, {
            params,
        })

        const { result } = response.data

        console.log(result)

        // return response.data.result
    },
}
