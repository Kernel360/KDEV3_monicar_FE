import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'
import { mediaQuery } from '@/styles/utils.css'

export const navbar = style({
    width: '256px',
    height: '100vh',
    padding: '44px 18px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: vars.colors.white,
    borderRight: `1px solid ${vars.colors.gray[200]}`,

    '@media': {
        [mediaQuery.mobile]: {
            position: 'fixed',
            bottom: 0,
            height: 'auto',
            width: '100%',
            zIndex: vars.zIndex.default,
            padding: '12px 12px',
            alignItems: 'center',
        },
    },
})

export const navContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
})

export const logoWrapper = style({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    '@media': {
        [mediaQuery.mobile]: {
            display: 'none',
        },
    },
})

export const logoInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
})

export const userEmail = style({
    fontSize: vars.fontSizes.small,
    color: vars.colors.description,
})

export const navList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media': {
        [mediaQuery.mobile]: {
            flexDirection: 'row',
            width: '100%',
            gap: '50px',
        },
    },
})

export const sideFooter = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media': {
        [mediaQuery.mobile]: {
            display: 'none',
        },
    },
})

export const logoutButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    borderRadius: '4px',
    color: vars.colors.black,
    ':hover': {
        backgroundColor: vars.colors.gray[50],
    },
    '@media': {
        [mediaQuery.mobile]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            textAlign: 'center',
            padding: '4px 0',
            fontSize: vars.fontSizes.xsmall,
            width: '100%',
        },
    },
})

export const themeControl = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
})

export const themeInfo = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
})
