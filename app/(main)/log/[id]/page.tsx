'use client'

import { DatePickerInput } from '@mantine/dates'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import Breadcrumb from '@/components/common/Breadcrumb'
import ExcelButton from '@/components/common/Button/ExcelButton'
import LinkButton from '@/components/common/Button/LinkButton'
import { RoundButton } from '@/components/common/Button/RoundButton'
import ControlLayout from '@/components/common/ControlLayout'
import ErrorMessage from '@/components/common/ErrorMessage'
import Modal from '@/components/common/Modal'
import { ModalMessageType } from '@/components/common/Modal/types'
import PageLoader from '@/components/common/PageLoader'
import { API_ENDPOINTS } from '@/constants/api'
import { vehicleService } from '@/lib/apis/vehicle'
import { addSpaceVehicleNumber } from '@/lib/utils/string'
import { CalendarIcon } from '@/public/icons'

import '@mantine/dates/styles.css'
import 'dayjs/locale/ko'

import { useDetailData } from './hooks/useDetailData'
import { useDetailModal } from './hooks/useDetailModal'
import { useSearchDate } from './hooks/useSearchDate'
import * as styles from './styles.css'
import { DrivingRecord } from './types'
import { downloadExcel } from './utils/excel'

const DetailPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const { dateRange, handleDateRangeChange, getFormattedDates, isDateRangeValid } = useSearchDate()
    const dates = getFormattedDates()
    const { detailData, isLoading, error } = useDetailData({
        url: `${API_ENDPOINTS.LOG}/${id}`,
        startDate: dates?.startDate,
        endDate: dates?.endDate,
        enabled: isDateRangeValid,
    })

    const formattedVehicleNumber = detailData?.vehicleType.vehicleNumber
        ? addSpaceVehicleNumber(detailData.vehicleType.vehicleNumber)
        : ''

    const {
        isConfirmModalOpen,
        confirmModalMessage,
        closeConfirmModal,
        showConfirmMessage,
        isAlertModalOpen,
        alertModalMessage,
        closeAlertModal,
        showAlertMessage,
    } = useDetailModal()

    const handleExcelButtonClick = async () => {
        try {
            await downloadExcel(detailData)
        } catch (error) {
            console.error('엑셀 다운로드 에러', error)
            showAlertMessage('엑셀 다운로드에 실패했습니다')
        }
    }

    const handleDeleteButtonClick = () => {
        showConfirmMessage('선택한 차량을 삭제하시겠습니까?')
    }

    const handleDeleteVehicle = async (id: number) => {
        try {
            await vehicleService.deleteVehicle(id)
            router.push('/log')
        } catch (error) {
            console.error('차량 삭제 실패', error)
            showAlertMessage('차량 삭제에 실패했습니다')
        }
    }

    const confirmDeleteVehicle = () => {
        if (!id) return
        handleDeleteVehicle(Number(id))
    }

    if (isLoading) {
        return <PageLoader />
    }
    if (error) {
        return <ErrorMessage />
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbWrapper}>
                <Breadcrumb type={'운행일지'} />
            </div>

            <ControlLayout
                control={
                    <DatePickerInput
                        locale='ko'
                        leftSection={
                            <div style={{ width: '24px', height: '24px' }}>
                                <CalendarIcon size={16} stroke={1} />
                            </div>
                        }
                        maxDate={new Date()}
                        leftSectionPointerEvents='none'
                        type='range'
                        size='lg'
                        radius='xl'
                        placeholder='과세기간 범위 선택'
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        valueFormat='YYYY-MM-DD'
                        clearable={true}
                        styles={{
                            input: {
                                width: '300px',
                                height: '48px',
                                fontSize: '16px',
                                color: '#222222',
                            },
                        }}
                    />
                }
                primaryButton={
                    <div className={styles.excelButtonWrapper}>
                        <ExcelButton onClick={handleExcelButtonClick} />
                    </div>
                }
                secondaryButton={
                    true ? (
                        <div className={styles.deleteButtonWrapper}>
                            <RoundButton color='primary' size='small' onClick={handleDeleteButtonClick}>
                                <div className={styles.deleteButton}>
                                    <Image src='/icons/white-trash-icon.svg' alt='add' width={18} height={18} />
                                    차량삭제
                                </div>
                            </RoundButton>
                        </div>
                    ) : (
                        <></>
                    )
                }
            />
            <Modal
                isOpen={isConfirmModalOpen}
                message={confirmModalMessage as ModalMessageType}
                variant={{ variant: 'confirm', confirmButton: '확인', cancelButton: '취소' }}
                onClose={closeConfirmModal}
                onConfirm={confirmDeleteVehicle}
            />
            <Modal
                isOpen={isAlertModalOpen}
                message={alertModalMessage as ModalMessageType}
                variant={{ variant: 'alert', confirmButton: '확인' }}
                onClose={closeAlertModal}
            />
            <div className={styles.tableWrapper}>
                <table>
                    <tbody>
                        <tr>
                            <th scope='row' className={styles.tableHeader}>
                                자동차 등록번호
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                차량종류
                            </th>
                        </tr>
                        <tr>
                            <td className={styles.tableCell}>{formattedVehicleNumber}</td>
                            <td className={styles.tableCell}>{detailData?.vehicleType.vehicleModel}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <th scope='row' rowSpan={3} className={styles.tableHeader}>
                                과세기간
                            </th>
                            <td rowSpan={3} className={styles.tableCell}>
                                {detailData?.taxStartPeriod} - {detailData?.taxEndPeriod}
                            </td>
                            <th scope='row' rowSpan={2} className={styles.tableHeader}>
                                업무승용차 운행기록부
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                상호명
                            </th>
                            <td className={styles.tableCell}>{detailData?.businessInfo.businessName}</td>
                        </tr>
                        <tr>
                            <th scope='row' className={styles.tableHeader}>
                                사업자 등록번호
                            </th>
                            <td className={styles.tableCell}>{detailData?.businessInfo.businessRegistrationNumber}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <th scope='row' rowSpan={2} className={styles.tableHeader}>
                                사용일자
                            </th>
                            <th scope='row' colSpan={8} className={styles.tableHeader}>
                                운행내역
                            </th>
                        </tr>
                        <tr>
                            <th scope='row' className={styles.tableHeader}>
                                부서
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                성명
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                전 계기판 거리
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                후 계기판 거리
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                주행거리
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                출근용
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                일반업무용
                            </th>
                            <th scope='row' className={styles.tableHeader}>
                                비고
                            </th>
                        </tr>
                        {detailData?.records.map((data: DrivingRecord) => {
                            const isCommutePurpose = data.drivingInfo.businessDrivingDetails.usePurpose === 'COMMUTE'
                            const drivingDistance = data.drivingInfo.businessDrivingDetails.drivingDistance

                            return (
                                <tr key={data.id}>
                                    <td className={styles.tableCell}>{data.usageDate}</td>
                                    <td className={styles.tableCell}>{data.user.departmentName}</td>
                                    <td className={styles.tableCell}>{data.user.name}</td>
                                    <td className={styles.tableCell}>
                                        {data.drivingInfo.drivingBefore.toLocaleString('ko-KR')}km
                                    </td>
                                    <td className={styles.tableCell}>
                                        {data.drivingInfo.drivingAfter.toLocaleString('ko-KR')}km
                                    </td>
                                    <td className={styles.tableCell}>
                                        {data.drivingInfo.totalDriving.toLocaleString('ko-KR')}km
                                    </td>
                                    <td className={styles.tableCell}>
                                        {isCommutePurpose ? drivingDistance.toLocaleString('ko-KR') + 'km' : '0km'}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {!isCommutePurpose ? drivingDistance.toLocaleString('ko-KR') + 'km' : '0km'}
                                    </td>
                                    <td className={styles.tableCell}>{data.drivingInfo.notes}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <th scope='row' className={styles.tableHeader}>
                                과세기간 총 주행 거리
                            </th>
                            <td className={styles.tableCell}>
                                {detailData?.taxPeriodDistance.toLocaleString('ko-KR')}km
                            </td>
                            <th scope='row' className={styles.tableHeader}>
                                과세기간 업무용 사용 거리
                            </th>
                            <td className={styles.tableCell}>
                                {detailData?.taxPeriodBusinessDistance.toLocaleString('ko-KR')}km
                            </td>
                            <th scope='row' className={styles.tableHeader}>
                                업무사용비율
                            </th>
                            <td className={styles.tableCell}>{detailData?.businessUseRatio}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <LinkButton href={`/log/${id}/daily`} className={styles.linkButton}>
                일별 및 시간별 조회
            </LinkButton>
        </div>
    )
}

export default DetailPage
