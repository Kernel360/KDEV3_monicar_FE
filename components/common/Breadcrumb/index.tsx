'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import * as styles from './styles.css'
import { breadcrumbPath, BreadcrumbType, logPath } from './types'

interface BreadcrumbProps {
    type: BreadcrumbType
}

const Breadcrumb = ({ type }: BreadcrumbProps) => {
    const { id } = useParams()
    const paths = breadcrumbPath[type as keyof typeof breadcrumbPath] ?? logPath
    const index = paths.findIndex((item) => item.label === type)
    const visibleItems = paths.slice(0, index + 1)

    const replacePath = (path: string) => {
        return path.replace(':id', id as string)
    }

    return (
        <ul className={styles.list} aria-label='breadcrumb'>
            {visibleItems.map((item, index) => (
                <li key={item.label} className={styles.item}>
                    <Link
                        href={replacePath(item.path)}
                        className={styles.link}
                        aria-current={index === visibleItems.length - 1 ? 'page' : undefined}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Breadcrumb
