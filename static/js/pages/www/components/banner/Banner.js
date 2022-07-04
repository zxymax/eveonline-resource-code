import React from 'react'
import { sectionType } from 'models/types'
import { HeadingRegular, TaglineRegular } from 'layouts/typography'
import LinkArrow from '../shared/link-arrow'
import style from './Banner.scss'

const Banner = ({ section }) => (
    <div className={style.container}>
        <div
            className={style.banner}
            style={{ backgroundImage: `url(${section.imageFile.url})` }}
        >
            <div className={style.inner}>
                <HeadingRegular>{section.headline}</HeadingRegular>
                <TaglineRegular>{section.teaser}</TaglineRegular>
                <LinkArrow className={style.link} path={section.buttonUrl}>
                    {section.buttonText}
                </LinkArrow>
            </div>
        </div>
    </div>
)

Banner.propTypes = {
    section: sectionType.isRequired,
}

export default Banner
