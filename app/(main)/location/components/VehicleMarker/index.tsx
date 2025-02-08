import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

import { MARKER_IMAGE } from '@/constants/map'
import { addSpaceVehicleNumber } from '@/lib/utils/string'
import { VehicleInfoModel } from '@/types/vehicle'

import * as styles from './styles.css'

interface VehicleMarkerProps {
    vehicleInfo: VehicleInfoModel
}

const VehicleMarker = ({ vehicleInfo }: VehicleMarkerProps) => {
    const vehicleNumber = addSpaceVehicleNumber(vehicleInfo.vehicleNumber)

    return (
        <CustomOverlayMap position={vehicleInfo.coordinate}>
            <p className={styles.vehicleCard}>{vehicleNumber}</p>
            <MapMarker position={vehicleInfo.coordinate} image={MARKER_IMAGE} />
        </CustomOverlayMap>
    )
}

export default VehicleMarker
