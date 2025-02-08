export const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface UseDataRequest {
    url: string
    params?: Record<string, string | number | undefined>
    enabled?: boolean
}

export const API_ENDPOINTS = {
    LOG: '/api/v1/log',
} as const
