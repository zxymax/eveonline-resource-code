import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import { Container } from 'layouts'
import { HeadingXSmall, ParagraphRegular } from 'layouts/typography'
import Gallery from '../gallery'
import Links from '../links'
import s from './Chapter.module.scss'

interface Props {
    section: SectionType
    links: SectionType
}

const Chapter = ({ section, links }: Props): JSX.Element => {
    const { headline, body, buttonText } = section

    return (
        <section className={s.chapter}>
            <Container>
                {headline && (
                    <HeadingXSmall className={s.title}>
                        {headline}
                    </HeadingXSmall>
                )}
                <div className={s.content}>
                    {body && (
                        <div>
                            <ReactMarkdown
                                source={body}
                                renderers={{
                                    paragraph: ({ children }) => (
                                        <ParagraphRegular>
                                            {children}
                                        </ParagraphRegular>
                                    ),
                                }}
                            />
                        </div>
                    )}
                    {links && <Links links={links}>{buttonText}</Links>}
                </div>
            </Container>
            <Gallery section={section} />
        </section>
    )
}

export default Chapter
