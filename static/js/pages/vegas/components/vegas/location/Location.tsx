import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Container, Section, HeadingUnderline } from 'layouts'
import { HeadingSmall, ParagraphLarge } from 'layouts/typography'
import Picture from 'features/picture'
import Props from './Props'
import style from './Location.module.scss'

const Location = ({ section, mapUrl }: Props): JSX.Element => (
    <div className={style.content}>
        <Container>
            <Section hasContent={section !== undefined}>
                <HeadingUnderline title={section.headline} color="#F67C0F" />
            </Section>
        </Container>
        <div className={style.map}>
            <iframe
                title="Hotel Location"
                src={mapUrl}
                width="1600"
                height="600"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
            />
        </div>
        <Container>
            <Section hasContent={section !== undefined}>
                <div className={style.details}>
                    <div className={style.left}>
                        <HeadingSmall>{section.teaser}</HeadingSmall>
                        <ParagraphLarge>
                            <div className={style.content}>
                                <ReactMarkdown source={section.body} />
                            </div>
                        </ParagraphLarge>
                    </div>
                    <div className={style.right}>
                        <Picture
                            widthPercentage={50}
                            src={section.imageFile.url}
                            alt="Cards and Chips"
                        />
                    </div>
                </div>
            </Section>
        </Container>
    </div>
)

export default Location

