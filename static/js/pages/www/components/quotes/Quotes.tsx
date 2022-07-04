import React, { useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import ContentType from 'models/types/ts/contentType'
import { ParagraphLarge, headingShadowSmall } from 'layouts/typography'
import style from './Quotes.module.scss'

/* eslint-disable react/jsx-props-no-spreading */

interface Props {
    content: ContentType[]
    className?: string
}

const INTERVAL = 5000

const Quotes = ({ content, className }: Props): JSX.Element => {
    const [widthPercent, setWidthPercent] = useState('0')
    const [activeSlide, setActiveSlide] = useState(0)
    const [speed, setSpeed] = useState(INTERVAL)
    const sliderRef = useRef(null)
    const barRef = useRef(null)

    const startProgressbar = (): void => {
        setWidthPercent('100%')
    }

    const resetProgressbar = (): void => {
        setWidthPercent('0')
        setSpeed(INTERVAL)
    }

    const pauseProgressbar = (): void => {
        const pausedWidth = window
            .getComputedStyle(barRef.current)
            .getPropertyValue('width')
        const pixels = 80 // w
        const percentage = (parseInt(pausedWidth, 10) / pixels) * 100
        const timeLeft = (percentage / 100) * INTERVAL

        if (sliderRef.current) {
            sliderRef.current.slickPause()
        }

        setWidthPercent(`${percentage}%`)
        setSpeed(INTERVAL - timeLeft)
    }

    const settings: Settings = {
        slidesToShow: 1,
        arrows: false,
        lazyLoad: 'progressive',
        autoplay: true,
        autoplaySpeed: speed,
        speed: 200,
        fade: true,
        infinite: true,
        pauseOnHover: false,
        dots: true,
        dotsClass: style.dots,
        customPaging: (i) => {
            return (
                <div className={style.outer}>
                    <div
                        className={style(style.progress, {
                            [style.active]: i === activeSlide,
                        })}
                    >
                        <div
                            ref={barRef}
                            className={style.bar}
                            style={{
                                width: `${widthPercent}`,
                                transition:
                                    widthPercent === '0'
                                        ? 'width 0s'
                                        : `linear width ${speed}ms`,
                            }}
                        />
                    </div>
                </div>
            )
        },
        onInit: () => {
            startProgressbar()
        },
        beforeChange: () => {
            resetProgressbar()
        },
        afterChange: (slide) => {
            setActiveSlide(slide)
            startProgressbar()
        },
    }

    const quotes = content.map((quote) => (
        <div className={style.quote} key={quote.name}>
            <ParagraphLarge {...headingShadowSmall}>
                {quote.body}
            </ParagraphLarge>
            {quote.imageFile && <img src={quote.imageFile.url} alt="" />}
        </div>
    ))

    return (
        <div
            className={className}
            onMouseEnter={pauseProgressbar}
            onMouseLeave={() => {
                startProgressbar()

                if (sliderRef.current) {
                    sliderRef.current.slickPlay()
                }
            }}
        >
            <Slider ref={sliderRef} className={style.quotes} {...settings}>
                {quotes}
            </Slider>
        </div>
    )
}

Quotes.defaultProps = {
    className: '',
}

export default Quotes

