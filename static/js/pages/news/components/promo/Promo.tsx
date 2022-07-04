import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Container, Button } from 'layouts'
import { HeadingMedium, TaglineLarge } from 'layouts/typography'
import AnimatedText from 'layouts/animated-text'
import BackgroundImage from 'features/background-image'
import style from './Promo.module.scss'

interface Props {
    section: SectionType
}

const Promo = ({ section }: Props): JSX.Element => {
    return (
        <>
            {section.imageFile && section.imageFile.url && (
                <BackgroundImage
                    url={section.imageFile.url}
                    repeat="no-repeat"
                    size="cover"
                    position="center top"
                    className={style.bottomPromo}
                >
                    <Container>
                        <HeadingMedium as="h2">
                            <AnimatedText>{section.headline}</AnimatedText>
                        </HeadingMedium>
                        <TaglineLarge>
                            <AnimatedText delay="0.35s">
                                {section.teaser}
                            </AnimatedText>
                        </TaglineLarge>
                        <div className={style.content}>
                            {section.buttonUrl && (
                                <Button
                                    className={style.btn}
                                    path={section.buttonUrl}
                                    size="large"
                                    theme={
                                        section.theme === 'Yellow'
                                            ? 'quadrant'
                                            : 'primary'
                                    }
                                >
                                    {section.buttonText}
                                </Button>
                            )}
                        </div>
                    </Container>
                </BackgroundImage>
            )}
        </>
    )
}

export default Promo

