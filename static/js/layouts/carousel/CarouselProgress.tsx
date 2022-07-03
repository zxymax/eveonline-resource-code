import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Slider, { Settings } from 'react-slick'
// import Carousel from './Carousel'
import s from './CarouselProgress.module.scss'

/* eslint-disable react/jsx-props-no-spreading */

interface Props {
    children: React.ReactNode
}

const SPEED = 5000

const CarouselProgress = ({ children }: Props): JSX.Element => {
    const [widthPercent, setWidthPercent] = useState<string>('0')
    const [speed, setSpeed] = useState<number>(SPEED)
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const sliderRef = useRef(null)
    const barRef = useRef(null)

    const startProgressbar = (): void => {
        setWidthPercent('100%')
    }

    const resetProgressbar = (): void => {
        setWidthPercent('0')
        setSpeed(SPEED)
    }

    const pauseProgressbar = (): void => {
        const pausedWidth = window
            .getComputedStyle(barRef.current)
            .getPropertyValue('width')
        const pixels = 80 // w
        const percentage = (parseInt(pausedWidth, 10) / pixels) * 100
        const timeLeft = (percentage / 100) * SPEED

        if (sliderRef.current) {
            sliderRef.current.slickPause()
        }

        setWidthPercent(`${percentage}%`)
        setSpeed(SPEED - timeLeft)
    }

    const defaultSettings: Settings = {
        arrows: false,
        lazyLoad: 'progressive',
        autoplay: true,
        autoplaySpeed: speed,
        speed: 200,
        fade: true,
        dots: true,
        dotsClass: s.dots,
        customPaging: (i: number) => {
            return (
                <div className={s.outer}>
                    <div
                        className={cx(s.progress, {
                            [s.active]: i === activeSlide,
                        })}
                    >
                        <div
                            ref={barRef}
                            className={s.bar}
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

    // const settings = progress
    //     ? { ...defaultSettings, ...config }
    //     : { ...config }

    return (
        <div
            onMouseEnter={pauseProgressbar}
            onMouseLeave={() => {
                startProgressbar()

                if (sliderRef.current) {
                    sliderRef.current.slickPlay()
                }
            }}
            className={s.slider}
        >
            <Slider ref={sliderRef} {...defaultSettings}>
                {children}
            </Slider>
        </div>
    )
}

export default CarouselProgress

