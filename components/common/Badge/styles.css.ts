import { style, styleVariants } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'

import { BADGE_SHAPE, OPERATION_STATUS, VEHICLE_ROLE } from './constants'

export const base = style({
    padding: '4px 0',
    border: '1.5px solid',
})

export const shape = styleVariants({
    [BADGE_SHAPE.RECTANGLE]: {
        paddingLeft: '12px',
        paddingRight: '12px',
        borderRadius: '4px',
    },
    [BADGE_SHAPE.CIRCLE]: {
        paddingLeft: '16px',
        paddingRight: '16px',
        fontWeight: 'bold',
        borderRadius: '14px',
    },
})

const redStyle = {
    color: vars.colors.red,
    backgroundColor: vars.colors.pink[300],
}

const pinkStyle = {
    color: vars.colors.pink[600],
    backgroundColor: vars.colors.pink[100],
}

const greenStyle = {
    color: vars.colors.green[500],
    backgroundColor: vars.colors.green[200],
}

export const variant = styleVariants({
    [OPERATION_STATUS.IN_OPERATION]: pinkStyle,
    [OPERATION_STATUS.NOT_DRIVEN]: greenStyle,
    [OPERATION_STATUS.NOT_REGISTERED]: redStyle,
    [VEHICLE_ROLE.GENERAL]: pinkStyle,
    [VEHICLE_ROLE.COMMUTE]: greenStyle,
})
