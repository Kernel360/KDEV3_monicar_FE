'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Switch from '@/components/common/Switch'
import NavItem from '@/components/layout/NavBar/NavItem'
import { navigationItems } from '@/constants/navigation'
import { useAuth } from '@/hooks/useAuth'

import * as styles from './styles.css'

const NavBar = () => {
    const { logout } = useAuth()

    const [useEmail, setUserEmail] = useState<string>('')

    useEffect(() => {
        const useEmail = localStorage.getItem('email') || 'b6f2@monicar.com'

        setUserEmail(useEmail)
    }, [])

    return (
        <aside className={styles.navbar}>
            <nav className={styles.navContainer}>
                <div className={styles.logoWrapper}>
                    <Image src='/box-logo.png' alt='박스 로고 이미지' width={48} height={48} />
                    <div className={styles.logoInfo}>
                        <Image src='/text-logo.png' alt='텍스트 로고 이미지' width={104} height={22} />
                        <p className={styles.userEmail}>{useEmail}</p>
                    </div>
                </div>

                <ul className={styles.navList}>
                    {navigationItems.map((navItem, index) => (
                        <NavItem key={index} label={navItem.label} path={navItem.path} iconSrc={navItem.iconSrc} />
                    ))}
                </ul>
            </nav>

            <footer className={styles.sideFooter}>
                <button className={styles.logoutButton} onClick={logout}>
                    <Image src='/icons/sign-out-icon.svg' alt={`로그아웃 아이콘`} width={20} height={20} />
                    <span>로그아웃</span>
                </button>
                <div className={styles.themeControl}>
                    <div className={styles.themeInfo}>
                        <Image src='/icons/sun-icon.svg' alt='아이콘' width={20} height={20} />
                        <span>라이트모드</span>
                    </div>
                    <Switch />
                </div>
            </footer>
        </aside>
    )
}

export default NavBar
