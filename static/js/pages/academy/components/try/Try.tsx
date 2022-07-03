import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { ParagraphLarge } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import Card from './card'
import style from './try.module.scss'

interface Props {
    section: SectionType
}

const Try = ({ section }: Props): JSX.Element => {
    const {
        headline,
        body,
        contentCollection: { total, items },
    } = section
    return (
        <div className={style.try}>
            <div className={style.intro}>
                <HeadingUnderline2 title={headline} />
                <ParagraphLarge>{body}</ParagraphLarge>
            </div>

            <div className={style.content}>
                {total > 0 &&
                    items.map((item: ContentType) => (
                        <Card content={item} key={item.name} />
                    ))}
            </div>
        </div>
    )
}

export default Try
