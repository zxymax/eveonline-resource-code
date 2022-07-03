import React, { useRef } from 'react'
import AdGlareResponse from 'models/AdGlareResponseModel'
import _map from 'lodash/map'
import { Section, Icon } from 'layouts'
import Slider from 'react-slick'
import style from './adGlare.module.scss'

interface Props {
    adGlareResponse: AdGlareResponse
}

const defaultAd: AdGlareResponse = {
    success: 1,
    campaigns: [
        {
            creative_data: {
                click_url:
                    'https://www.eveonline.com/recruit?utm_source=www&utm_medium=banner&utm_campaign=recruitment&utm_content=defaultcreative',
                image_url:
                    'https://web.ccpgamescdn.com/aws/eveonline/images/fallback/recruit-fallback-en.png',
                landing_url: 'landing url',
            },
        },
    ],
}

const AdGlare = ({ adGlareResponse }: Props): JSX.Element => {
    //  fallback ad if no ad is returned from AdGlare
    let adsResponse: AdGlareResponse

    if (
        adGlareResponse &&
        adGlareResponse.success === 1 &&
        adGlareResponse.campaigns
    ) {
        adsResponse = adGlareResponse
    } else {
        adsResponse = defaultAd
    }

    // const { campaigns } = adGlareResponse
    const slider = useRef(null)

    const NextArrow = (): JSX.Element => {
        return (
            <div
                role="presentation"
                className="slick-arrow slick-next"
                onClick={() => slider.current.slickNext()}
            >
                <Icon name="chevron-circle-right" />
            </div>
        )
    }

    const PrevArrow = (): JSX.Element => {
        return (
            <div
                role="presentation"
                className="slick-arrow slick-prev"
                onClick={() => slider.current.slickPrev()}
            >
                <Icon name="chevron-circle-left" />
            </div>
        )
    }

    const bannerAds = _map(adsResponse.campaigns, (item, index) => (
        <a key={index} href={item.creative_data.click_url}>
            <img alt="" src={item.creative_data.image_url} />
        </a>
    ))

    return (
        <div className={[style.adsWrapper, style.large].join(' ')}>
            <Section loadingTypeSmall spinnerSize={10}>
                <Slider
                    ref={slider}
                    dots={false}
                    arrows
                    fade
                    draggable={false}
                    autoplay={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    nextArrow={<NextArrow />}
                    prevArrow={<PrevArrow />}
                >
                    {bannerAds}
                </Slider>
            </Section>
        </div>
    )
}

export default AdGlare
