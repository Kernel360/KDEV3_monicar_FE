import { RingProgress } from '@mantine/core'
import { useEffect, useState } from 'react'

import { useLoading } from '@/hooks/useLoading'
import { vehicleService } from '@/lib/apis'
import { vars } from '@/styles/theme.css'
import { VehicleStatusSummary } from '@/types/vehicle'

import InspectionStatusItem from '../InspectionStatusItem'

import * as styles from './styles.css'

const InspectionStatusPanel = () => {
    const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusSummary>()
    const [isLoading, startLoading, finishLoading] = useLoading()

    useEffect(() => {
        const getVehicleStatus = async () => {
            try {
                startLoading()
                const result = await vehicleService.getVehicleStatus()
                if (!result.isSuccess) throw new Error(result.error)

                const vehicleStatus = result.data
                setVehicleStatus(vehicleStatus)
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)
                }
            } finally {
                finishLoading()
            }
        }
        getVehicleStatus()
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
                        { value: vehicleStatus ? 40 : 0, color: '#FF385C', tooltip: '1 – 40 Gb' },
                        { value: vehicleStatus ? 40 : 0, color: '#FF4086', tooltip: '2 – 40 Gb' },
                        { value: vehicleStatus ? 10 : 0, color: '#FFC6DB', tooltip: '3 – 40 Gb' },
                        { value: vehicleStatus ? 10 : 0, color: '#FFE7F0', tooltip: '4 – 40 Gb' },
                    ]}
                />
            </div>
            <div className={styles.inspectionStatusItem}>
                <InspectionStatusItem total={100} current={90} color={vars.colors.primary}>
                    점검 필요
                </InspectionStatusItem>
                <InspectionStatusItem total={100} current={80} color={vars.colors.progress[300]}>
                    점검 예정
                </InspectionStatusItem>
                <InspectionStatusItem total={100} current={90} color={vars.colors.progress[200]}>
                    점검 진행
                </InspectionStatusItem>
                <InspectionStatusItem total={100} current={70} color={vars.colors.progress[100]}>
                    점검 완료
                </InspectionStatusItem>
            </div>
        </div>
    )
}

export default InspectionStatusPanel
