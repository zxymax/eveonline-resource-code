import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { HeadingUnderline2 } from 'layouts/headings'
import Markdown from '../markdown'
import style from './skillsCards.module.scss'

interface Props {
    section: SectionType
}

const SkillsCards = ({ section }: Props): JSX.Element => {
    const {
        headline,
        body,
        contentCollection: { total, items },
    } = section
    return (
        <div className={style.skillsCards}>
            <div className={style.intro}>
                <HeadingUnderline2 title={headline} />
                <Markdown content={body} />
            </div>
            <div className={style.content}>
                {total > 0 &&
                    items.map((item: ContentType) => (
                        <div className={style.card} key={item.name}>
                            <Markdown content={item.body} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SkillsCards
