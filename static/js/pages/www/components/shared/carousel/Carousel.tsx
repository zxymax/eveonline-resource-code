import React from 'react'
import Slider from 'react-slick'
import { NextArrow, PrevArrow } from 'layouts'
import defaultSettings from './sliderSettings'
import style from './Carousel.module.scss'

/* eslint-disable react/jsx-props-no-spreading */

interface Props {
    children: React.ReactNode
    config: any // eslint-disable-line
    sliderRef?: () => void | null
    className?: string
}

const Carousel = ({
    children,
    config,
    sliderRef,
    className,
    ...rest
}: Props): JSX.Element => {
    const settings = {
        ...defaultSettings,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        ...config,
    }

    return (
        <div className={style(style.sliderWrapper, className)}>
            <Slider
                className={style.slider}
                {...settings}
                {...rest}
                ref={sliderRef}
            >
                {children}
            </Slider>
        </div>
    )
}

Carousel.defaultProps = {
    sliderRef: null,
    className: '',
}

export default Carousel

