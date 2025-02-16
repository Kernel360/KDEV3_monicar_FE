import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    height: '100vh',
    padding: '40px 44px',
    overflowY: 'auto',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '50px 20px',
        },
    },
})

export const breadcrumbsWrapper = style({
    minWidth: '150px',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'none',
        },
    },
})

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const searchInputWrapper = style({
    width: '300px',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            width: '100%',
        },
    },
})

export const excelButtonWrapper = style({
    width: '90px',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'none',
        },
    },
})

export const linkButton = style({
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
    fontWeight: vars.fontWeights.bold,
    width: '110px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '0px 6px',
    borderRadius: '30px',
    border: `1px solid ${vars.colors.gray[200]}`,
    boxShadow: `0px 4px 4px 0px ${vars.colors.shadow[100]}`,
    ':hover': {
        opacity: vars.opacity[80],
    },
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            display: 'none',
        },
    },
})

export const contents = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    marginTop: '20px',
})

export const pagination = style({
    marginTop: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            marginBottom: '60px',
        },
    },
})
