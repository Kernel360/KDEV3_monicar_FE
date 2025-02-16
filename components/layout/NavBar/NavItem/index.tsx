'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import * as styles from './styles.css'

interface NavItemProps {
    label: string
    path: string
    iconSrc: string
}

const NavItem = ({ label, path, iconSrc }: NavItemProps) => {
    const pathname = usePathname()
    const isCurrentPage = pathname.startsWith(path)

    return (
        <li>
            <Link
                href={`${path}`}
                className={`
          ${styles.navItem}
          ${isCurrentPage ? styles.currentItem : ''}
        `}
            >
                <Image
                    src={iconSrc}
                    alt={`${label} 아이콘`}
                    width={20}
                    height={20}
                    style={{ width: '20px', height: '20px' }}
                />
                <span>{label}</span>
            </Link>
        </li>
    )
}

export default NavItem
