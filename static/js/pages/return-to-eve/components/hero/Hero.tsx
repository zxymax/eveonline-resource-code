import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Button, Container } from 'layouts'
import BackgroundImage from 'features/background-image'
import { HeadingMedium, HeadingSmall } from 'layouts/typography'
import s from './Hero.module.scss'

interface Props {
    section: SectionType
}

const Hero = ({ section }: Props): JSX.Element => {
    const {
        headline,
        // body,
        teaser,
        imageFile,
        buttonText,
        buttonUrl,
    } = section

    return (
        <BackgroundImage
            url="https://images.ctfassets.net/7lhcm73ukv5p/47bKU9R3xBClrNn1nyos80/d6802797df404d411ef3259bfedab604/return_nebs__1_.jpg"
            className={s.bg}
            repeat="no-repeat"
            size="cover"
            height={500}
            position="center top"
            lazy={false}
        >
            <div className={s.template}>
                <Container>
                    <div className={s.content}>
                        <div className={s.text}>
                            <HeadingMedium>{headline}</HeadingMedium>
                            <HeadingSmall>{teaser}</HeadingSmall>
                            {buttonUrl && (
                                <Button
                                    custom={{ color: '#000' }}
                                    className={s.btn}
                                    size="regular"
                                    path={buttonUrl}
                                >
                                    {buttonText}
                                </Button>
                            )}
                        </div>
                        <div className={s.image}>
                            {imageFile && <img src={imageFile.url} alt="" />}
                        </div>
                    </div>
                </Container>
            </div>
        </BackgroundImage>
    )
}

export default Hero

