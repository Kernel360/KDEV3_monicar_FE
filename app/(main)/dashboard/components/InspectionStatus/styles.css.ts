import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    gap: '20px',
    backgroundColor: vars.colors.white,
    borderRadius: '12px',
    fontWeight: vars.fontWeights.bold,
    cursor: 'pointer',
    selectors: {
        '.dark &': {
            backgroundColor: vars.colors.dark,
        },
    },
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0px',
            fontSize: vars.fontSizes.small,
            backgroundColor: 'transparent',
        },
    },
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
    bell: [iconWrapperBase, { backgroundColor: vars.colors.pink[700] }],
    alert: [iconWrapperBase, { backgroundColor: vars.colors.yellow[200] }],
    button: [iconWrapperBase, { backgroundColor: vars.colors.green[300] }],
    check: [iconWrapperBase, { backgroundColor: vars.colors.purple[200] }],
})

export const icon = style({
    width: '24px',
    height: '24px',
})

export const statusCard = recipe({
    base: {
        width: '100%',
        height: '100%',
        borderRadius: '11px',
        color: vars.colors.gray[800],
        padding: '16px',
    },
    variants: {
        status: {
            required: { backgroundColor: vars.colors.pink[200] },
            scheduled: { backgroundColor: vars.colors.yellow[100] },
            inProgress: { backgroundColor: vars.colors.green[100] },
            completed: { backgroundColor: vars.colors.purple[100] },
        },
    },
})

export const mobileStatusCard = style({
    transition: 'transform 0.3s ease',
    ':hover': {
        transform: 'scale(1.05)',
    },
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '8px',
        },
    },
})

export const statusText = style({
    marginTop: '54px',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            marginTop: '10px',
            textAlign: 'center',
        },
    },
})

export const mobileStatusWrapper = style({
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
})
