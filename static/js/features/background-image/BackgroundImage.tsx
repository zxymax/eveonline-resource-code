/* eslint-disable react/jsx-props-no-spreading */

import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'

interface BackgroundPathProps {
    url?: string
    width?: string
    height?: string
    repeat?: string
    size?: string
    position?: string
    nobg?: boolean
    webp?: boolean
    children?: ReactNode
}

const backgroundPath = (
    url: string,
    width: number,
    height = '',
    nobg = false,
    webp = false
): string => {
    // Setting image as transparent 1x1 images at first load, then setting the right image when needed.
    if (nobg) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    }

    const checkHeight = height ? `&h=${height}&fit=fill` : ''
    const checkWebp = webp ? `&fm=webp` : ''
    const ctfImage =
        url &&
        url.replace('//webimg.ccpgamescdn.com/', '//images.ctfassets.net/')

    return `${ctfImage}?w=${width}&q=75${checkHeight}${checkWebp}`
}

const Bg = styled.div<BackgroundPathProps>`
    background-repeat: ${(props) => props.repeat};
    background-size: ${(props) => props.size};
    background-position: ${(props) => props.position};
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-iteration-count: 1;

    background-image: ${(props) =>
        `url(${backgroundPath(props.url, 2400, '', props.nobg)})`};

    @media only screen and (max-width: 1920px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 1920, '', props.nobg)})`};
    }

    @media only screen and (max-width: 1700px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 1700, '', props.nobg)})`};
    }
    @media only screen and (max-width: 1500px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 1500, '', props.nobg)})`};
    }
    @media only screen and (max-width: 1300px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 1300, '', props.nobg)})`};
    }
    @media only screen and (max-width: 1100px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 1100, '', props.nobg)})`};
    }
    @media only screen and (max-width: 900px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 900, '', props.nobg)})`};
    }
    @media only screen and (max-width: 700px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 700, '', props.nobg)})`};
    }
    @media only screen and (max-width: 500px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 500, props.height, props.nobg)})`};
    }
    @media only screen and (max-width: 300px) {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 300, props.height, props.nobg)})`};
    }

    /* webP */
    html.webp & {
        background-image: ${(props) =>
            `url(${backgroundPath(props.url, 2400, '', props.nobg, true)})`};

        @media only screen and (max-width: 1920) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    1920,
                    '',
                    props.nobg,
                    true
                )})`};
        }

        @media only screen and (max-width: 1700px) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    1700,
                    '',
                    props.nobg,
                    true
                )})`};
        }
        @media only screen and (max-width: 1500px) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    1500,
                    '',
                    props.nobg,
                    true
                )})`};
        }
        @media only screen and (max-width: 1300px) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    1300,
                    '',
                    props.nobg,
                    true
                )})`};
        }
        @media only screen and (max-width: 1100px) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    1100,
                    '',
                    props.nobg,
                    true
                )})`};
        }
        @media only screen and (max-width: 900px) {
            background-image: ${(props) =>
                `url(${backgroundPath(props.url, 900, '', props.nobg, true)})`};
        }
        @media only screen and (max-width: 700px) {
            background-image: ${(props) =>
                `url(${backgroundPath(props.url, 700, '', props.nobg, true)})`};
        }
        @media only screen and (max-width: 500px) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    500,
                    props.height,
                    props.nobg,
                    true
                )})`};
        }
        @media only screen and (max-width: 300px) {
            background-image: ${(props) =>
                `url(${backgroundPath(
                    props.url,
                    300,
                    props.height,
                    props.nobg,
                    true
                )})`};
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        20% {
            opacity: 0;
        }
        60% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
`

interface Props {
    url: string
    children?: ReactNode
    lazy?: boolean
    [x: string]: unknown
}

const StyledBackgroundImage = ({
    url,
    children,
    ...rest
}: Props): JSX.Element => {
    if (url !== null) {
        return (
            <Bg url={url} {...rest}>
                {children}
            </Bg>
        )
    }
    return (
        <Bg nobg {...rest}>
            {children}
        </Bg>
    )
}

function LazyBackground({ url, children, ...rest }: Props): JSX.Element {
    const [imageUrl, setImageUrl] = useState<string>(null)

    function handleChange(isVisible: boolean): void {
        if (isVisible) {
            setImageUrl(url)
        }
    }

    return (
        <VisibilitySensor
            onChange={handleChange}
            offset={{ top: 400 }}
            partialVisibility
        >
            <StyledBackgroundImage url={imageUrl} {...rest}>
                {children}
            </StyledBackgroundImage>
        </VisibilitySensor>
    )
}

function BackgroundImage({
    url,
    children,
    lazy = true,
    ...rest
}: Props): JSX.Element {
    return lazy ? (
        <LazyBackground url={url} {...rest}>
            {children}
        </LazyBackground>
    ) : (
        <StyledBackgroundImage url={url} {...rest}>
            {children}
        </StyledBackgroundImage>
    )
}

StyledBackgroundImage.defaultProps = {
    children: undefined,
    lazy: false,
}

LazyBackground.defaultProps = {
    children: undefined,
    lazy: false,
}
BackgroundImage.defaultProps = {
    children: undefined,
    lazy: false,
}

export default BackgroundImage
