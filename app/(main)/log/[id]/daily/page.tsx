'use client'

import { Select } from '@mantine/core'
import { useParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import Breadcrumbs from '@/components/common/Breadcrumbs'
import ExcelButton from '@/components/common/Button/ExcelButton'
import ErrorMessage from '@/components/common/ErrorMessage'
import DailySkeleton from '@/components/common/Skeleton/DailySkeleton'
import ListHeader from '@/components/domain/vehicle/ListHeader'
import { API_ENDPOINTS } from '@/constants/api'
import { DAILY_TITLES, HOURLY_TITLES } from '@/constants/listHeader'
import { useKakaoLoader } from '@/hooks/useKakaoLoader'
import { useModal } from '@/hooks/useModal'
import { documentService } from '@/lib/apis/document'
import { addSpaceVehicleNumber } from '@/lib/utils/string'

import { breadcrumbsWrapper } from '../styles.css'

import { default as ControlBox } from './components/ControlBox'
import DailyListItem from './components/DailyListItem'
import HourlyListItem from './components/HourlyListItem'
import { selectPeriod } from './constants'
import { useDailyData } from './hooks/useDailyData'
import { useHourlyData } from './hooks/useHourlyData'
import * as styles from './styles.css'

const DailyPage = () => {
    const {} = useKakaoLoader()
    const { id } = useParams()
    const [period, setPeriod] = useState<string>('WEEK')
    const [selectedDate, setSelectedDate] = useState<string>('')
    const { openModalWithMessage } = useModal()
    const { dailyData, isLoading, error } = useDailyData({ url: `${API_ENDPOINTS.DAILY}/${id}`, period })
    const { hourlyData } = useHourlyData({ url: `${API_ENDPOINTS.HOURLY}/${id}`, date: selectedDate })
    const vehicleNumber = addSpaceVehicleNumber(dailyData?.vehicleNumber || '')

    const handleDailyExcelButtonClick = async () => {
        try {
            await documentService.downloadDailyExcel(id as string, period)
        } catch (error) {
            console.error('엑셀 다운로드 에러', error)
            openModalWithMessage('엑셀 다운로드에 실패했습니다')
        }
    }

    const handleHourlyExcelButtonClick = async () => {
        try {
            await documentService.downloadHourlyExcel(id as string, selectedDate)
        } catch (error) {
            console.error('엑셀 다운로드 에러', error)
            openModalWithMessage('엑셀 다운로드에 실패했습니다')
        }
    }

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={breadcrumbsWrapper}>
                    <Breadcrumbs
                        breadcrumbsData={[
                            { title: '운행기록', isActive: false },
                            { title: '운행일지', isActive: false },
                            { title: '일별 및 시간별 운행기록', isActive: true },
                        ]}
                    />
                </div>

                <div className={styles.contents}>
                    <div className={styles.leftSection}>
                        <ControlBox
                            hasVehicleNumber={true}
                            title={'일별 운행기록'}
                            control={
                                <Select
                                    value={period}
                                    placeholder='1주일'
                                    data={
                                        selectPeriod?.map((item) => ({
                                            value: item.period,
                                            label: item.title,
                                        })) || []
                                    }
                                    onChange={(value) => {
                                        setPeriod(value || 'WEEK')
                                    }}
                                    size='md'
                                    radius='xl'
                                    styles={{
                                        input: {
                                            width: '100px',
                                            color: '#222222',
                                        },
                                    }}
                                />
                            }
                            button={<ExcelButton onClick={handleDailyExcelButtonClick} />}
                            vehicleNumber={dailyData?.vehicleNumber}
                            isLoading={isLoading}
                        >
                            <div className={styles.contentWrapper}>
                                <ListHeader headerTitles={DAILY_TITLES} />
                                <DailySkeleton />
                            </div>
                        </ControlBox>
                    </div>

                    <div className={styles.rightSection}>
                        <ControlBox
                            title={'시간별 운행기록'}
                            button={<ExcelButton onClick={handleHourlyExcelButtonClick} />}
                        >
                            <div className={styles.contentWrapper}>
                                <ListHeader headerTitles={HOURLY_TITLES} />
                                <DailySkeleton />
                            </div>
                        </ControlBox>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <div className={styles.container}>
            <div className={breadcrumbsWrapper}>
                <Breadcrumbs
                    breadcrumbsData={[
                        { title: '운행기록', isActive: false },
                        { title: '운행일지', isActive: false },
                        { title: '일별 및 시간별 운행기록', isActive: true },
                    ]}
                />
            </div>

            <div className={styles.contents}>
                <div className={styles.leftSection}>
                    <ControlBox
                        hasVehicleNumber={true}
                        title={'일별 운행기록'}
                        control={
                            <Select
                                value={period}
                                placeholder='1주일'
                                data={
                                    selectPeriod?.map((item) => ({
                                        value: item.period,
                                        label: item.title,
                                    })) || []
                                }
                                onChange={(value) => {
                                    setPeriod(value || 'WEEK')
                                }}
                                size='md'
                                radius='xl'
                                styles={{
                                    input: {
                                        width: '100px',
                                        color: '#222222',
                                    },
                                }}
                            />
                        }
                        button={<ExcelButton onClick={handleDailyExcelButtonClick} />}
                        vehicleNumber={vehicleNumber}
                    >
                        <div className={styles.contentWrapper}>
                            <ListHeader headerTitles={DAILY_TITLES} />
                            <Suspense fallback={<DailySkeleton />}>
                                {dailyData?.content.length === 0 ? (
                                    <div className={styles.empty}>운행내역이 없습니다.</div>
                                ) : (
                                    dailyData?.content.map((log) => (
                                        <DailyListItem
                                            key={log.drivingDate}
                                            data={log}
                                            onClick={() => {
                                                setSelectedDate(log.drivingDate)
                                            }}
                                        />
                                    ))
                                )}
                            </Suspense>
                        </div>
                    </ControlBox>
                </div>

                <div className={styles.rightSection}>
                    <ControlBox
                        title={'시간별 운행기록'}
                        button={<ExcelButton onClick={handleHourlyExcelButtonClick} />}
                    >
                        <div className={styles.contentWrapper}>
                            <ListHeader headerTitles={HOURLY_TITLES} />
                            <Suspense fallback={<DailySkeleton />}>
                                {hourlyData?.length === 0 ? (
                                    <div className={styles.empty}>운행내역이 없습니다.</div>
                                ) : (
                                    hourlyData?.map((log) => (
                                        <HourlyListItem key={`${log.startTime}-${log.endTime}`} data={log} />
                                    ))
                                )}{' '}
                            </Suspense>
                        </div>
                    </ControlBox>
                </div>
            </div>
        </div>
    )
}

export default DailyPage
