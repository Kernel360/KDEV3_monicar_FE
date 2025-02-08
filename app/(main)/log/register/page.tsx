'use client'

import { Select } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Breadcrumb from '@/components/common/Breadcrumb'
import SquareButton from '@/components/common/Button/SquareButton'
import ErrorMessage from '@/components/common/ErrorMessage'
import BaseInput from '@/components/common/Input/BaseInput'
import SearchInput from '@/components/common/Input/SearchInput'
import Message from '@/components/common/Message'
import Modal from '@/components/common/Modal'
import { ModalMessageType } from '@/components/common/Modal/types'
import PageLoader from '@/components/common/PageLoader'
import { useModal } from '@/hooks/useModal'
import { vehicleService } from '@/lib/apis/vehicle'
import {
    handleDrivingDistanceKeyPress,
    isValidVehicleNumberFormat,
    validateDrivingDistance,
} from '@/lib/utils/validation'
import { CalendarIcon } from '@/public/icons'

import '@mantine/dates/styles.css'
import 'dayjs/locale/ko'
import VehicleRegisterForm from './components/VehicleRegisterForm'
import * as styles from './styles.css'
import { VehicleTypeModel } from './types'

const RegisterPage = () => {
    const [vehicleType, setVehicleType] = useState<VehicleTypeModel[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [value, setValue] = useState<Date | null>(null)
    const [vehicleNumber, setVehicleNumber] = useState<string>('')
    const [vehicleTypeId, setVehicleTypeId] = useState<number>()
    const [deliveryDate, setDeliveryDate] = useState<string | null>(null)
    const [drivingDistance, setDrivingDistance] = useState<number>()
    const { isModalOpen, message, openModalWithMessage, closeModal } = useModal()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const getVehicleType = async () => {
            try {
                setIsLoading(true)
                const vehicleType = await vehicleService.getVehicleType()
                setVehicleType(vehicleType)
            } catch (error) {
                console.error(error)
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        getVehicleType()
    }, [])

    const handleCancelButtonClick = () => {
        router.back()
    }

    const postVehicleInfo = async () => {
        if (!vehicleNumber) {
            openModalWithMessage('차량번호를 입력해주세요.')
            return
        }

        if (!vehicleTypeId) {
            openModalWithMessage('차량 종류를 선택해주세요.')
            return
        }

        if (!drivingDistance) {
            openModalWithMessage('운행거리를 입력해주세요.')
            return
        }

        if (!deliveryDate) {
            openModalWithMessage('출고일을 선택해주세요.')
            return
        }

        try {
            await vehicleService.postVehicleInfo({
                vehicleNumber,
                vehicleTypeId,
                deliveryDate,
                drivingDistance,
            })
            openModalWithMessage('차량이 성공적으로 등록되었습니다.')
            router.push('/log')
        } catch (error) {
            console.error(error)
            openModalWithMessage('차량 등록에 실패했습니다.')
        }
    }

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <ErrorMessage />
    }

    const formFields = [
        {
            id: 'vehicleNumber',
            label: '차량 번호',
            component: (
                <>
                    <SearchInput
                        icon='/icons/search-icon.svg'
                        onChange={(event) => setVehicleNumber(event.target.value)}
                        onSubmit={() => {
                            if (isValidVehicleNumberFormat(vehicleNumber)) {
                                setShowSuccessMessage(true)
                                setShowErrorMessage(false)
                            } else {
                                setShowErrorMessage(true)
                                setShowSuccessMessage(false)
                            }
                        }}
                    />
                    {showSuccessMessage && <Message message={'등록 가능한 차량번호입니다.'} isError={false} />}
                    {showErrorMessage && <Message message={'올바르지 않은 차량번호입니다.'} isError={true} />}
                </>
            ),
            isError: false,
        },
        {
            id: 'vehicleType',
            label: '차량 종류',
            component: (
                <Select
                    placeholder='차량 종류'
                    data={
                        vehicleType?.map((item) => ({
                            value: item.id.toString(),
                            label: item.vehicleName,
                        })) || []
                    }
                    onChange={(event) => {
                        setVehicleTypeId(Number(event))
                    }}
                    size='lg'
                    radius='xl'
                    checkIconPosition='right'
                />
            ),
            isError: false,
        },
        {
            id: 'mileage',
            label: '운행 거리',
            component: (
                <BaseInput
                    type='number'
                    placeholder={'0km'}
                    onChange={(event) => {
                        const value = event.target.value
                        if (validateDrivingDistance(value)) {
                            setDrivingDistance(Number(value))
                        }
                    }}
                    onKeyPress={handleDrivingDistanceKeyPress}
                />
            ),
            isError: false,
        },
        {
            id: 'releaseDate',
            label: '차량 출고',
            component: (
                <DatePickerInput
                    locale='ko'
                    rightSection={
                        <div style={{ width: '24px', height: '24px' }}>
                            <CalendarIcon size={16} stroke={1} />
                        </div>
                    }
                    rightSectionPointerEvents='none'
                    size='lg'
                    radius='xl'
                    placeholder='0000-00-00'
                    styles={{
                        input: {
                            color: '#222222',
                        },
                    }}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue)
                        setDeliveryDate(newValue ? newValue.toISOString().slice(0, 10) : null)
                    }}
                />
            ),
            isError: false,
        },
    ]

    return (
        <div className={styles.container}>
            <Breadcrumb type={'차량등록'} />
            <div className={styles.title}>차량등록📝</div>
            <div className={styles.formWrapper}>
                <VehicleRegisterForm fields={formFields} />
            </div>

            <div className={styles.buttonsWrapper}>
                <SquareButton color={'white'} onClick={handleCancelButtonClick}>
                    취소
                </SquareButton>
                <SquareButton color={'dark'} onClick={postVehicleInfo}>
                    등록
                </SquareButton>
            </div>

            <Modal
                isOpen={isModalOpen}
                message={message as ModalMessageType}
                variant={{ variant: 'alert', confirmButton: '확인' }}
                onClose={closeModal}
            />
        </div>
    )
}

export default RegisterPage
