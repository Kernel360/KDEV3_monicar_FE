import { style } from '@vanilla-extract/css'

import { breakPoints } from '@/styles/theme.css'

export const container = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: '24px 0px',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '16px',
            borderRadius: '8px',
            margin: '8px 0',
        },
    },
})

export const list = style({
    display: 'flex',
    width: '100%',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            gap: '8px',
        },
    },
})

export const itemWrapper = style({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            textAlign: 'left',
        },
    },
})

export const icon = style({
    width: '24px',
    height: '24px',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'none',
        },
    },
})
