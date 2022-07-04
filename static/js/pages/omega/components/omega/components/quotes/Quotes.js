import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import Slider from 'react-slick'
import { Container, Section, NextArrow, PrevArrow } from 'layouts'
import style from './quotes.scss'

const Quotes = ({ section }) => {
    const slideSettings = {
        dots: true,
        arrows: true,
        // centerMode: '100px',
        centerPadding: '80px',
        infinite: true,
        autoplay: false,
        autoplaySpeed: 8000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow className={style.next} />,
        prevArrow: <PrevArrow className={style.prev} />,
    }

    const mobileShipDeco =
        '//web.ccpgamescdn.com/aws/eveonline/images/omega/omega_bottom_mobile.jpg'

    const quotes = _map(section.contentCollection.items, (item, index) => (
        <div key={index} className={style.inner}>
            {item.body}
        </div>
    ))

    return (
        <div className={style.quotes}>
            <img className={style.mobileDeco} src={mobileShipDeco} alt="" />
            <Container>
                <Section hasContent>
                    <div className={style.rollingText}>
                        <div className={style.content}>
                            <Slider {...slideSettings}>{quotes}</Slider>
                        </div>
                    </div>
                </Section>
            </Container>
        </div>
    )
}

Quotes.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.object),
    }),
}

Quotes.defaultProps = {
    section: null,
    // buttonUrl: 'Upgrade now',
}

export default Quotes

