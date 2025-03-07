import { useEffect, useState } from 'react'

import { API_URL } from '@/constants/api'
import { AlarmResponse } from '@/types/vehicle'

export const useSubscribe = () => {
    const [alarm, setAlarm] = useState<AlarmResponse[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const url = `${API_URL}/api/v1/alarm/subscribe`.replace('//api', '/api')
        const eventSource = new EventSource(url, { withCredentials: true })

        const addAlarm = (event: MessageEvent) => {
            const newAlarm = JSON.parse(event.data)
            setAlarm((prev) => [...prev, newAlarm])

            setTimeout(() => {
                setAlarm((prev) => prev.filter((item) => item.id !== newAlarm.id))
            }, 5000)
        }

        eventSource.addEventListener('REQUIRED', addAlarm)
        eventSource.addEventListener('SCHEDULED', addAlarm)
        eventSource.addEventListener('INPROGRESS', addAlarm)
        eventSource.addEventListener('COMPLETED', addAlarm)

        eventSource.onopen = () => {
            // console.log('SSE 연결 시작')
        }

        eventSource.onerror = () => {
            setError(new Error('SSE 연결 오류'))
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return {
        alarm,
        error,
    }
}
