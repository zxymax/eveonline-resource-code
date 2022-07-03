import React from 'react'
import ContentType from 'models/types/ts/contentType'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import { HeadingUnderline2 } from 'layouts/headings'
import getUrlWithLangPrefix from 'pages/academy/helpers/getUrlWithLangPrefix'
import CareerBadge from './CareerBadge'

import SectionProps from '../../templates/SectionProps'
import style from './CareerBadges.module.scss'

const CareerBadges = ({ section, location }: SectionProps): JSX.Element => {
    const {
        headline,
        contentCollection: { total, items },
    } = section

    const language = useSelector((state) => getLanguage(state))

    return (
        <div className={style.careers}>
            <HeadingUnderline2 title={headline} />

            <div className={style.content}>
                {total > 0 &&
                    items.map((item: ContentType) => (
                        <CareerBadge
                            item={item}
                            itemUrl={getUrlWithLangPrefix(
                                language,
                                location.page,
                                item.buttonUrl
                            )}
                            key={item.sys.id}
                        />
                    ))}
            </div>
        </div>
    )
}

export default CareerBadges
