import { Skeleton } from '@mantine/core'

import * as styles from './styles.css'

interface ControlBoxProps {
    vehicleNumber?: React.ReactNode
    control?: React.ReactNode
    button: React.ReactNode
    title: string
    children: React.ReactNode
    hasVehicleNumber?: boolean
    isLoading?: boolean
}

const ControlBox = ({
    vehicleNumber,
    control,
    button,
    title,
    children,
    hasVehicleNumber = false,
    isLoading = false,
}: ControlBoxProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.controlGroup}>
                {hasVehicleNumber && (
                    <>
                        {isLoading ? (
                            <div className={styles.skeletonWrapper}>
                                <Skeleton height={32} width={120} radius={4} />
                            </div>
                        ) : (
                            <div className={styles.vehicleNumber}>{vehicleNumber}</div>
                        )}
                    </>
                )}
                {control}
                <div className={styles.button}>{button}</div>
            </div>

            <div className={styles.contents}>
                <h3 className={styles.title}>{title}</h3>
                {children}
            </div>
        </div>
    )
}

export default ControlBox
