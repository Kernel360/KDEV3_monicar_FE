import { style } from '@vanilla-extract/css'

import { breakPoints, vars } from '@/styles/theme.css'

export const container = style({
    flex: 1,
})

export const vehicleNumber = style({
    padding: '4px 0px',
    border: `1.5px solid ${vars.colors.green[400]}`,
    paddingLeft: '12px',
    paddingRight: '12px',
    borderRadius: '4px',
    color: vars.colors.black,
    fontWeight: vars.fontWeights.extraBold,
    backgroundColor: vars.colors.green[200],
    marginRight: 'auto',
    fontSize: vars.fontSizes.mediumPlus,
})

export const skeletonWrapper = style({
    marginRight: 'auto',
    padding: '4px 0px',
})

export const controlGroup = style({
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: '20px',
    zIndex: vars.zIndex.four,
})

export const button = style({
    display: 'flex',
    width: '100px',
    justifyContent: 'center',
    gap: '12px',
})

export const title = style({
    fontSize: vars.fontSizes.large,
    fontWeight: vars.fontWeights.extraBold,
    color: vars.colors.black,
    marginBottom: '10px',
})

export const contents = style({
    backgroundColor: vars.colors.white,
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    overflowY: 'auto',
    minHeight: 'calc(80vh - 100px)',

    '@media': {
        [`screen and (max-width: ${breakPoints.mobile}px)`]: {
            padding: '20px',
            minHeight: 'calc(70vh - 50px)',
        },
    },
})
