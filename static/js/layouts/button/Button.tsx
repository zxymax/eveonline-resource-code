/* eslint-disable react/require-default-props */

import React, { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import Icon from 'layouts/font-awesome'
import { StyledLinkButton, StyledAnchorButton, Text, Platform } from './style'

interface Props {
    children?: ReactNode
    path?:
        | string
        | {
              page?: string
              subpage?: string
              id?: string
              query?: string | { path: string }
          }
    internal?: boolean
    theme?: string
    size?: 'small' | 'regular' | 'large'
    border?: number | boolean
    custom?: {
        color?: string
        background?: string
    }
    showPlatform?: boolean
    icon?: boolean
    className?: string
    [x: string]: unknown
}

const Button = ({
    children,
    path,
    internal,
    theme = 'primary',
    size = 'regular',
    border = 0,
    custom,
    showPlatform = false,
    icon = false,
    className,
    ...rest
}: Props): JSX.Element => (
    <ThemeProvider theme={{ mode: theme, size }}>
        {internal ? (
            <StyledLinkButton
                path={path}
                border={border}
                custom={custom}
                className={className}
                {...rest}
            >
                <Text icon={icon}>{children}</Text>
                {showPlatform && (
                    <Platform>
                        <Icon brand name="windows" />
                        <Icon brand name="apple" />
                    </Platform>
                )}
            </StyledLinkButton>
        ) : (
            <StyledAnchorButton
                href={path as string}
                border={border}
                custom={custom}
                className={className}
                {...rest}
            >
                <Text icon={icon}>{children}</Text>
                {showPlatform && (
                    <Platform>
                        <Icon brand name="windows" />
                        <Icon brand name="apple" />
                    </Platform>
                )}
            </StyledAnchorButton>
        )}
    </ThemeProvider>
)

export default Button

