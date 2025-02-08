import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: `1px solid ${vars.colors.gray[200]}`,
    marginBottom: '24px',
})

export const title = style({
    color: vars.colors.black,
    fontWeight: vars.fontWeights.bold,
    fontSize: vars.fontSizes.xlarge,
})

export const createdAt = style({
    color: vars.colors.gray[600],
    fontSize: vars.fontSizes.small,
})

export const imageWrapper = style({
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
})

export const content = style({
    color: vars.colors.black,
    whiteSpace: 'pre-line',
    lineHeight: 1.5,
})
