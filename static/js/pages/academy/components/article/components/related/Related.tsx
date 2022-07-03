import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import PageLocationType from 'models/page-location-type'
import LanguageType from 'models/language-type'
import { HeadingUnderline2 } from 'layouts/headings'
import getUrlWithLangPrefix from '../../../../helpers/getUrlWithLangPrefix'
import Card from '../../../card'
import style from './Related.module.scss'

interface Props {
    section: SectionType
    location: PageLocationType
    language: LanguageType
}

const Related = ({ section, location, language }: Props): JSX.Element => {
    const {
        headline,
        contentCollection: { total, items },
    } = section
    return (
        <div className={style.related}>
            {headline && <HeadingUnderline2 title={section.headline} />}
            <div className={style(style.content, style[total])}>
                {total > 0 &&
                    items.map((item: ContentType) => (
                        <Card
                            content={item}
                            itemUrl={getUrlWithLangPrefix(
                                language,
                                location.page,
                                item.buttonUrl
                            )}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Related
