import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import { Container, Section, HeadingUnderline, Button } from 'layouts'
import BackgroundImage from 'features/background-image'
import style from './Tickets.module.scss'

interface Props {
    section: SectionType
}

const Tickets = ({ section }: Props): JSX.Element => (
    <BackgroundImage
        url={section.imageFile.url}
        repeat="no-repeat"
        size="cover"
        position="center top"
    >
        <Container>
            <Section hasContent={section !== undefined}>
                <div className={style.content}>
                    <HeadingUnderline
                        title={section.headline}
                        color="#F67C0F"
                    />
                    <div className={style.btnContainer}>
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
                    <div className={style.btnBelow}>{section.teaser}</div>
                    <div className={style.disclaimer}>
                        <ReactMarkdown source={section.body} />
                    </div>
                </div>
            </Section>
        </Container>
    </BackgroundImage>
)

export default Tickets

