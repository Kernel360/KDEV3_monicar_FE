'use client'

// import { CustomOverlayMap } from 'react-kakao-maps-sdk'

// import CustomMarker from '@/app/(main)/location/components/CustomMarker'
import { useEffect, useRef, useState } from 'react'
import { CustomOverlayMap } from 'react-kakao-maps-sdk'

import CustomMarker from '@/app/(main)/location/components/CustomMarker'
import VehicleDetailsCard from '@/app/(main)/location/components/VehicleDetailCard'
import VehicleMarker from '@/app/(main)/location/components/VehicleMarker'
import Map from '@/components/domain/map/Map'
import { useMapStatus } from '@/hooks/useCurrentMapStatus'
// import { clusterService } from '@/lib/apis/cluster'
import { clusterService } from '@/lib/apis/cluster'
import { LatLng } from '@/types/location'
import { ClusterInfoModel, MapState } from '@/types/map'
import { VehicleDetailModel, VehicleInfoModel } from '@/types/vehicle'

interface MapSectionProps {
    mapState?: MapState
    vehicleInfo: VehicleInfoModel
    vehicleDetail: VehicleDetailModel
    isVehicleVisible: boolean
    isDetailCardVisible: boolean
    onClick?: (location: LatLng, level: number) => void
    onVehicleClose: () => void
    onDetailCardClose: () => void
}

const MapSection = ({
    mapState,
    vehicleInfo,
    vehicleDetail,
    isVehicleVisible,
    isDetailCardVisible,
    // onVehicleClose,
    onDetailCardClose,
}: MapSectionProps) => {
    const [clusterInfo, setClusterInfo] = useState<ClusterInfoModel[]>([])
    // const [clusterDetailInfo, setClusterDetailInfo] = useState<VehicleInfoModel | null>(null)
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const mapRef = useRef<kakao.maps.Map>(null)

    const { currentMapState, updateMapStatus } = useMapStatus(mapRef.current)

    useEffect(() => {
        if (!isMapLoaded) return

        updateMapStatus()
    }, [isMapLoaded])

    useEffect(() => {
        if (!isMapLoaded || !currentMapState) return
        const getClusterInfo = async () => {
            // await clusterService.getClusterInfo(currentMapState)
            const clusterInfo: ClusterInfoModel[] = await clusterService.getClusterInfo(currentMapState)
            // const clusterDetailInfo = await clusterService.getClusterDetailInfo(currentMapState)
            setClusterInfo(clusterInfo)
            // setClusterDetailInfo(clusterDetailInfo)
            // console.log(clusterDetailInfo)
        }

        getClusterInfo()
    }, [isMapLoaded, currentMapState])

    console.log(clusterInfo)
    // const handleVehicleDetailCardClose = () => {
    //     setIsVehicleDetailsVisible(false)
    // }

    // console.log(isVehicleVisible, shouldShowVehicleDetailCard)

    return (
        <Map
            ref={mapRef}
            center={mapState?.center}
            zoom={mapState?.level}
            onLoad={() => setIsMapLoaded(true)}
            onMapStatusChanged={updateMapStatus}
        >
            {/* {ClusteringData.result.map((loc, index) => {
                return (
                    <CustomOverlayMap key={index} position={loc.coordinate}>
                        <CustomMarker count={loc.count} onClick={() => onClick(loc.coordinate, mapState.level - 1)} />
                    </CustomOverlayMap>
                )
            })} */}
            {clusterInfo.map((point, index) => {
                return (
                    <CustomOverlayMap key={index} position={point}>
                        <CustomMarker
                            count={point.count}
                            // onClick={() => onClick(point. mapState.level - 1)}
                        />
                    </CustomOverlayMap>
                )
            })}
            {/* {clusterDetailInfo && <VehicleMarker vehicleInfo={clusterDetailInfo} />} */}
            {isVehicleVisible && <VehicleMarker vehicleInfo={vehicleInfo} />}
            {isDetailCardVisible && (
                <VehicleDetailsCard vehicleDetails={vehicleDetail} onCloseButtonClick={onDetailCardClose} />
            )}
        </Map>
    )
}

export default MapSection
