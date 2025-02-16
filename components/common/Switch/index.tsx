import { Switch as MantineSwitch } from '@mantine/core'

import { vars } from '@/styles/theme.css'

interface SwitchProps {
    size?: string
    checked?: boolean
    onChange?: (checked: boolean) => void
}

const Switch = ({ size = 'md', checked, onChange, ...props }: SwitchProps) => {
    const handleClick = () => {
        if (onChange) {
            onChange(!checked)
        }
    }
    return <MantineSwitch size={size} color={vars.colors.primary} checked={checked} onClick={handleClick} {...props} />
}

export default Switch
