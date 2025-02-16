import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/theme.css'

export const title = style({
    fontWeight: vars.fontWeights.bold,
    color: vars.colors.gray[800],
    margin: '10px',
    selectors: {
        '.dark &': {
            color: vars.colors.gray[200],
        },
    },
})

export const messageContainer = style({
    display: 'flex',
    gap: '12px',
    position: 'relative',
})

export const messageList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100%',
    padding: '24px',
})

export const messageWrapper = style({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    fontWeight: vars.fontWeights.extraBold,
    color: vars.colors.gray[600],
    selectors: {
        '.dark &': {
            color: vars.colors.gray[400],
        },
    },
})

export const message = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
})

export const activeMessageWrapper = style({
    color: vars.colors.primary,
    fontSize: vars.fontSizes.mediumPlus,
    transition: 'transform 0.7s ease',
    transform: 'scale(1.1)',
    selectors: {
        '.dark &': {
            color: vars.colors.primary,
        },
    },
})

export const deactiveMessageWrapper = style({
    transition: 'transform 0.7s ease-in-out',
    transform: 'scale(1)',
})

export const distance = style({
    marginLeft: '8px',
    fontSize: vars.fontSizes.small,
    background: vars.colors.yellow[100],
    color: vars.colors.yellow[200],
    border: `solid 1px ${vars.colors.yellow[200]}`,
    borderRadius: '6px',
    padding: '0px 4px',
})
