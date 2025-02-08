import { useState } from 'react'

import { INITIAL_MAP_STATE } from '@/constants/map'
import { getBoundedMapStatus } from '@/lib/utils/map'
import { MapState } from '@/types/map'

export const useMapStatus = (map: kakao.maps.Map | null) => {
    const [currentMapState, setCurrentMapState] = useState<MapState>({
        level: 7,
        center: INITIAL_MAP_STATE.center,
        swCoord: null,
        neCoord: null,
    })

    const updateMapStatus = () => {
        if (!map) return

        setCurrentMapState(getBoundedMapStatus(map))
    }

    return { currentMapState, updateMapStatus }
}
