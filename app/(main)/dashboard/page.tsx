'use client'

import Calendar from '@/app/(main)/dashboard/components/Calendar'
import SearchInput from '@/components/common/Input/SearchInput'
import Map from '@/components/domain/map/Map'
import { WhiteAlertIcon, WhiteBellIcon, WhiteCheckIcon, WhiteOnButtonIcon } from '@/public/icons'

import InspectionStatus from './components/InspectionStatus'
import NoticeListBoard from './components/NoticeListBoard'
import VehicleStatus from './components/VehicleStatus'
import * as styles from './styles.css'

const DashboardPage = () => {
    return (
        <div className={styles.container}>
            <section className={styles.leftSection}>
                <header className={styles.header}>
                    <p className={styles.introduce}>
                        안녕하세요,
                        <span className={styles.userName}>쏘카님👋</span>
                    </p>

                    <div className={styles.searchInputWrapper}>
                        <SearchInput icon={'/icons/search-icon.svg'} />
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

                <VehicleStatus
                    vehicleStatusData={[
                        {
                            type: 'total',
                            text: '전체 차량',
                        },
                        {
                            type: 'active',
                            text: '운행중 차량',
                        },
                        {
                            type: 'inactive',
                            text: '미운행 차량',
                        },
                        {
                            type: 'disabled',
                            text: '미관제 차량',
                        },
                    ]}
                />

                <div className={styles.mapWrapper}>
                    <Map />
                </div>
            </section>

            <section className={styles.rightSection}>
                <Calendar
                    calendarData={[
                        {
                            id: 1,
                            message: '즐거운 아침! 음악과 함께 시작.',
                            isActive: false,
                        },
                        {
                            id: 2,
                            message: '따뜻한 커피 한 잔은 건강에 좋아요.',
                            isActive: false,
                        },
                        {
                            id: 3,
                            message: '점심에는 스트레칭을 해볼까요?',
                            isActive: true,
                        },
                        {
                            id: 4,
                            message: '바이오리듬을 지키세요!',
                            isActive: false,
                        },
                        {
                            id: 5,
                            message: '눈 오는 날은 차량 운행에 주의하세요.',
                            isActive: false,
                        },
                    ]}
                />

                <NoticeListBoard />
            </section>
        </div>
    )
}

export default DashboardPage
