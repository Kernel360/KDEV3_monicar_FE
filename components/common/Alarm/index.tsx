import { useState } from 'react'

import { useSubscribe } from '@/hooks/useSubscribe'

import InspectionStatusAlarm from '../InspectionStatusAlarm'

const Alarm = () => {
    const { alarm, error } = useSubscribe()
    const [isOpen] = useState(true)

    if (error) {
        console.error('SubscribeAlert 에러', error)
    }

    return (
        <div>
            <InspectionStatusAlarm inspectionStatusData={alarm} isOpen={isOpen}></InspectionStatusAlarm>
        </div>
    )
}

export default Alarm
