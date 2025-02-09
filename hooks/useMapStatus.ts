import { useState } from 'react'

import { MAP_CONFIG } from '@/constants/map'
import { getBoundedMapStatus } from '@/lib/utils/map'
import { LatLng, MapState } from '@/types/map'

export const useMapStatus = (map: kakao.maps.Map | null | undefined) => {
    const [mapState, setCurrentMapState] = useState<MapState>({
        level: MAP_CONFIG.INIT.level,
        center: MAP_CONFIG.INIT.center,
        swCoord: null,
        neCoord: null,
    })

    const updateMapStatus = () => {
        if (!map) return

        setCurrentMapState(getBoundedMapStatus(map))
    }

    const controlMapStatus = (level: number, location: LatLng) => {
        if (!map) return

        map.setCenter(new kakao.maps.LatLng(location.lat, location.lng))
        map.setLevel(level)

        setCurrentMapState(getBoundedMapStatus(map))
    }

    return { mapState, updateMapStatus, controlMapStatus }
}
