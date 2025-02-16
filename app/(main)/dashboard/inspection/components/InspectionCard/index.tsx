import { BaseButton } from '@/components/common/Button/BaseButton'
import { WhiteAlertIcon, WhiteBellIcon, WhiteCheckIcon, WhiteOnButtonIcon } from '@/public/icons'

import * as styles from './styles.css'

type StatusType = 'REQUIRED' | 'SCHEDULED' | 'INPROGRESS' | 'COMPLETED'

interface InspectionCardProps {
    vehicleNumber: string
    managerName?: string
    drivingDistance?: number
    hasButton?: boolean
    status: StatusType
    onClick: () => void
}

const InspectionCard = ({
    vehicleNumber,
    drivingDistance,
    managerName,
    hasButton = true,
    status,
    onClick,
}: InspectionCardProps) => {
    const iconStatus = (status: StatusType) => {
        switch (status) {
            case 'REQUIRED':
                return <WhiteBellIcon />
            case 'SCHEDULED':
                return <WhiteAlertIcon />
            case 'INPROGRESS':
                return <WhiteOnButtonIcon />
            case 'COMPLETED':
                return <WhiteCheckIcon />
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper[status]}>
                <div className={styles.icon}>{iconStatus(status)}</div>
            </div>

            <div className={styles.contents}>
                <p className={styles.vehicleNumber}>{vehicleNumber}</p>
                {drivingDistance && <p className={styles.description}>{drivingDistance}</p>}
                {managerName && <p className={styles.description}>{managerName}</p>}
            </div>

            {hasButton && (
                <div className={styles.button}>
                    <BaseButton onClick={onClick}>승인</BaseButton>
                </div>
            )}
        </div>
    )
}

export default InspectionCard
