import { RingProgress } from '@mantine/core'
import { useEffect, useState } from 'react'

import { vehicleService } from '@/lib/apis'
import { vars } from '@/styles/theme.css'
import { InspectionStatusType } from '@/types/vehicle'

import InspectionStatusItem from '../InspectionStatusItem'

import * as styles from './styles.css'

const InspectionStatusPanel = () => {
    const [inspectionStatus, setInspectionStatus] = useState<InspectionStatusType>()
    const [isLoading, setIsLoading] = useState(true)

    const getInspectionStatusStatsData = async () => {
        try {
            setIsLoading(true)
            const response = await vehicleService.getInspectionStatusStats()

            if (response.isSuccess) {
                setInspectionStatus(response.data)
            }
        } catch (error) {
            console.error('통계 실패', error)
        } finally {
            setIsLoading(false)
        }
    }

    const total =
        (inspectionStatus?.[0]?.count || 0) +
        (inspectionStatus?.[1]?.count || 0) +
        (inspectionStatus?.[2]?.count || 0) +
        (inspectionStatus?.[3]?.count || 0)

    useEffect(() => {
        getInspectionStatusStatsData()
    }, [])

    if (isLoading) {
        return
    }

    return (
        <div className={styles.container}>
            <div className={styles.ringProgressWrapper}>
                <RingProgress
                    transitionDuration={2000}
                    size={100}
                    thickness={14}
                    roundCaps
                    sections={[
                        { value: inspectionStatus?.[0]?.count || 0, color: '#FF385C', tooltip: '점검 필요' },
                        { value: inspectionStatus?.[1]?.count || 0, color: '#FF4086', tooltip: '점검 예정' },
                        { value: inspectionStatus?.[2]?.count || 0, color: '#FFC6DB', tooltip: '점검 진행' },
                        { value: inspectionStatus?.[3]?.count || 0, color: '#FFE7F0', tooltip: '점검 완료' },
                    ]}
                />
            </div>
            <div className={styles.inspectionStatusItem}>
                <InspectionStatusItem
                    total={total}
                    current={inspectionStatus?.[0]?.count || 0}
                    color={vars.colors.primary}
                >
                    점검 필요
                </InspectionStatusItem>
                <InspectionStatusItem
                    total={total}
                    current={inspectionStatus?.[1]?.count || 0}
                    color={vars.colors.progress[300]}
                >
                    점검 예정
                </InspectionStatusItem>
                <InspectionStatusItem
                    total={total}
                    current={inspectionStatus?.[2]?.count || 0}
                    color={vars.colors.progress[200]}
                >
                    점검 진행
                </InspectionStatusItem>
                <InspectionStatusItem
                    total={total}
                    current={inspectionStatus?.[3]?.count || 0}
                    color={vars.colors.progress[100]}
                >
                    점검 완료
                </InspectionStatusItem>
            </div>
        </div>
    )
}

export default InspectionStatusPanel
