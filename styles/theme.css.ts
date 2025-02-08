import { createGlobalTheme } from '@vanilla-extract/css'

import { FONT_WEIGHT } from '@/styles/font.css'

export const breakPoints = {
    mobile: '1024',
    desktop: '1280',
}

export const colors = {
    primary: '#ff385c',
    secondaryPrimary: '#f6475f', // 라이트모드
    secondary: '#5856D6',
    white: '#ffffff',
    black: '#222222', // 기본 텍스트 색상
    dashboard: '#F9F9F9',
    dark: '#121212', // 다크모드 배경 색상
    description: '#6b7280',
    error: '#c13515', // 에러 색상
    red: '#df0404', // 레드 뱃지색상 ##
    pink: {
        100: '#fbf0f3', // 핑크 뱃지 배경 색상 ##
        200: '#fae3e6', // 차량현황 알림 배경 색상 ##
        300: '#ffe9e9', // 레드 뱃지 배경 색상 ##
        400: '#f6d7df', // 차량현황 색상
        500: '#fdced4', // 클러스트링 색상
        600: '#d03660', // 핑크 뱃지 색상 ##
        700: '#cf6b81', // 차량현황 알림 아이콘 색상 ##
    },
    yellow: {
        100: '#fdf4e0', // 차량현황 알림 배경 색상 ##
        200: '#ed9684', // 차량현황 알림 아이콘 색상
    },
    green: {
        100: '#e1fbe8', // 차량현황 알림 배경 색상 ##
        200: '#a6e7d8', // 그린 뱃지 배경 색상 ##
        300: '#6dc271', // 차량현황 알림 아이콘 색상 ##
        400: '#00b087', // 그린 뱃지 색상 ##
        500: '#008a85', // 차량현황 색상
    },
    blue: '#004cc4',
    purple: {
        100: '#f2e9fd',
        200: '#ad8cdb',
    },
    gray: {
        50: '#f7f7f7', // 호버 색상
        100: '#f6f6f6', // 테이블 배경 색상
        200: '#ebebeb', // border 색상
        300: '#dddddd', // 테이블 선 색상
        400: '#d3d3d3',
        500: '#c2c2c2',
        600: '#b0b0b0', // 스크롤 색상
        700: '#717171',
        800: '#5e5e5e',
    },
    transparent: {
        500: '#ffffff50',
        800: '#ffffff80',
    },
    shadow: {
        100: '#00000010',
        200: '#00000020',
        400: '#00000040',
        500: '#00000050',
        800: '#00000080',
    },
}

export const fontSizes = {
    xsmall: '0.75rem', // 12px
    small: '0.875rem', // 14px
    medium: '1rem', // 16px
    mediumPlus: '1.125rem', // 18px
    large: '1.25rem', // 20px
    xlarge: '1.5rem', // 24px
    xxlarge: '2.5rem', // 40px
}

export const fontWeights = {
    light: FONT_WEIGHT.light,
    regular: FONT_WEIGHT.light,
    bold: FONT_WEIGHT.bold,
    extraBold: FONT_WEIGHT.extraBold,
}

export const zIndex = {
    modal: '50',
    overlay: '40',
    dropdown: '30',
    header: '20',
    four: '4',
    third: '3',
    second: '2',
    default: '1',
    below: '-1',
}

const opacity = {
    80: '0.8',
    50: '0.5',
}

export const vars = createGlobalTheme(':root', {
    breakPoints,
    colors,
    fontSizes,
    fontWeights,
    zIndex,
    opacity,
})
