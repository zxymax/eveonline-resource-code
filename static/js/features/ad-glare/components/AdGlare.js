import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import { Section, Icon } from 'layouts'
import classNames from 'classnames'
import Slider from 'react-slick'
import { fetchAdsIfNeeded, fetchAdsIfNeededNew } from '../action'

import style from './adGlare.scss'

// const AdGlare = ({ hasContent, imgSource, link, className, language }) => {
class AdGlare extends Component {
    componentDidMount = () => {
        const { banners, adSize } = this.props

        if (_isEmpty(banners)) {
            if (adSize === 'large') {
                this.props.dispatch(fetchAdsIfNeededNew)
            } else {
                this.props.dispatch(fetchAdsIfNeeded)
            }
        }
    }

    componentDidUpdate = (prevProps) => {
        const { adSize } = this.props
        if (prevProps.shouldFetch !== this.props.shouldFetch) {
            if (adSize === 'large') {
                this.props.dispatch(fetchAdsIfNeededNew)
            } else {
                this.props.dispatch(fetchAdsIfNeeded)
            }
        }
    }

    render() {
        const NextArrow = (props) => {
            const { onClick, className } = props
            return (
                <div
                    role="presentation"
                    className={className}
                    onClick={onClick}
                >
                    <Icon name="chevron-circle-right" />
                </div>
            )
        }

        const PrevArrow = (props) => {
            const { onClick, className } = props
            return (
                <div
                    role="presentation"
                    className={className}
                    onClick={onClick}
                >
                    <Icon name="chevron-circle-left" />
                </div>
            )
        }

        const slideSettings = {
            dots: false,
            arrows: true,
            infinite: true,
            fade: true,
            // lazyLoad: true,
            draggable: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        }

        const { banners, imgSource, link, isFetching, adSize } = this.props

        const bannerAds = _map(banners, (item, index) => (
            <a key={index} href={item.link} alt="">
                <img alt="" src={item.src} />
            </a>
        ))

        const wrapperClass = classNames(style.adsWrapper, {
            [style.large]: adSize === 'large',
        })

        return (
            <div className={wrapperClass}>
                <Section
                    hasContent={!isFetching}
                    loadingTypeSmall
                    spinnerSize={10}
                >
                    <Slider {...slideSettings}>{bannerAds}</Slider>
                </Section>
            </div>
        )
    }
}

AdGlare.propTypes = {
    dispatch: PropTypes.func.isRequired,
    banners: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            link: PropTypes.string,
        })
    ),
    isFetching: PropTypes.bool,
    shouldFetch: PropTypes.bool,
    adSize: PropTypes.string,
}

AdGlare.defaultProps = {
    adSize: 'medium',
}

export default AdGlare
