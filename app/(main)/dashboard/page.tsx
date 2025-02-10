'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Calendar from '@/app/(main)/dashboard/components/Calendar'
// import VehicleMarker from '@/app/(main)/location/components/VehicleMarker'
// import SearchInput from '@/components/common/Input/SearchInput'
// import Modal from '@/components/common/Modal'
// import { ModalMessageType } from '@/components/common/Modal/types'
import Map from '@/components/domain/map/Map'
// import { useSearchSingleVehicle } from '@/hooks/useVehicleLocationSearch'
import { WhiteAlertIcon, WhiteBellIcon, WhiteCheckIcon, WhiteOnButtonIcon } from '@/public/icons'

import InspectionStatus from './components/InspectionStatus'
import NoticeListBoard from './components/NoticeListBoard'
import VehicleStatusPanel from './components/VehicleStatusPanel'
import * as styles from './styles.css'

const DashboardPage = () => {
    // const {
    //     vehicleInfo,
    //     mapState,
    //     isVehicleVisible,
    //     searchTerm,
    //     modalMessage,
    //     isOpen,
    //     handleVehicleSearch,
    //     handleSearchChange,
    //     closeModal,
    // } = useSearchSingleVehicle()

    const [userInfo, setUserInfo] = useState({
        companyName: '',
        nickname: '',
    })

    useEffect(() => {
        const companyName = localStorage.getItem('company_name') || ''
        const nickname = localStorage.getItem('nickname') || ''

        setUserInfo(() => ({
            companyName,
            nickname,
        }))
    }, [])

    // const isVehicleMarkerVisible = !!(isVehicleVisible && vehicleInfo)

    return (
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                <Image
                    src={'/text-logo.png'}
                    width={152}
                    height={30}
                    alt='로고'
                    style={{ width: '152px', height: '30px' }}
                />
            </div>

            <section className={styles.leftSection}>
                <header className={styles.header}>
                    <p className={styles.introduce}>
                        안녕하세요,
                        <span className={styles.userName}>
                            {userInfo.companyName}, {userInfo.nickname} 님 👋
                        </span>
                    </p>
                </header>

                <InspectionStatus
                    inspectionStatusData={[
                        {
                            status: 'required',
                            icon: <WhiteBellIcon color='white' size={24} />,
                            text: '점검 필요',
                            iconType: 'bell',
                        },
                        {
                            status: 'scheduled',
                            icon: <WhiteAlertIcon color='white' size={24} />,
                            text: '점검 예정',
                            iconType: 'alert',
                        },
                        {
                            status: 'inProgress',
                            icon: <WhiteOnButtonIcon color='white' size={24} />,
                            text: '점검 진행',
                            iconType: 'button',
                        },
                        {
                            status: 'completed',
                            icon: <WhiteCheckIcon color='white' size={24} />,
                            text: '점검 완료',
                            iconType: 'check',
                        },
                    ]}
                />

                <div className={styles.vehicleStatusPanelWrapper}>
                    <VehicleStatusPanel />
                </div>

                <div className={styles.mapWrapper}>
                    {/* <div className={styles.searchInputWrapper}>
                        <SearchInput
                            icon='/icons/search-icon.svg'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onSubmit={handleVehicleSearch}
                        />
                    </div> */}
                    <Map />
                </div>
            </section>

            <section className={styles.rightSection}>
                <div className={styles.calendarWrapper}>
                    <Calendar
                        calendarData={[
                            {
                                id: 1,
                                message: '주행거리 높은 순',
                                isActive: false,
                            },
                            {
                                id: 2,
                                message: '45가 3838 (49km)',
                                isActive: false,
                            },
                            {
                                id: 3,
                                message: '38모 1537 (38Km)',
                                isActive: true,
                            },
                            {
                                id: 4,
                                message: '37하 4537 (21Km)',
                                isActive: false,
                            },
                        ]}
                    />
                </div>

                <NoticeListBoard />
            </section>

            {/* <Modal
                isOpen={isOpen}
                message={modalMessage as ModalMessageType}
                variant={{ variant: 'alert', confirmButton: '확인' }}
                onClose={closeModal}
            /> */}
        </div>
    )
}

export default DashboardPage
