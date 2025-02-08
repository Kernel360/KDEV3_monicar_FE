export const logPath = [
    { label: '운행기록', path: '/log' },
    { label: '운행일지', path: '/log/:id' },
    { label: '일별 및 시간별 운행기록', path: '/log/:id/daily' },
] as const

export const noticePath = [
    { label: '대시보드', path: '/' },
    { label: '공지사항', path: '/notice' },
] as const

export const registerPath = [
    { label: '운행기록', path: '/log' },
    { label: '차량등록', path: '/log/register' },
] as const
