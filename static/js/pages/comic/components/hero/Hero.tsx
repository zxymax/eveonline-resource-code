import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Container, Button } from 'layouts'
import AnimatedText from 'layouts/animated-text'
import BackgroundImage from 'features/background-image'
import { HeadingMedium, TaglineRegular } from 'layouts/typography'
import s from './Hero.module.scss'

interface Props {
    section: SectionType
}

const Hero = ({ section }: Props): JSX.Element => {
    const { headline, body, imageFile, buttonText, buttonUrl } = section

    return (
        <BackgroundImage
            url={imageFile ? imageFile.url : ''}
            repeat="no-repeat"
            size="cover"
            height={500}
            position="center top"
            className={s.hero}
            lazy={false}
        >
            <Container className={s.container}>
                <HeadingMedium>
                    <AnimatedText>{headline}</AnimatedText>
                </HeadingMedium>
                <TaglineRegular as="h2">
                    <AnimatedText>{body}</AnimatedText>
                </TaglineRegular>
                {buttonUrl && (
                    <Button className={s.btn} path={buttonUrl} size="small">
                        {buttonText}
                    </Button>
                )}
            </Container>
        </BackgroundImage>
    )
}

export default Hero
