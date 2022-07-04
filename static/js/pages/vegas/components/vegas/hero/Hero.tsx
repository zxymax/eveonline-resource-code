import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import { Container, Section, SvgIcon, Button } from 'layouts'
import { HeadingMedium, HeadingSmall } from 'layouts/typography'
import style from './Hero.module.scss'

interface Props {
    section: SectionType
}

/**
 * Hero component for Vegas
 * @param {SectionType} section This is the section you want inside.
 */
const Hero = ({ section }: Props): JSX.Element => (
    <Container>
        <Section hasContent={section !== undefined}>
            <div className={style.content}>
                <div className={style.inner}>
                    <div className={style.logo}>
                        <SvgIcon
                            //   width={350}
                            //   height={165}
                            //   className={style.heroSvgIcon}
                            name="vegas-logo"
                            fill="white"
                        />
                    </div>
                    <ReactMarkdown
                        source={section.headline}
                        renderers={{
                            paragraph: ({ children }): JSX.Element => (
                                <HeadingMedium>{children}</HeadingMedium>
                            ),
                        }}
                    />
                    <HeadingSmall>{section.teaser}</HeadingSmall>
                    <HeadingSmall>{section.body}</HeadingSmall>
                    <div className={style.cta}>
                        <Button
                            target="_blank"
                            rel="noopener noreferrer"
                            path={section.buttonUrl}
                            theme="community"
                            size="large"
                        >
                            {section.buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    </Container>
)

export default Hero

