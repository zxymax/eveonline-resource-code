import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Container } from 'layouts'
import AnimatedText from 'layouts/animated-text'
import BackgroundImage from 'features/background-image'
import PageLocationType from 'models/page-location-type'
import AcademyPageType from 'pages/academy/models/academy-page-type'
import { FeatureVideo } from 'features'
import { HeadingMedium, TaglineRegular } from 'layouts/typography'
import Navigation from '../navigation'
import style from './Hero.module.scss'

interface Props {
    section: SectionType
    sitemapPage: AcademyPageType
    location: PageLocationType
}

const Hero = ({ section, sitemapPage, location }: Props): JSX.Element => {
    if (!section) return <></>

    const { headline, teaser, buttonText, videoId, imageFile } = section

    return (
        <BackgroundImage
            url={imageFile ? imageFile.url : ''}
            repeat="no-repeat"
            size="cover"
            height={500}
            position="center top"
            className={style.hero}
            lazy={false}
        >
            <Container className={style.content}>
                <div className={style.text}>
                    <HeadingMedium>
                        <AnimatedText>{headline}</AnimatedText>
                    </HeadingMedium>
                    <TaglineRegular as="h2">
                        <AnimatedText>{teaser}</AnimatedText>
                    </TaglineRegular>

                    <div className={style.buttonContainer}>
                        {videoId && (
                            <FeatureVideo
                                videoId={videoId}
                                subTitle=""
                                isButton
                                isHexagonButton
                                title={buttonText}
                                className={style.btn}
                            />
                        )}
                    </div>
                </div>

                <Navigation location={location} sitemapPage={sitemapPage} />
            </Container>
        </BackgroundImage>
    )
}

export default Hero
