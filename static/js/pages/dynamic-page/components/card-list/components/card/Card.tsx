import React, { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { pushClickEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import LazyLoad from 'react-lazyload'
import ContentType from 'models/types/ts/contentType'
import { Button } from 'layouts'
import Link from '../../../shared/link'
import { ThemeContext, LocationContext } from '../../../../context'
import { lightOrDark, getImage, slugify } from '../../../../helpers'
import style from './Card.module.scss'

interface Props {
    card: ContentType
}

const Card = ({ card }: Props): JSX.Element => {
    const renderMedia = (file: string | undefined): JSX.Element => {
        if (!file) return <></>

        const fileType = file.split('.').pop()
        if (fileType === 'mp4' || fileType === 'webm') {
            return (
                <div className={style.video}>
                    <video playsInline autoPlay muted loop>
                        <source src={file} type={`video/${fileType}`} />
                    </video>
                </div>
            )
        }

        return (
            <div className={style.img}>
                <LazyLoad height={478} offset={350} once>
                    <img src={`${file}?w=640`} alt="" />
                </LazyLoad>
            </div>
        )
    }

    return (
        <ThemeContext.Consumer>
            {(colorTheme) => {
                const css = {
                    '--dlpBG': colorTheme.cardTemplate,
                    '--dlp-card-color': lightOrDark(colorTheme.cardTemplate),
                    '--dlp-card-link': colorTheme.link,
                } as React.CSSProperties
                return (
                    <LocationContext.Consumer>
                        {(location) => (
                            <div
                                id={slugify(card.name)}
                                style={css}
                                className={style.item}
                            >
                                {card.imageFile &&
                                    renderMedia(getImage(card.imageFile))}
                                <div className={style.content}>
                                    <ReactMarkdown
                                        source={card.body}
                                        renderers={{
                                            heading: ({ children, level }) =>
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
                                            paragraph: ({ children }) => (
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
                                            listItem: ({ children }) => (
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
                                            link: ({ children, href }) => (
                                                <Link
                                                    href={href}
                                                    onClick={() =>
                                                        pushClickEventToDataLayer(
                                                            'Button click',
                                                            `page: ${location}, url: ${href}`
                                                        )
                                                    }
                                                    color={colorTheme.link}
                                                >
                                                    {children}
                                                </Link>
                                            ),
                                        }}
                                        escapeHtml={false}
                                    />
                                    {card.buttonText != null && (
                                        <>
                                            <Button
                                                className={style.btn}
                                                path={card.buttonUrl}
                                                onClick={() =>
                                                    pushClickEventToDataLayer(
                                                        'Button click',
                                                        `page: ${location}, url: ${card.buttonUrl}`
                                                    )
                                                }
                                                size="small"
                                                custom={{
                                                    color:
                                                        colorTheme.button.color,
                                                    background:
                                                        colorTheme.button
                                                            .background,
                                                }}
                                            >
                                                {card.buttonText}
                                            </Button>
                                        </>
                                    )}
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
