import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import Slider from 'react-slick'
import { Section, NextArrow, PrevArrow } from 'layouts'
import style from './mediaQuotes.scss'
import mockSection from './MediaQuotesMock.json'

const MediaQuotes = ({ section }) => {
    const slideSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow className={style.next} />,
        prevArrow: <PrevArrow className={style.prev} />,
    }

    const quotes = _map(section.contentCollection.items, (item, index) => (
        <div key={index} className={style.inner}>
            {item.body}
            <div className={style.imgWrapper}>
                {item.imageFile && <img src={item.imageFile.url} alt="" />}
            </div>
        </div>
    ))

    return (
        <div className={style.MediaQuotes}>
            <Section hasContent>
                <div className={style.rollingText}>
                    <div className={style.content}>
                        <Slider {...slideSettings}>{quotes}</Slider>
                    </div>
                </div>
            </Section>
        </div>
    )
}

MediaQuotes.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.object),
    }),
}

MediaQuotes.defaultProps = {
    section: mockSection,
    // buttonUrl: 'Upgrade now',
}

export default MediaQuotes

