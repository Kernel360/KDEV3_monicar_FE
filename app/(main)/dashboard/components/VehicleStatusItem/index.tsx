import { Progress } from '@mantine/core'
import CountUp from 'react-countup'

import * as styles from './styles.css'

interface VehicleStatusItemProps {
    total: number
    current: number
    color: string
    children?: React.ReactNode
}

// TODO: location VehicleStatusItem 컴포넌트와 통합해보기
const VehicleStatusItem = ({ total, current, color, children }: VehicleStatusItemProps) => {
    const percent = (current / total) * 100

    return (
        <div className={styles.container}>
            <span className={styles.circle} style={{ background: color }} />
            <p className={styles.title}>
                {children}
                {current !== 0 && (
                    <span className={styles.count}>
                        <CountUp end={Number(current)} duration={1} />
                    </span>
                )}
            </p>
            <div className={styles.progressWrapper}>
                <Progress color={color} radius='md' size='lg' value={percent || 0} transitionDuration={1000} />
            </div>
        </div>
    )
}

export default VehicleStatusItem
