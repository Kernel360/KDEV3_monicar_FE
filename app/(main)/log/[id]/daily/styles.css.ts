import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    width: '100%',
    height: '100vh',
    display: 'flex',
    gap: '30px',
    flexDirection: 'column',
    backgroundColor: vars.colors.dashboard,
    padding: '30px',
    selectors: {
        '.dark &': {
            backgroundColor: vars.colors.dark,
        },
    },
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            marginBottom: '70px',
        },
    },
})

export const breadcrumbsWrapper = style({
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'none',
        },
    },
})

export const contents = style({
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    gap: '30px',
    marginTop: '30px',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            flexDirection: 'column',
        },
    },
})

export const contentWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
})

export const leftSection = style({
    width: '50%',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            width: '100%',
        },
    },
})

export const rightSection = style({
    width: '50%',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            width: '100%',
        },
    },
})

export const empty = style({
    margin: '50px',
    justifyContent: 'center',
    display: 'flex',
    fontWeight: vars.fontWeights.bold,
    color: vars.colors.gray[700],
})
