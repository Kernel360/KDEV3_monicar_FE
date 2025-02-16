import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    display: 'flex',
    gap: '60px',
    padding: '20px 50px',
    border: `1px solid ${vars.colors.gray[300]}`,
    borderRadius: '6px',
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
    selectors: {
        '.dark &': {
            backgroundColor: vars.colors.dark,
        },
    },
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            fontSize: vars.fontSizes.small,
            padding: '0px',
            gap: '20px',
        },
    },
})

export const statusItem = style({
    display: 'flex',
    alignItems: 'center',
})

export const title = style({
    flex: 1,
})

export const progressWrapper = style({
    width: '400px',
})

export const circle = style({
    width: '16px',
    height: '16px',
    marginRight: '16px',
    borderRadius: '50%',
})

export const count = style({
    marginLeft: '8px',
    fontSize: vars.fontSizes.mediumPlus,
    fontWeight: vars.fontWeights.bold,
})
