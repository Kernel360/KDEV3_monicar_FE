import { style, styleVariants } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    backgroundColor: vars.colors.gray[100],
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    selectors: {
        '.dark &': {
            backgroundColor: vars.colors.gray[700],
        },
    },
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {},
    },
})

export const contents = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
})

export const vehicleNumber = style({
    fontSize: vars.fontSizes.mediumPlus,
    color: vars.colors.gray[800],
    fontWeight: vars.fontWeights.bold,
    selectors: {
        '.dark &': {
            color: vars.colors.white,
        },
    },
})

export const description = style({
    color: vars.colors.gray[600],
    selectors: {
        '.dark &': {
            color: vars.colors.gray[500],
        },
    },
})

export const button = style({
    color: vars.colors.gray[600],
})

const iconWrapperBase = style({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

export const iconWrapper = styleVariants({
    REQUIRED: [iconWrapperBase, { backgroundColor: vars.colors.pink[700] }],
    SCHEDULED: [iconWrapperBase, { backgroundColor: vars.colors.yellow[200] }],
    INPROGRESS: [iconWrapperBase, { backgroundColor: vars.colors.green[300] }],
    COMPLETED: [iconWrapperBase, { backgroundColor: vars.colors.purple[200] }],
})

export const icon = style({
    width: '24px',
    height: '24px',
})
