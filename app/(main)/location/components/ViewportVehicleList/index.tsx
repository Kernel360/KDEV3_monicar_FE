import Image from 'next/image'
import { useEffect } from 'react'

import Badge from '@/components/common/Badge'
import { OPERATION_STATUS } from '@/components/common/Badge/constants'
import { useQueryParams } from '@/hooks/useQueryParams'
import { addSpaceVehicleNumber } from '@/lib/utils/string'
import { VehicleLocation } from '@/types/vehicle'

import * as styles from './styles.css'

interface ViewportVehicleListProps {
    clusterDetail: VehicleLocation[]
    onVehicleClick: (vehicleId: string, vehicleNumber: string) => void
}

const ViewportVehicleList = ({ clusterDetail, onVehicleClick }: ViewportVehicleListProps) => {
    const { removeQuery } = useQueryParams()

    const hasVehicles = clusterDetail.length > 0

    useEffect(() => {
        return () => removeQuery('vehicleName')
    }, [])

    const getVehicleStatus = (status: keyof typeof OPERATION_STATUS) => {
        return OPERATION_STATUS[status] ?? '운행중'
    }

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>차량 목록</h2>
            </header>

            {!hasVehicles ? (
                <main className={styles.vehicleList}>
                    <div className={styles.listHeader}>
                        총<span className={styles.vehicleCount}>{clusterDetail.length}</span>대의 차량
                    </div>

                    {clusterDetail.map((cluster) => {
                        const vehicleNumber = addSpaceVehicleNumber(cluster.vehicleNumber)

                        return (
                            <div
                                key={cluster.vehicleId}
                                className={styles.vehicleItem}
                                onClick={() => onVehicleClick(cluster.vehicleId, cluster.vehicleNumber)}
                                role='presentation'
                            >
                                <Badge shape='circle' variant={getVehicleStatus(cluster.status!)} />
                                <Badge shape='circle' variant={'운행중'} />
                                <p className={styles.vehicleNumber}>{vehicleNumber}</p>
                                <Image src={'/icons/right-icon.svg'} width={24} height={24} alt='자세히보기 버튼' />
                            </div>
                        )
                    })}
                </main>
            ) : (
                <div className={styles.emptyText}>
                    <p>현재 영역에서 찾은 차량이 없습니다</p>
                    <small className={styles.description}>지도를 이동하여 차량을 찾아보세요</small>
                </div>
            )}
        </article>
    )
}

export default ViewportVehicleList
