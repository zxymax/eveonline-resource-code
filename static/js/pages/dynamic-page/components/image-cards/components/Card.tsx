import React, { useState, createElement } from 'react'
import Visibility from 'react-visibility-sensor'
import ReactMarkdown from 'react-markdown'
import { pushClickEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import LazyLoad from 'react-lazyload'
import ContentType from 'models/types/ts/contentType'
import { Button } from 'layouts'
import Link from '../../shared/link'
import { ThemeContext, LocationContext } from '../../../context'
import { lightOrDark, getImage, slugify } from '../../../helpers'
import style from './Card.module.scss'

interface Props {
    card: ContentType
    id: number
}

const Card = ({ card, id }: Props): JSX.Element => {
    const [active, setActive] = useState<boolean>(false)

    const onChange = (isVisible: boolean): void => {
        if (isVisible) setActive(true)
    }

    const renderMedia = (file: string | undefined): JSX.Element => {
        if (!file) return <></>

        const fileType = file.split('.').pop()
        if (fileType === 'mp4' || fileType === 'webm') {
            return (
                <video playsInline autoPlay muted loop>
                    <source src={file} type={`video/${fileType}`} />
                </video>
            )
        }

        return (
            <div className={style.img}>
                <LazyLoad height={478} offset={400} once>
                    <img src={`${file}?w=850`} alt="" height={478} />
                </LazyLoad>
            </div>
        )
    }

    const { name, body, imageFile, buttonText, buttonUrl } = card
    const alignmentStyle = id % 2 === 0 ? style.left : style.right

    return (
        <ThemeContext.Consumer>
            {(colorTheme) => {
                const css = {
                    backgroundColor: colorTheme.cardTemplate,
                    '--dlp-card-color': lightOrDark(colorTheme.cardTemplate),
                    '--dlp-card-link': colorTheme.link,
                } as React.CSSProperties
                return (
                    <LocationContext.Consumer>
                        {(location) => (
                            <div
                                id={slugify(name)}
                                className={style(style.card, alignmentStyle, {
                                    [style.active]: active,
                                })}
                                key={id}
                            >
                                <div className={style.inner}>
                                    {imageFile &&
                                        renderMedia(getImage(imageFile))}
                                    <Visibility
                                        onChange={onChange}
                                        partialVisibility
                                        active={!active}
                                    >
                                        <div
                                            className={style(style.text, {
                                                [style.active]: active,
                                            })}
                                            style={css}
                                        >
                                            <ReactMarkdown
                                                renderers={{
                                                    heading: ({
                                                        children,
                                                        level,
                                                    }) =>
                                                        createElement(
                                                            `h${level}`,
                                                            {
                                                                style: {
                                                                    color:
                                                                        colorTheme.headline,
                                                                },
                                                            },
                                                            children
                                                        ),
                                                    paragraph: ({
                                                        children,
                                                    }) => (
                                                        <p
                                                            style={{
                                                                color: lightOrDark(
                                                                    colorTheme.cardTemplate
                                                                ),
                                                            }}
                                                        >
                                                            {children}
                                                        </p>
                                                    ),
                                                    listItem: ({
                                                        children,
                                                    }) => (
                                                        <li
                                                            style={{
                                                                color: lightOrDark(
                                                                    colorTheme.cardTemplate
                                                                ),
                                                            }}
                                                        >
                                                            {children}
                                                        </li>
                                                    ),
                                                    link: ({
                                                        children,
                                                        href,
                                                    }) => (
                                                        <Link
                                                            href={href}
                                                            onClick={() =>
                                                                pushClickEventToDataLayer(
                                                                    'Button click',
                                                                    `page: ${location}, url: ${href}`
                                                                )
                                                            }
                                                            color={
                                                                colorTheme.link
                                                            }
                                                        >
                                                            {children}
                                                        </Link>
                                                    ),
                                                }}
                                                source={body}
                                                escapeHtml={false}
                                            />
                                            {buttonText != null && (
                                                <Button
                                                    className={style.btn}
                                                    data-id="5435434"
                                                    path={buttonUrl}
                                                    onClick={() =>
                                                        pushClickEventToDataLayer(
                                                            'Button click',
                                                            `page: ${location}, url: ${buttonUrl}`
                                                        )
                                                    }
                                                    size="small"
                                                    custom={{
                                                        color:
                                                            colorTheme.button
                                                                .color,
                                                        background:
                                                            colorTheme.button
                                                                .background,
                                                    }}
                                                >
                                                    {buttonText}
                                                </Button>
                                            )}
                                        </div>
                                    </Visibility>
                                </div>
                            </div>
                        )}
                    </LocationContext.Consumer>
                )
            }}
        </ThemeContext.Consumer>
    )
}

export default Card
