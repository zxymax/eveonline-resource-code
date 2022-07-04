import React from 'react'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { Container, Section, HeadingUnderline } from 'layouts'
import style from './News.module.scss'

interface Props {
    section: SectionType
}

const News = ({ section }: Props): JSX.Element => {
    const items = _map(
        section.contentCollection.items,
        (item: ContentType, key: string) => (
            <div className={style.item} key={key}>
                {item && <ReactMarkdown source={item.body} />}
            </div>
        )
    )

    return (
        <Container>
            <Section hasContent={section !== undefined}>
                <div className={style.content}>
                    <HeadingUnderline
                        title={section.headline}
                        color="#F67C0F"
                    />
                    <div className={style.news}>{items}</div>
                </div>
            </Section>
        </Container>
    )
}

export default News

