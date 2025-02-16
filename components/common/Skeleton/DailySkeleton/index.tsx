import { Skeleton } from '@mantine/core'

import * as styles from './styles.css'

const DailySkeleton = () => {
    return (
        <button className={styles.container} type='button'>
            <ul className={styles.list}>
                <li className={styles.itemWrapper}>
                    <Skeleton height={40} mt={4} width='80%' radius='md' />
                </li>
                <li className={styles.itemWrapper}>
                    <Skeleton height={40} mt={4} width='60%' radius='md' />
                </li>
                <li className={styles.itemWrapper}>
                    <Skeleton height={40} mt={4} width='60%' radius='md' />
                </li>
            </ul>
            <div className={styles.icon}></div>
        </button>
    )
}

export default DailySkeleton
