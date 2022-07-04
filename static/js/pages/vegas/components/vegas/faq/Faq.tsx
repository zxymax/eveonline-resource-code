import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Container, Section, HeadingUnderline } from 'layouts'
import SectionType from 'models/types/ts/sectionType'
import style from './Faq.module.scss'

interface Props {
    section: SectionType
}

const Faq = ({ section }: Props): JSX.Element => (
    <Container>
        <Section hasContent={section !== undefined}>
            <div className={style.content}>
                <HeadingUnderline title={section.headline} color="#F67C0F" />
                <div className={style.faq}>
                    <div>
                        <ReactMarkdown source={section.teaser} />
                    </div>
                    <div>
                        <ReactMarkdown source={section.body} />
                    </div>
                </div>
            </div>
        </Section>
    </Container>
)

export default Faq

