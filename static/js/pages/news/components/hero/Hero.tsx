/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Translate } from 'react-localize-redux'
import SectionType from 'models/types/ts/sectionType'
import { Container, Button } from 'layouts'
import AnimatedText from 'layouts/animated-text'
import { FeatureVideo } from 'features'
import {
    HeadingMedium,
    TaglineRegular,
    headingShadowSmall,
} from 'layouts/typography'
// import PatchNotesTest from '../patch-notes-carousel'
import style from './Hero.module.scss'

interface Props {
    section: SectionType
}

const Hero = ({ section }: Props): JSX.Element => {
    const { headline, teaser, buttonText, buttonUrl, videoId } = section

    return (
        <div className={style.hero}>
            <Container className={style.content}>
                <div className={style.text}>
                    <HeadingMedium {...headingShadowSmall}>
                        <AnimatedText>{headline}</AnimatedText>
                    </HeadingMedium>
                    <TaglineRegular as="h2" {...headingShadowSmall}>
                        <AnimatedText>{teaser}</AnimatedText>
                    </TaglineRegular>

                    <div className={style.buttonContainer}>
                        {videoId && (
                            <Translate>
                                {({ translate }) => (
                                    <FeatureVideo
                                        videoId={videoId}
                                        subTitle=""
                                        isButton
                                        title={translate('news.viewTrailer')}
                                        className={style.btn}
                                    />
                                )}
                            </Translate>
                        )}
                        {buttonText && (
                            <Button
                                theme="quadrant"
                                size="small"
                                path={buttonUrl}
                                data-id="eveNav_playFree"
                            >
                                {buttonText}
                            </Button>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Hero
