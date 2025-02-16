import { globalStyle } from '@vanilla-extract/css'

import { FONT_WEIGHT } from '@/styles/font.css'
import { vars } from '@/styles/theme.css'

globalStyle('body', {
    fontFamily: 'airbnbCereal, nanumSquareNeo, sans-serif !important',
    fontWeight: FONT_WEIGHT.regular,
    backgroundColor: vars.colors.white,
    color: vars.colors.black,
})

globalStyle('body.dark', {
    backgroundColor: vars.colors.dark,
    color: vars.colors.white,
})

globalStyle('a', {
    color: 'inherit',
    textDecoration: 'none',
})

globalStyle('button', {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
})

globalStyle('h1, h2, h3, h4, h5, h6', {
    margin: 0,
    padding: 0,
    font: 'inherit',
    verticalAlign: 'baseline',
})

globalStyle('button, nav, a', {
    userSelect: 'none',
})

globalStyle('::placeholder', {
    color: vars.colors.gray[600],
    userSelect: 'none',
})
