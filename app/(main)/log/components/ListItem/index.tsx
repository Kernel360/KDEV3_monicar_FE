import Badge from '@/components/common/Badge'
import { addSpaceVehicleNumber } from '@/lib/utils/string'
import { RightIcon } from '@/public/icons'
import { ListItemModel } from '@/types/log'

import * as styles from './styles.css'

interface ListItemProps {
    data: ListItemModel
    onClick?: () => void
}

const ListItem = ({ data, onClick }: ListItemProps) => {
    const { vehicleNumber, vehicleModel, drivingDays, totalDistance, status } = data
    const formattedVehicleNumber = addSpaceVehicleNumber(vehicleNumber)

    return (
        <button className={styles.container} onClick={onClick} type='button'>
            <ul className={styles.list}>
                <div className={styles.leftSection}>
                    <li className={styles.itemWrapper}>{formattedVehicleNumber}</li>
                    <li className={styles.itemWrapper}>{vehicleModel}</li>
                    <li className={styles.itemWrapper}>{drivingDays.toLocaleString('ko-KR')}일</li>
                </div>

                <div className={styles.rightSection}>
                    <li className={styles.itemWrapper}>{totalDistance.toLocaleString('ko-KR')}km</li>
                    <li className={styles.badge}>
                        <Badge shape={'rectangle'} variant={status} />
                    </li>
                </div>
            </ul>
            <div className={styles.icon}>
                <RightIcon />
            </div>
        </button>
    )
}

export default ListItem
