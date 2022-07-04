import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Button, Visibility } from 'layouts'
import { HeadingMedium, TaglineLarge } from 'layouts/typography'
import style from './bottomCTA.module.scss'

interface Props {
    section: SectionType
}

const BottomCTA = ({ section }: Props): JSX.Element => {
    return (
        <div className={style.bottomCTA}>
            <Visibility direction="fadeUp" transitionDelay="0.3s">
                <HeadingMedium>{section.headline}</HeadingMedium>
                <TaglineLarge>{section.teaser}</TaglineLarge>

                <div className={style.content}>
                    <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        path={section.buttonUrl}
                        theme="community"
                        size="large"
                        data-id="fanfest_bottom_cta"
                    >
                        {section.buttonText}
                    </Button>
                </div>
            </Visibility>
        </div>
    )
}

export default BottomCTA
