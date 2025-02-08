import { useMemo } from 'react'

import { useData } from '@/hooks/useData'

import { DetailResponse } from '../types'

interface RequestData {
    url: string
    startDate?: string
    endDate?: string
    enabled: boolean
}

export const useDetailData = ({ url, startDate, endDate, enabled = true }: RequestData) => {
    const params = useMemo(
        () => ({
            start: startDate,
            end: endDate,
        }),
        [startDate, endDate],
    )

    const { data, isLoading, error } = useData<DetailResponse>({
        url,
        params,
        enabled,
    })

    return { detailData: data, isLoading, error }
}
