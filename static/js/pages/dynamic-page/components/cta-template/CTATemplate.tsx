import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import CTA from 'features/jumbotron/components/cta'
import { Container } from 'layouts'
import { HeadingMedium, HeadingSmall } from 'layouts/typography'
import { ThemeContext } from '../../context'
import style from './CTATemplate.module.scss'

interface Props {
    section: SectionType
}

const CTATemplate = ({ section }: Props): JSX.Element => (
    <Container className={style.cta}>
        <ReactMarkdown
            className={style.text}
            source={section.body}
            escapeHtml={false}
            renderers={{
                heading: ({ children, level }) =>
                    level === 2 ? (
                        <HeadingMedium as="h2">{children}</HeadingMedium>
                    ) : (
                        <HeadingSmall as="h3">{children}</HeadingSmall>
                    ),
            }}
        />
        <div className={style.content}>
            <ThemeContext.Consumer>
                {(colorTheme) => (
                    <CTA
                        section={section.contentCollection.items}
                        data-id="dynamic-bottom-cta-button"
                        className={style.buttons}
                        custom={{
                            color: colorTheme.CTA.color,
                            background: colorTheme.CTA.background,
                        }}
                    />
                )}
            </ThemeContext.Consumer>
        </div>
    </Container>
)

export default CTATemplate
