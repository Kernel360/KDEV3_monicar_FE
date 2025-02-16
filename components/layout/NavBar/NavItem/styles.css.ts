import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'
import { mediaQuery } from '@/styles/utils.css'

export const navItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    borderRadius: '4px',
    color: vars.colors.black,
    ':hover': {
        backgroundColor: vars.colors.gray[50],
    },
    selectors: {
        '.dark &': {
            color: vars.colors.white,
        },
        '.dark &:hover': {
            backgroundColor: vars.colors.gray[700],
        },
    },
    '@media': {
        [mediaQuery.mobile]: {
            flexDirection: 'column',
            gap: '6px',
            textAlign: 'center',
            padding: '8px 20px',
            fontSize: vars.fontSizes.xsmall,
        },
    },
})

export const currentItem = style({
    color: vars.colors.primary,
    fontWeight: vars.fontWeights.bold,
    backgroundColor: vars.colors.gray[50],
    selectors: {
        '.dark &': {
            color: vars.colors.white,
            backgroundColor: vars.colors.gray[700],
            fontWeight: vars.fontWeights.bold,
        },
    },
})
