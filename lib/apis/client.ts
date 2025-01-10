import axios from 'axios'

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})
