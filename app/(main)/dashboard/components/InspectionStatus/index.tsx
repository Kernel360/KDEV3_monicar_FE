import * as styles from './styles.css'

type StatusType = 'required' | 'scheduled' | 'inProgress' | 'completed'
type IconType = 'bell' | 'alert' | 'button' | 'check'

interface InspectionStatusModel {
    status: StatusType
    icon: React.ReactNode
    text: string
    iconType: IconType
}

interface InspectionStatusProps {
    inspectionStatusData: InspectionStatusModel[]
}

const InspectionStatus = ({ inspectionStatusData }: InspectionStatusProps) => {
    return (
        <div className={styles.container}>
            {inspectionStatusData.map((data) => (
                <div
                    key={data.status}
                    className={`${styles.statusCard({
                        status: data.status,
                    })} ${styles.mobileStatusCard}`}
                >
                    <div className={styles.mobileStatusWrapper}>
                        <div className={styles.iconWrapper[data.iconType]}>
                            <div className={styles.icon}>{data.icon}</div>
                        </div>
                        <div className={styles.statusText}>{data.text}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InspectionStatus
