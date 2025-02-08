import { useEffect, useState } from 'react'

import VehicleStatusItem from '@/app/(main)/dashboard/components/VehicleStatusItem'
import { vehicleService } from '@/lib/apis'
import { vars } from '@/styles/theme.css'
import { VehicleStatusModel } from '@/types/vehicle'

import * as styles from './styles.css'

// TODO: location VehicleStatusPanel 컴포넌트와 통합해보기
const VehicleStatusPanel = () => {
    const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusModel>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getVehicleStatus = async () => {
            try {
                setIsLoading(true)
                const vehicleStatus = await vehicleService.getVehicleStatus()
                setVehicleStatus(vehicleStatus)
            } catch (error) {
                console.error('차량현황 조회에 실패하였습니다', error)
            } finally {
                setIsLoading(false)
            }
        }
        getVehicleStatus()
    }, [])

    const getVehicleCount = (value: number | undefined) => (!isLoading && value ? value : 0)

    const allVehicles = getVehicleCount(vehicleStatus?.allVehicles)
    const engineOnVehicles = getVehicleCount(vehicleStatus?.engineOnVehicles)
    const engineOffVehicles = getVehicleCount(vehicleStatus?.engineOffVehicles)

    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper}>차량현황</div>
            <VehicleStatusItem total={allVehicles} current={allVehicles} color={vars.colors.primary}>
                전체 차량
            </VehicleStatusItem>

            <VehicleStatusItem total={allVehicles} current={engineOnVehicles} color={vars.colors.green[500]}>
                운행중 차량
            </VehicleStatusItem>

            <VehicleStatusItem total={allVehicles} current={engineOffVehicles} color={vars.colors.blue}>
                미운행 차량
            </VehicleStatusItem>
        </div>
    )
}

export default VehicleStatusPanel
