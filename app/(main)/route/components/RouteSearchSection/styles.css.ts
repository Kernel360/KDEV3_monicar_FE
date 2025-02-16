import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const accordion = style({
    width: '390px',
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    gap: '12px',
    flexDirection: 'column',
    borderRadius: '12px',
    zIndex: vars.zIndex.dropdown,
    overflow: 'hidden',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            width: 'calc(100% - 24px)',
            left: '12px',
        },
    },
})

export const container = style({
    padding: '16px',
    display: 'flex',
    gap: '24px',
    flexDirection: 'column',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '12px',
            gap: '18px',
        },
    },
})

export const bottomSection = style({
    display: 'flex',
    gap: '24px',
    flexDirection: 'column',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            gap: '18px',
        },
    },
})

export const searchInputStyle = style({
    borderRadius: '8px',
    boxShadow: 'none',
})
