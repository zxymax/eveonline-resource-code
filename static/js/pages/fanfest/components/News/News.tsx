import React from 'react'
import cx from 'classnames'
import _map from 'lodash/map'
import SectionType from 'models/types/ts/sectionType'
import { Section, Visibility } from 'layouts'
import { HeadingUnderline2 } from 'layouts/headings'
import { ParagraphLarge } from 'layouts/typography'
import style from './News.module.scss'

interface Props {
    section: SectionType
    logo?: boolean
}

const News = ({ section, logo }: Props): JSX.Element => {
    const items = _map(section.contentCollection.items, (item, index) => (
        <div
            key={index}
            className={cx(style.content, {
                [style.logo]: logo,
            })}
            style={{ backgroundImage: `url(${item.imageFile.url})` }}
        >
            {item.headline && <h4>{item.headline}</h4>}
        </div>
    ))

    return (
        <Section>
            <div className={style.news}>
                <HeadingUnderline2 title={section.name} color="#F67C0F" />
                <ParagraphLarge>{section.headline}</ParagraphLarge>
                <Visibility direction="fadeUp">
                    <div className={style.newsWrapper}>{items}</div>
                </Visibility>
            </div>
        </Section>
    )
}

News.defaultProps = {
    logo: false,
}

export default News
