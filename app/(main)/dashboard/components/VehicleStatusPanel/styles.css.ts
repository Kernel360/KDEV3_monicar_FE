import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    display: 'flex',
    backgroundColor: vars.colors.white,
    borderRadius: '12px',
    flexDirection: 'column',
    padding: '24px',
    gap: '12px',
    color: vars.colors.gray[800],
    fontWeight: vars.fontWeights.bold,

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            fontSize: vars.fontSizes.small,
            padding: '0px',
            gap: '20px',
            backgroundColor: 'transparent',
        },
    },
})

export const titleWrapper = style({
    display: 'none',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'flex',
            fontSize: vars.fontSizes.mediumPlus,
            color: vars.colors.black,
            margin: '12px 0px',
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
