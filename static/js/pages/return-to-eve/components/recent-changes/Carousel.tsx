import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { ImageLazyLoad } from 'features'
import { HeadingUnderline2 } from 'layouts/headings'
import { prev, next } from 'layouts/carousel/helpers'
import Arrows from 'layouts/carousel/components/arrows'
import { ParagraphLarge } from 'layouts/typography'
import style from './Carousel.module.scss'

interface Props {
    section: SectionType
}

interface MdProps {
    children: string | undefined
}

const VideoCarousel = ({ section }: Props): JSX.Element => {
    const { headline, teaser, contentCollection } = section

    const [nav2, setNav2] = useState()

    // const slider1 = useRef(null)
    const slider2 = useRef(null)

    const [hasSetPosition, setHasSetPosition] = useState(false)

    const initialPosisiton = contentCollection.total - 1

    useEffect(() => {
        if (slider2.current && !hasSetPosition) {
            slider2.current?.slickGoTo(initialPosisiton)
            setHasSetPosition(true)
        }
    }, [initialPosisiton, hasSetPosition, slider2])

    // set nav to ref when ready
    useEffect(() => {
        // setNav1(slider1.current)
        setNav2(slider2.current)
    }, [])

    return (
        <div className={style.carousel}>
            {headline && (
                <>
                    <div className={style.intro}>
                        <HeadingUnderline2 color="#30B2E6" title={headline} />
                    </div>
                    <ParagraphLarge>{teaser}</ParagraphLarge>
                </>
            )}
            {contentCollection.total > 0 && (
                <>
                    <div className={style.content}>
                        <Slider
                            ref={slider2}
                            asNavFor={nav2}
                            className={style.slider2}
                            fade
                            infinite={false}
                            initialSlide={contentCollection.total - 1}
                            draggable={false}
                            arrows={false}
                        >
                            {contentCollection.items.map(
                                (item: ContentType) => (
                                    <div key={item.name}>
                                        <div className={style.inner}>
                                            <ImageLazyLoad
                                                image={item?.imageFile}
                                                param="?w=950&h=539&fm=jpg&fl=progressive&q=80&fit=fill"
                                                lazyloadProps={{
                                                    height: 230,
                                                    offset: 200,
                                                    once: true,
                                                }}
                                            />

                                            <div
                                                className={style.text}
                                                key={item.headline}
                                            >
                                                <Arrows
                                                    prevClick={() =>
                                                        prev(slider2)
                                                    }
                                                    nextClick={() =>
                                                        next(slider2)
                                                    }
                                                    className={style.arrows}
                                                    color="#30B2E6"
                                                />
                                                <ReactMarkdown
                                                    source={item.body}
                                                    renderers={{
                                                        heading: ({
                                                            children,
                                                        }: MdProps) => (
                                                            <HeadingUnderline2
                                                                title={children}
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </Slider>
                    </div>
                </>
            )}
        </div>
    )
}

export default VideoCarousel

