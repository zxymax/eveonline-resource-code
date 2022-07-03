import React, { useRef } from 'react'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import { ImageLazyLoad, Link } from 'features'
import ContentType from 'models/types/ts/contentType'
import { HeadingUnderline2 } from 'layouts/headings'
import getUrlWithLangPrefix from 'pages/academy/helpers/getUrlWithLangPrefix'
import { prev, next } from 'layouts/carousel/helpers'
import Arrows from 'layouts/carousel/components/arrows'
import Dots from '../components/dots'
import Markdown from '../../markdown'
import Arrow from '../../arrow'
import style from './carousel.module.scss'

import SectionProps from '../../../templates/SectionProps'

const Carousel = ({ section, location }: SectionProps): JSX.Element => {
    const language = useSelector((state) => getLanguage(state))

    const {
        headline,
        body,
        contentCollection: { total, items },
    } = section

    const slider = useRef(null)

    const RenderItem = (item: ContentType): JSX.Element => {
        const { name, buttonUrl, imageFile } = item

        const contentLength = item.body?.length
        const maxLength = 400

        const content = (
            <>
                <div className={style.image}>
                    {imageFile && (
                        <ImageLazyLoad
                            image={item?.imageFile}
                            param="?w=630&h=354&fm=jpg&fl=progressive&q=80&fit=fill"
                            lazyloadProps={{
                                height: 354,
                                offset: 200,
                                once: true,
                            }}
                        />
                    )}
                </div>
                <div className={style.text}>
                    <div className={style.heading}>
                        {item.headline && (
                            <HeadingUnderline2 title={item.headline} />
                        )}
                    </div>
                    <div className={style.desc}>
                        <div className={style.overflow}>
                            <div
                                className={style(style.scroll, {
                                    [style.gradient]: contentLength > maxLength,
                                })}
                            >
                                <Markdown content={item.body} />
                                {buttonUrl && <Arrow />}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

        return (
            <div className={style.item} key={name}>
                {buttonUrl ? (
                    <Link
                        className={style.inner}
                        url={getUrlWithLangPrefix(
                            language,
                            location.page,
                            buttonUrl
                        )}
                    >
                        {content}
                    </Link>
                ) : (
                    <div className={style.inner}>{content}</div>
                )}
            </div>
        )
    }

    const renderContent = (): JSX.Element => {
        // show slider when there's multiple items
        if (total > 1) {
            return (
                <div>
                    <Slider
                        ref={slider}
                        fade
                        draggable={false}
                        arrows={false}
                        dots
                        lazyLoad="ondemand"
                        cssEase="cubic-bezier(.5,0,.1,1)"
                        appendDots={(dots) => <Dots>{dots}</Dots>}
                    >
                        {items.map((item: ContentType) => RenderItem(item))}
                    </Slider>
                    <Arrows
                        nextClick={() => next(slider)}
                        prevClick={() => prev(slider)}
                        className={style.arrows}
                    />
                </div>
            )
        }
        // show single item
        if (total === 1) {
            return RenderItem(items[0])
        }

        return <></>
    }

    return (
        <div className={style.carousel}>
            {headline && (
                <div className={style.intro}>
                    <HeadingUnderline2 title={headline} />
                    {body && <Markdown content={body} />}
                </div>
            )}
            <div className={style.content}>{renderContent()}</div>
        </div>
    )
}

export default Carousel
