import styled, { css } from 'styled-components'
import Link from 'features/link'
import theming from 'styled-theming'
import { sizes, colors } from 'config/styled-theme'

interface CustomStyleProps {
    href: string
    border: number | boolean
    custom?: {
        color?: string
        background?: string
    }
}

interface TextStyleProps {
    icon?: boolean
}

/**
 * * Button themes using styled-theming.
 * * We can customize more (hover colors etc)
 */

/** ******************************************
 * THEME COLORS
 * * Define colors for each theme
 ********************** ********************* */
const backgroundColor = theming('mode', {
    primary: colors.primary,
    secondary: '#fff',
    omega: colors.omega,
    recruit: colors.recruit,
    academy: colors.academy,
    community: colors.community,
    dark: colors.dark,
    red: '#DA2128',
    quadrant: '#30b2e6',
})

// Text colors for `mode` theme
const textColor = theming('mode', {
    primary: colors.dark,
    secondary: colors.dark,
    omega: colors.dark,
    recruit: '#fff',
    academy: '#fff',
    community: colors.dark,
    dark: '#777',
    red: '#fff',
    quadrant: colors.dark,
})

const gradientColor = theming('mode', {
    primary: 'linear-gradient(180deg, #30B2E6 0%, #2B9ECC 100%), #30B2E6',
    omega: 'linear-gradient(0deg, #DE9C00 2.14%, #FAB607 93.57%), #FAB400',
    recruit:
        'linear-gradient(0deg, rgba(113, 34, 16, 0.7) 2.14%, rgba(145, 48, 25, 0.7) 93.57%), #913019',
    dark: 'linear-gradient(180deg, #212121 0%, #777 100%), #212121',
})

const hoverBackgroundColor = theming('mode', {
    primary:
        'radial-gradient(171.50px at 50% 50%, rgba(116, 228, 255, 0.3) 0%, rgba(116, 228, 255, 0) 100%), #30B2E6',
    omega:
        'radial-gradient(171.50px at 50% 50%, rgba(255, 230, 76, 0.3) 0%, rgba(255, 230, 76, 0) 100%), #FAB400',
    recruit:
        'linear-gradient(0deg, rgba(140, 43, 21, 0.7) 2.14%, rgba(181, 70, 44, 0.7) 93.57%), #913019',
    dark:
        'radial-gradient(171.50px at 50% 50%, rgba(#777, 0.3) 0%, rgba(#777, 0) 100%), #212121',
})

/** *******************************************
    THEME COLORS ENDS--
 ******************************************* */

/** ******************************************
 * THEME SIZE
 * * CSS values that might be different for each size
 ******************************************* */

const size = theming('size', {
    small: `
        height: 45px;
        min-width: 118px;
        font-size: 16px;
    `,
    regular: `
        height: 54px;
        min-width: 160px;
        font-size: 18px;
    `,
    large: `
        height: 70px;
        min-width: 245px;
        font-size: 18px;

        @media (max-width: ${sizes.sm}) {
            height: 54px;
        }
    `,
})

const polygon = theming('size', {
    small: '8px',
    regular: '8px',
    large: '10px',
})
/** *******************************************
    THEME SIZE ENDS--
 ******************************************* */

// Button styles
const buttonStyles = css<CustomStyleProps>`
    position: relative;
    text-transform: uppercase;
    padding: 0 30px;
    ${size};
    letter-spacing: 0.08em;
    /* display: inline-block; */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    line-height: 0;
    font-weight: 600;
    clip-path: polygon(
        0% 0,
        0 0%,
        100% 0%,
        100% 0,
        100% calc(100% - ${polygon}),
        calc(100% - ${polygon}) 100%,
        0 100%,
        0% calc(100% - ${polygon})
    );
    /* transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); */
    background-color: ${backgroundColor};
    background: ${gradientColor};
    color: ${textColor};
    border: 0;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    span {
        color: ${textColor};
    }

    @media (max-width: ${sizes.sm}) {
        width: 100%;
        font-size: 16px;
        letter-spacing: 0.06em;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0px;
        left: 0;
        width: 110%;
        height: 102%;
        /* background: ${hoverBackgroundColor}; */
        background-color: ${backgroundColor};
        background: ${gradientColor};
        filter: brightness(1.07);
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
        transition: transform 0.4s ease, opacity 0.4s ease;
        clip-path: polygon(0 0, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
    }

    &:hover {
        &::before {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    ${({ custom }) =>
        custom &&
        css`
            ${custom};

            span {
                color: ${custom.color};
            }

            &::before {
                background: ${custom.background};
            }
        `}

    ${({ theme }) =>
        theme.mode === 'secondary' &&
        css`
            &::before {
                background-color: #ddd;
            }
        `}

    /**
        * (WIP) - Conditional 'Border' styles
        * * Only renders when border prop is passed
        * TODO: Make colors dynamic using theming
    */
    ${({ border, theme }) =>
        border &&
        css`
            background: transparent;
            color: #fff;
            border: 1px solid #fff;

            span {
                color: #fff;
            }

            &::before {
                background: ${backgroundColor};
            }

            &::after {
                content: '';
                position: absolute;
                bottom: -14px;
                bottom: ${theme.size === 'large' ? '-12px' : '-14px'};
                right: 4px;
                border-right: 1px solid #fff;
                border-bottom: 32px solid #fff;
                transform: rotate(45deg);
            }

            &:hover {
                color: ${textColor};
                border-color: ${backgroundColor};

                span {
                    color: ${textColor};
                }

                &::after {
                    border-color: ${backgroundColor};
                }
            }
        `}
`

// Internal link
export const StyledLinkButton = styled(Link)`
    ${buttonStyles};
`

export const StyledAnchorButton = styled.a<CustomStyleProps>`
    ${buttonStyles};
`

// Text / span element
export const Text = styled.span<TextStyleProps>`
    position: relative;

    ${({ icon }) =>
        icon &&
        css`
            display: flex;
            align-items: center;
            gap: 10px;
        `}
`

export const Platform = styled.div`
    margin-left: 10px;
    position: relative;

    svg {
        margin-left: 10px;
    }
`

