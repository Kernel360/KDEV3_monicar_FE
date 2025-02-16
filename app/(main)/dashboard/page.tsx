'use client'

import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'

import Calendar from '@/app/(main)/dashboard/components/Calendar'
// import VehicleMarker from '@/app/(main)/location/components/VehicleMarker'
// import SearchInput from '@/components/common/Input/SearchInput'
// import Modal from '@/components/common/Modal'
// import { ModalMessageType } from '@/components/common/Modal/types'
import Alarm from '@/components/common/Alarm'
import HeaderSkeleton from '@/components/common/Skeleton/HeaderSkeleton'
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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const companyName = localStorage.getItem('company_name') || ''
        const nickname = localStorage.getItem('nickname') || ''

        setUserInfo(() => ({
            companyName,
            nickname,
        }))
        setIsLoading(false)
    }, [])

    // const isVehicleMarkerVisible = !!(isVehicleVisible && vehicleInfo)

    if (isLoading) {
        return (
            <>
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
                            <div className={styles.introduce}>
                                안녕하세요,
                                <HeaderSkeleton />
                            </div>
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
                            <Calendar />
                        </div>

                        <NoticeListBoard />
                    </section>
                </div>
            </>
        )
    }

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
                    <div className={styles.introduce}>
                        안녕하세요,
                        <Suspense fallback={<HeaderSkeleton />}>
                            <span className={styles.userName}>
                                {userInfo.companyName}, {userInfo.nickname} 님 👋
                            </span>
                        </Suspense>
                    </div>
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

                <Alarm />

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
                        />xw
                    </div> */}
                    <Map />
                </div>
            </section>

            <section className={styles.rightSection}>
                <div className={styles.calendarWrapper}>
                    <Calendar />
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
