import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { HeadingUnderline2 } from 'layouts/headings'
import Markdown from 'react-markdown'
import style from './Resources.module.scss'

interface Props {
    section: SectionType
}

const Resources = ({ section }: Props): JSX.Element => {
    const {
        headline,
        // body,
        contentCollection: { total, items },
    } = section
    return (
        <div className={style.resources}>
            <div className={style.intro}>
                <HeadingUnderline2 title={headline} color="#30B2E6" />
                {/* <Markdown content={body} /> */}
            </div>
            <div className={style.content}>
                {total > 0 &&
                    items.map((item: ContentType) => (
                        <div className={style.card} key={item.name}>
                            <Markdown source={item.body} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Resources

