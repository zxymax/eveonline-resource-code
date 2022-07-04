import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import Markdown from 'react-markdown'
import { ParagraphLarge, ParagraphRegular } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import s from './Faq.module.scss'

interface Props {
    section: SectionType
}

const Hero = ({ section }: Props): JSX.Element => {
    const { headline, body } = section

    return (
        <div className={s.faq}>
            <div className={s.intro}>
                <HeadingUnderline2 title={headline} color="#30B2E6" />
            </div>
            <div className={s.content}>
                <Markdown
                    source={body}
                    renderers={{
                        heading: ({ children }) => (
                            <ParagraphLarge as="h3">{children}</ParagraphLarge>
                        ),
                        paragraph: ({ children }): JSX.Element => (
                            <ParagraphRegular>{children}</ParagraphRegular>
                        ),
                    }}
                />
            </div>
        </div>
    )
}

export default Hero

