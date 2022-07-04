import React from 'react'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { Section, Container } from 'layouts'
import { HeadingRegular } from 'layouts/typography'
import FaqStructuredData from 'features/structured-data/FaqStructuredData'

import style from './Faq.module.scss'

interface Props {
    section: SectionType
    headingStyle: string
}

export default function Faq({ section, headingStyle }: Props): JSX.Element {
    const items =
        section && section.contentCollection && section.contentCollection.items

    const renderItems = _map(items, (item: ContentType, key: string) => (
        <div className={style.items} key={key}>
            <p className={style.question}>{item.headline}</p>
            <div className={style.answer}>
                <ReactMarkdown source={item.body} escapeHtml={false} />
            </div>
        </div>
    ))

    if (section && items) {
        return (
            <Section className={style.faq}>
                <Container>
                    <HeadingRegular className={headingStyle}>
                        {section.headline}
                    </HeadingRegular>
                    {renderItems}
                </Container>
                <FaqStructuredData items={items} />
            </Section>
        )
    }

    return <></>
}

