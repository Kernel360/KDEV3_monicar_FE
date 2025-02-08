import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    // height: 0,
    flex: 1,
    backgroundColor: vars.colors.white,
    padding: '24px',
    borderRadius: '12px',
    display: 'flex',
    gap: '24px',
    flexDirection: 'column',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '0px',
            marginTop: '40px',
            gap: '16px',
        },
    },
})

export const heading = style({
    color: vars.colors.black,
    fontSize: vars.fontSizes.large,
    fontWeight: vars.fontWeights.extraBold,

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            fontSize: vars.fontSizes.mediumPlus,
            fontWeight: vars.fontWeights.bold,
        },
    },
})

export const noticeList = style({
    overflowY: 'auto',
    msOverflowStyle: 'none', // IE, Edge 레거시 브라우저용
    scrollbarWidth: 'none', // Firefox용
    '::-webkit-scrollbar': {
        display: 'none', // Chrome, Safari용
    },
})

export const noticeItem = style({
    width: '100%',
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    transition: 'transform 0.3s ease',
    ':hover': {
        transform: 'scale(1.05)',
    },
})

export const imageWrapper = style({
    width: '100px',
    height: 'auto',
    borderRadius: '12px',
    overflow: 'hidden',
})

export const image = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
})

export const contentsWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
})

export const title = style({
    fontWeight: vars.fontWeights.bold,
    color: vars.colors.black,
})

export const description = style({
    fontSize: vars.fontSizes.small,
    color: vars.colors.gray[800],
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
})
