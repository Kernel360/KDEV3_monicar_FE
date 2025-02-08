import { useState } from 'react'

import { formatToKSTDate } from '@/lib/utils/date'

export const useSearchDate = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
    ])

    const handleDateRangeChange = (value: [Date | null, Date | null]) => {
        setDateRange(value)
    }

    const getFormattedDates = () => {
        if (!dateRange[0] || !dateRange[1]) {
            return null
        }

        return {
            startDate: formatToKSTDate(dateRange[0]),
            endDate: formatToKSTDate(dateRange[1]),
        }
    }

    const isDateRangeValid = Boolean(dateRange[0] && dateRange[1])

    return {
        dateRange,
        handleDateRangeChange,
        getFormattedDates,
        isDateRangeValid,
    }
}
