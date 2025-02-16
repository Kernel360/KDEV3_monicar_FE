import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    display: 'flex',
    gap: '60px',
    padding: '20px 50px',
    border: `1px solid ${vars.colors.gray[300]}`,

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '24px',
            gap: '46px',
        },
    },
})

export const ringProgressWrapper = style({
    display: 'flex',
    alignItems: 'center',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'none',
        },
    },
})

export const inspectionStatusItem = style({
    display: 'flex',
    backgroundColor: vars.colors.white,
    flexDirection: 'column',
    gap: '12px',
    color: vars.colors.gray[800],
    fontWeight: vars.fontWeights.bold,
    flex: 1,

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            fontSize: vars.fontSizes.small,
            padding: '0px',
            gap: '20px',
        },
    },
})
