import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import cx from 'classnames'
import SectionType from 'models/types/ts/sectionType'
import { Container, Section } from 'layouts'
import { HeadingUnderline2 } from 'layouts/headings'
import style from './Faq.module.scss'

interface Props {
    section1: SectionType
    section2: SectionType
    section3: SectionType
}

const Faq = ({ section1, section2, section3 }: Props): JSX.Element => {
    const [activeTab, setActiveTab] = useState(section1)

    const renderFaq = (): JSX.Element => {
        return (
            <div className={style.content} key={activeTab?.name}>
                {activeTab.teaser && (
                    <div>
                        <ReactMarkdown source={activeTab.teaser} />
                    </div>
                )}
                {activeTab.body && (
                    <div>
                        <ReactMarkdown source={activeTab.body} />
                    </div>
                )}
            </div>
        )
    }

    return (
        <Container wide className={style.faqContainer}>
            <Section hasContent={section1 !== undefined}>
                <Container>
                    <div className={style.faq}>
                        <HeadingUnderline2 title="FAQ" color="#F67C0F" />
                        <div className={style.toggle}>
                            {section1 && (
                                <div
                                    className={cx(style.btnToggle, {
                                        [style.on]: activeTab === section1,
                                    })}
                                    role="presentation"
                                    onClick={() => setActiveTab(section1)}
                                >
                                    {section1.headline}
                                </div>
                            )}
                            {section2 && (
                                <div
                                    className={cx(style.btnToggle, {
                                        [style.on]: activeTab === section2,
                                    })}
                                    role="presentation"
                                    onClick={() => setActiveTab(section2)}
                                >
                                    {section2.headline}
                                </div>
                            )}
                            {section3 && (section3.body || section3.teaser) && (
                                <div
                                    className={cx(style.btnToggle, {
                                        [style.on]: activeTab === section3,
                                    })}
                                    role="presentation"
                                    onClick={() => setActiveTab(section3)}
                                >
                                    {section3.headline}
                                </div>
                            )}
                        </div>
                        {renderFaq()}
                    </div>
                </Container>
            </Section>
        </Container>
    )
}

export default Faq
