import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ReactMarkdown from 'react-markdown'
import cx from 'classnames'
import { HeadingMedium, HeadingSmall, ParagraphLarge } from 'layouts/typography'
import CTA from 'features/jumbotron/components/cta'
import { ThemeContext } from '../../context'
import s from './Hero.module.scss'

interface Props {
    section: SectionType
}

const Hero = ({ section }: Props): JSX.Element => {
    const { teaser, body, contentCollection } = section

    return (
        <ThemeContext.Consumer>
            {(colorTheme) => (
                <div className={cx(s.hero)}>
                    <div className={s.content}>
                        {teaser && (
                            <ParagraphLarge
                                as="span"
                                className={s.date}
                                textTransform="uppercase"
                                fontWeight={500}
                            >
                                {teaser}
                            </ParagraphLarge>
                        )}
                        <ReactMarkdown
                            source={body}
                            renderers={{
                                heading: ({ children, level }) =>
                                    level === 1 ? (
                                        <HeadingMedium>
                                            {children}
                                        </HeadingMedium>
                                    ) : (
                                        <HeadingSmall>{children}</HeadingSmall>
                                    ),
                            }}
                            escapeHtml={false}
                        />
                        <CTA
                            custom={{
                                color: colorTheme.CTA.color,
                                background: colorTheme.CTA.background,
                                size: 'small',
                            }}
                            section={contentCollection.items}
                            alignLeft
                            data-id="dynamic-hero-cta-button"
                            className={s.cta}
                        />
                    </div>
                </div>
            )}
        </ThemeContext.Consumer>
    )
}

export default Hero
