import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'

export const accordion = style({
    backgroundColor: vars.colors.white,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    zIndex: vars.zIndex.dropdown,
    selectors: {
        '.dark &': {
            backgroundColor: vars.colors.gray[200],
        },
    },
})

export const baseControl = style({
    width: '100%',
    padding: '16px',
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
    fontSize: vars.fontSizes.small,
    fontWeight: vars.fontWeights.bold,
})

export const primaryControl = style({
    color: vars.colors.white,
    backgroundColor: vars.colors.primary,
})

export const secondaryControl = style({
    color: vars.colors.gray[800],
    backgroundColor: vars.colors.gray[200],
})
