import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'

export const container = style({
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: vars.colors.white,
    color: vars.colors.black,
    textAlign: 'center',
    selectors: {
        '.dark &': {
            backgroundColor: vars.colors.dark,
            color: vars.colors.gray[200],
        },
    },
})

export const textWrapper = style({
    fontWeight: vars.fontWeights.extraBold,
    fontSize: vars.fontSizes.large,
})

export const dateWrapper = style({
    color: vars.colors.gray[500],
    fontSize: vars.fontSizes.small,
    selectors: {
        '.dark &': {
            color: vars.colors.white,
        },
    },
})

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
})

export const weekDays = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '12px',
    marginBottom: '8px',
    fontWeight: vars.fontWeights.extraBold,
    textAlign: 'center',
})

export const days = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '12px',
    fontWeight: vars.fontWeights.extraBold,
    textAlign: 'center',
})

export const today = style({
    width: '30px',
    height: '30px',
    backgroundColor: vars.colors.primary,
    borderRadius: '50%',
    color: vars.colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
})

export const weekend = style({
    color: vars.colors.gray[500],
})

export const weekendDate = style({
    color: vars.colors.gray[500],
})

export const divider = style({
    width: '100%',
    height: '1px',
    backgroundColor: vars.colors.gray[300],
    margin: '20px 0',
})
