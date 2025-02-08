'use client'
import { Group, Pagination } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Breadcrumb from '@/components/common/Breadcrumb'
import ExcelButton from '@/components/common/Button/ExcelButton'
import LinkButton from '@/components/common/Button/LinkButton'
import ControlLayout from '@/components/common/ControlLayout'
import ErrorMessage from '@/components/common/ErrorMessage'
import SearchInput from '@/components/common/Input/SearchInput'
import Modal from '@/components/common/Modal'
import { ModalMessageType } from '@/components/common/Modal/types'
import PageLoader from '@/components/common/PageLoader'
import ListHeader from '@/components/domain/vehicle/ListHeader'
import { LOG_TITLES } from '@/constants/listHeader'
import { useModal } from '@/hooks/useModal'
import { validateSearchTerm } from '@/lib/utils/validation'

import ListItem from './components/ListItem/index'
import { useLogData } from './hooks/useLogData'
import * as styles from './styles.css'
import { downloadExcel } from './utils/excel'

const LogPage = () => {
    const router = useRouter()
    const [activePage, setActivePage] = useState(1)
    const [searchVehicleNumber, setSearchVehicleNumber] = useState<string>()
    const [searchTerm, setSearchTerm] = useState('')
    const { isModalOpen, message, closeModal, openModalWithMessage } = useModal()
    const { logData, isLoading, error } = useLogData(activePage, searchVehicleNumber)

    const handleExcelButtonClick = async () => {
        try {
            await downloadExcel(searchTerm)
        } catch (error) {
            console.error('엑셀 다운로드 에러', error)
            openModalWithMessage('엑셀 다운로드에 실패했습니다')
        }
    }

    const handleItemClick = (id: number) => {
        router.push(`/log/${id}`)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSearchVehicleNumber = () => {
        if (!searchTerm) {
            setSearchVehicleNumber(undefined)
            return
        }

        const validation = validateSearchTerm(searchTerm)

        if (!validation.isValid) {
            openModalWithMessage(validation.message!)
            return
        }

        setSearchVehicleNumber(validation.value)
        setActivePage(1)
    }

    if (isLoading) {
        return <PageLoader />
    }
    if (error) {
        return <ErrorMessage />
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.breadcrumbWrapper}>
                    <Breadcrumb type={'운행기록'} />
                </div>

                <ControlLayout
                    control={
                        <div className={styles.searchInputWrapper}>
                            <SearchInput
                                icon='/icons/search-icon.svg'
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onSubmit={handleSearchVehicleNumber}
                            />
                        </div>
                    }
                    primaryButton={
                        <div className={styles.excelButtonWrapper}>
                            <ExcelButton onClick={handleExcelButtonClick} />
                        </div>
                    }
                    secondaryButton={
                        <LinkButton href={'/log/register'}>
                            <div className={styles.linkButton}>
                                <Image src='/icons/white-add-icon.svg' alt='add' width={18} height={18} />
                                차량등록
                            </div>
                        </LinkButton>
                    }
                />
                <Modal
                    isOpen={isModalOpen}
                    message={message as ModalMessageType}
                    variant={{ variant: 'alert', confirmButton: '확인' }}
                    onClose={closeModal}
                />
            </div>

            <div className={styles.contents}>
                <ListHeader headerTitles={LOG_TITLES} />
                {logData?.content.map((log) => (
                    <ListItem key={log.id} data={log} onClick={() => handleItemClick(log.id)} />
                ))}
            </div>

            <div className={styles.pagination}>
                <Pagination.Root
                    total={logData?.totalPages || 1}
                    value={activePage}
                    onChange={setActivePage}
                    color='#ff385c'
                    boundaries={0}
                >
                    <Group gap={5} justify='center'>
                        <Pagination.First />
                        <Pagination.Previous />
                        <Pagination.Items />
                        <Pagination.Next />
                        <Pagination.Last />
                    </Group>
                </Pagination.Root>
            </div>
        </div>
    )
}

export default LogPage
