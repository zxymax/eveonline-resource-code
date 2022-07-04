import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Container, Section, Button } from 'layouts'
import {
    HeadingMedium,
    HeadingXSmall,
    HeadingRegular,
    headingShadowSmall,
} from 'layouts/typography'
import style from './hero.module.scss'
import CountDown from '../CountDown'

interface Props {
    section: SectionType
}

/* eslint-disable react/jsx-props-no-spreading */

const Hero = ({ section }: Props): JSX.Element => {
    const dateExpire = new Date(section.date)

    return (
        <div className={style.hero}>
            <Container>
                <Section>
                    <div className={style.content}>
                        <div className={style.text}>
                            <HeadingRegular as="h1" {...headingShadowSmall}>
                                Eve Fanfest
                            </HeadingRegular>
                            <HeadingMedium {...headingShadowSmall}>
                                May <span>6-7</span> 2022
                            </HeadingMedium>
                            <HeadingXSmall as="h2" {...headingShadowSmall}>
                                Laugardalshöll Arena, Reykjavik, Iceland
                            </HeadingXSmall>
                        </div>
                        <div className={style.cta}>
                            <Button
                                target="_blank"
                                rel="noopener noreferrer"
                                path={section.buttonUrl}
                                theme="community"
                                data-id="fanfest_hero_cta"
                                size="large"
                            >
                                {section.buttonText}
                            </Button>
                        </div>
                        <CountDown
                            title={section.teaser}
                            endDate={dateExpire}
                        />
                    </div>
                </Section>
            </Container>
        </div>
    )
}

export default Hero
