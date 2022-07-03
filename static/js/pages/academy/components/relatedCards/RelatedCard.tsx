import React from 'react'
import ContentType from 'models/types/ts/contentType'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import classNames from 'classnames'
import { ParagraphLarge } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import getUrlWithLangPrefix from 'pages/academy/helpers/getUrlWithLangPrefix'
import SectionProps from 'pages/academy/templates/SectionProps'
import style from './relatedCards.module.scss'
import Card from '../card/Card'

const RelatedCards = ({ section, location }: SectionProps): JSX.Element => {
    const {
        headline,
        body,
        contentCollection: { total, items },
    } = section
    const cx = classNames.bind(style)

    const language = useSelector((state) => getLanguage(state))

    return (
        <div className={style.relatedCards}>
            {headline && <HeadingUnderline2 title={headline} />}
            {body && (
                <ParagraphLarge className={style.desc}>{body}</ParagraphLarge>
            )}
            <div className={style.cardContainer}>
                {total > 0 &&
                    items.map((item: ContentType, index: number) => (
                        <div
                            key={item.name}
                            className={cx(style.inner, `item${index}`)}
                        >
                            <Card
                                content={item}
                                itemUrl={getUrlWithLangPrefix(
                                    language,
                                    location.page,
                                    item.buttonUrl
                                )}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default RelatedCards
