import { Skeleton } from '@mantine/core'

import * as styles from './styles.css'

const PanelSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.ringProgressWrapper}>
                <Skeleton circle width={100} height={100} />
            </div>
            <div className={styles.inspectionStatusItem}>
                <Skeleton height={24} width='100%' radius='xl' />
                <Skeleton height={24} width='100%' radius='xl' />
                <Skeleton height={24} width='100%' radius='xl' />
                <Skeleton height={24} width='100%' radius='xl' />
            </div>
        </div>
    )
}

export default PanelSkeleton
