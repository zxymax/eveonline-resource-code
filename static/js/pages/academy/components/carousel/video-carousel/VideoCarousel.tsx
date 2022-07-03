import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { FeatureVideo } from 'features'
import { HeadingUnderline2 } from 'layouts/headings'
import { prev, next } from 'layouts/carousel/helpers'
import Arrows from 'layouts/carousel/components/arrows'
import Dots from '../components/dots'
import { VideoIcon } from '../../icons'
import style from './VideoCarousel.module.scss'

interface Props {
    section: SectionType
}

interface MdProps {
    children: string | undefined
}

const VideoCarousel = ({ section }: Props): JSX.Element => {
    const { headline, contentCollection } = section
    const [nav1, setNav1] = useState()
    const [nav2, setNav2] = useState()
    const [useTransform, setTransform] = useState(true)

    const slider1 = useRef(null)
    const slider2 = useRef(null)

    // set nav to ref when ready
    useEffect(() => {
        setNav1(slider1.current)
        setNav2(slider2.current)
    }, [])

    const isPlaying = (playing: boolean): void => {
        if (playing) {
            setTransform(false)
        } else {
            setTransform(true)
        }
    }

    const handleClick = (key: number): void => {
        slider1.current.slickGoTo(key)
    }

    return (
        <div className={style.carousel}>
            {headline && (
                <div className={style.intro}>
                    <HeadingUnderline2 title={headline} />
                </div>
            )}
            {contentCollection.total > 0 && (
                <div className={style.content}>
                    <Slider
                        ref={slider1}
                        asNavFor={nav2}
                        centerPadding="0"
                        arrows={false}
                        useTransform={useTransform}
                        draggable={false}
                        lazyLoad="progressive"
                        cssEase="cubic-bezier(.5,0,.1,1)"
                        dots
                        appendDots={(dots) => <Dots>{dots}</Dots>}
                        className={style.slider1}
                    >
                        {contentCollection.items.map(
                            (item: ContentType, key: number) => (
                                <div
                                    key={item.name}
                                    role="presentation"
                                    onClick={() => handleClick(key)}
                                    className={style.video}
                                >
                                    <FeatureVideo
                                        image={item.imageFile?.url}
                                        videoId={item.buttonUrl}
                                        playButtonSize="medium"
                                        playing={(playing: boolean) =>
                                            isPlaying(playing)
                                        }
                                        transition={false}
                                    />
                                    <VideoIcon />
                                </div>
                            )
                        )}
                    </Slider>
                    <Arrows
                        prevClick={() => prev(slider1)}
                        nextClick={() => next(slider1)}
                        className={style.arrows}
                    />
                    <Slider
                        ref={slider2}
                        asNavFor={nav1}
                        className={style.slider2}
                        fade
                        draggable={false}
                        arrows={false}
                    >
                        {contentCollection.items.map((item: ContentType) => (
                            <div className={style.text} key={item.headline}>
                                {item.headline && (
                                    <span className={style.type}>
                                        {item.headline}
                                    </span>
                                )}
                                <ReactMarkdown
                                    source={item.body}
                                    renderers={{
                                        heading: ({ children }: MdProps) => (
                                            <HeadingUnderline2
                                                title={children}
                                            />
                                        ),
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    )
}

export default VideoCarousel
