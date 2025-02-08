'use client'

import { useDisclosure } from '@mantine/hooks'
import dynamic from 'next/dynamic'
import { ChangeEventHandler, useState } from 'react'

import VehicleStatusPanel from '@/app/(main)/location/components/VehicleStatusPanel'
import SearchInput from '@/components/common/Input/SearchInput'
import Modal from '@/components/common/Modal'
import { ModalMessageType } from '@/components/common/Modal/types'
import { ZOOM_LEVEL } from '@/constants/map'
import { useMapControl } from '@/hooks/useMapControl'
import { useVehicleLocationSearch } from '@/hooks/useVehicleLocationSearch'
import { vehicleService } from '@/lib/apis'
import { VehicleDetail, VehicleLocation } from '@/types/vehicle'

import * as styles from './styles.css'

const MapSection = dynamic(() => import('./components/MapSection'), {
    ssr: false,
})

const LocationPage = () => {
    const [inputValue, setInputValue] = useState('')
    const [vehicleDetail, setVehicleDetail] = useState<VehicleDetail>()

    const { vehicleInfo, isModalOpen, message, closeModal, searchVehicleWithNumber } =
        useVehicleLocationSearch(inputValue)
    const [isSearchedVehicleVisible, { open: showSearchedVehicle, close: hideSearchedVehicle }] = useDisclosure()
    const [isVehicleDetailCardVisible, { open: showVehicleDetailCard, close: hideVehicleDetailCard }] = useDisclosure()

    const { mapState, updateMapLocation } = useMapControl()

    const handleInputSubmit = async () => {
        const vehicleInfo = await searchVehicleWithNumber()

        if (!vehicleInfo) return

        const { vehicleId } = vehicleInfo as VehicleLocation
        const vehicleDetail = await vehicleService.getVehicleDetail(vehicleId)

        updateMapLocation(
            {
                lat: vehicleInfo.coordinate.lat,
                lng: vehicleInfo.coordinate.lng,
            },
            ZOOM_LEVEL.SINGLE_VEHICLE,
        )

        setVehicleDetail(vehicleDetail)
        showSearchedVehicle()
        showVehicleDetailCard()
        setInputValue('')
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div className={styles.container}>
            <MapSection
                mapState={mapState}
                vehicleInfo={vehicleInfo as VehicleLocation}
                vehicleDetail={vehicleDetail as VehicleDetail}
                isSearchedVehicleVisible={isSearchedVehicleVisible}
                isDetailCardVisible={isVehicleDetailCardVisible}
                onVehicleClose={hideSearchedVehicle}
                onDetailCardClose={hideVehicleDetailCard}
            />
            <div className={styles.searchInputWrapper}>
                <SearchInput
                    icon='/icons/search-icon.svg'
                    value={inputValue}
                    onChange={handleInputChange}
                    onSubmit={handleInputSubmit}
                />
            </div>
            <VehicleStatusPanel />

            <Modal
                isOpen={isModalOpen}
                message={message as ModalMessageType}
                variant={{ variant: 'alert', confirmButton: '확인' }}
                onClose={closeModal}
            />
        </div>
    )
}

export default LocationPage
