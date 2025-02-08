import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { API_URL } from '@/constants/api'
import { authService } from '@/lib/apis/auth'
import { httpClient } from '@/lib/apis/client'
import { useAuthStore } from '@/stores/useAuthStore'

interface CustomRequestConfig extends InternalAxiosRequestConfig {
    isRequestAlready?: boolean
}

interface ErrorResponse {
    errorCode: number
    message: string
}

export const setupRequestInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config
        },
        (error: AxiosError) => {
            return Promise.reject(error)
        },
    )
}

export const setupResponseInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response
        },
        async (error: AxiosError<ErrorResponse>) => {
            const originalRequest = error.config as CustomRequestConfig
            const errorCode = error.response?.data?.errorCode

            if (
                (error?.status === 401 || error?.status === 403) &&
                originalRequest &&
                !originalRequest.isRequestAlready
            ) {
                const logout = useAuthStore.getState().logout
                // const { logout } = useAuth()
                originalRequest.isRequestAlready = true

                try {
                    switch (errorCode) {
                        case 9995:
                            await httpClient.post(`${API_URL}/auth/reissue`)
                            return httpClient(originalRequest)

                        case 9994:
                            await httpClient.post(`${API_URL}/auth/refresh`)
                            return httpClient(originalRequest)

                        case 9000:
                            logout()
                            window.location.href = '/signin'
                            break
                        default:
                            break
                    }
                } catch (retryError) {
                    console.log(retryError)
                    await authService.postSignOut()
                    logout()
                    window.location.href = '/signin'
                }
            }

            return Promise.reject(error)
        },
    )
}
