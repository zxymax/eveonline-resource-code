import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import BackgroundImage from 'features/background-image'
import { FeatureVideo } from 'features'
import Picture from 'features/picture'
import { HeadingMedium, TaglineLarge, HeadingRegular } from 'layouts/typography'
import { Section, Container, Button, Frame, Heading } from 'layouts'

import Slider from './slider'
import Faq from './faq'

import style from './SeoLandingPage.module.scss'

interface Props {
    sections: Array<SectionType>
    slug: string
}

export default function SeoPage({ sections, slug }: Props): JSX.Element {
    function getPicture(section: SectionType): JSX.Element {
        if (section && section.imageFile)
            return (
                <Picture
                    src={section.imageFile.url}
                    alt={section.imageFile.description}
                />
            )
        return <></>
    }

    function renderCtaButton(section: SectionType): JSX.Element {
        return (
            section && (
                <div className={style.buttonContainer}>
                    <Button path={section.buttonUrl}>
                        {section.buttonText}
                    </Button>
                </div>
            )
        )
    }

    function renderSection1(): JSX.Element {
        const section = sections[0]

        return (
            section && (
                <Section className={style(style.section, style.section1)}>
                    <Container>
                        <div className={style.container}>
                            <div className={style.image}>
                                {getPicture(section)}
                                <ReactMarkdown
                                    source={section.headline}
                                    className={style.heading}
                                    escapeHtml={false}
                                    renderers={{
                                        heading: ({
                                            children,
                                            level,
                                        }): JSX.Element =>
                                            level === 1 ? (
                                                <HeadingMedium>
                                                    {children}
                                                </HeadingMedium>
                                            ) : (
                                                <TaglineLarge>
                                                    {children}
                                                </TaglineLarge>
                                            ),
                                    }}
                                />
                            </div>
                            <div className={style.content}>
                                <div className={style.below}>
                                    <div className={style.text}>
                                        <ReactMarkdown
                                            className={style.item1}
                                            source={section.body}
                                            escapeHtml={false}
                                        />
                                    </div>
                                    <div className={style.button}>
                                        {renderCtaButton(section)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>
            )
        )
    }

    function renderSection2(): JSX.Element {
        const section = sections[1]

        return (
            section && (
                <Section className={style(style.section, style.section2)}>
                    {getPicture(section)}
                    <Frame className={style.frame} cutoutBottom={false}>
                        <div className={style.content}>
                            <ReactMarkdown
                                source={section.body}
                                escapeHtml={false}
                            />
                        </div>
                    </Frame>
                </Section>
            )
        )
    }

    function renderSection3(): JSX.Element {
        const section = sections[2]

        return (
            section && (
                <Section className={style(style.section, style.section3)}>
                    <Container>
                        <div className={style.heading}>
                            <Heading>{section.headline}</Heading>
                        </div>
                    </Container>
                    <div className={style.picture}>{getPicture(section)}</div>
                    <Container className={style.nopad_mobile}>
                        <Frame className={style.frame} cutoutBottom={false}>
                            <div className={style.content}>
                                <ReactMarkdown
                                    source={section.body}
                                    escapeHtml={false}
                                />
                            </div>
                        </Frame>
                    </Container>
                </Section>
            )
        )
    }

    function renderSection4(): JSX.Element {
        const section = sections[3]

        return (
            section && (
                <Section className={style(style.section, style.section4)}>
                    <Container className={style.nopad_mobile}>
                        <div className={style.image}>{getPicture(section)}</div>
                        <div className={style.content}>
                            <Frame className={style.frame} cutoutBottom={false}>
                                <div className={style.text}>
                                    <ReactMarkdown
                                        source={section.body}
                                        escapeHtml={false}
                                    />
                                </div>
                            </Frame>
                        </div>
                    </Container>
                </Section>
            )
        )
    }

    function renderSection5(): JSX.Element {
        const section = sections[4]

        return (
            section && (
                <Section className={style(style.section, style.section2)}>
                    <div className={style.contentContainer}>
                        <div className={style.side} />
                        <Frame className={style.frame} cutoutBottom={false}>
                            <div className={style.content}>
                                <ReactMarkdown
                                    source={section.body}
                                    escapeHtml={false}
                                />
                            </div>
                        </Frame>
                    </div>
                    {getPicture(section)}
                </Section>
            )
        )
    }

    function renderSectionVideo(): JSX.Element {
        // TODO get the video section, should be 0 or 1
        const section = sections[5]

        return (
            section && (
                <Section className={style(style.section, style.video)}>
                    <Container>
                        <FeatureVideo
                            image={section.imageFile.url}
                            videoId={section.videoId}
                        />
                    </Container>
                </Section>
            )
        )
    }

    function renderCards(): JSX.Element {
        const card1 = sections[6]
        const card2 = sections[7]
        const card3 = sections[8]

        const renderCard1 = card1 && card1.body && card1.imageFile && (
            <div className={style.card}>
                <div className={style.left}>
                    <HeadingRegular className={style.headingBorder}>
                        {card1.headline}
                    </HeadingRegular>
                    <ReactMarkdown source={card1.body} escapeHtml={false} />
                </div>
                <img
                    src={`${card1.imageFile.url}?fm=webp&w=590&h=950&fit=crop`}
                    alt={card1.imageFile.description}
                />
            </div>
        )

        const renderCard2 = card2 && card2.body && card2.imageFile && (
            <div className={style.card}>
                <img
                    className={style.mobileHide}
                    src={`${card2.imageFile.url}?fm=webp&w=590&h=950&fit=crop`}
                    alt={card2.imageFile.description}
                />
                <div className={style.right}>
                    <HeadingRegular className={style.headingBorder}>
                        {card2.headline}
                    </HeadingRegular>
                    <ReactMarkdown source={card2.body} escapeHtml={false} />
                </div>
            </div>
        )

        const renderCard3 = card3 && card3.body && card3.imageFile && (
            <div className={style.card}>
                <div className={style.left}>
                    <HeadingRegular className={style.headingBorder}>
                        {card3.headline}
                    </HeadingRegular>
                    <ReactMarkdown source={card3.body} escapeHtml={false} />
                </div>
                <img
                    src={`${card3.imageFile.url}?fm=webp&w=590&h=950&fit=crop`}
                    alt={card3.imageFile.description}
                />
            </div>
        )

        return (
            <Section className={style.section}>
                <Container>
                    {renderCard1}
                    {renderCard2}
                    {renderCard3}
                </Container>
            </Section>
        )
    }

    const sectionWithCta = sections && sections[0]
    const sectionSlider =
        sections &&
        sections.find((s) => s.identifier === `seo-page-${slug}-slider`)
    const sectionFaq =
        sections &&
        sections.find((s) => s.identifier === `seo-page-${slug}-faq`)

    return (
        <BackgroundImage url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg">
            <div className={style.seopage}>
                {renderSection1()}
                {renderSection2()}
                {renderSection3()}
                {renderSectionVideo()}
                {renderSection4()}
                {renderSection5()}
                <Slider section={sectionSlider} />
                {renderCtaButton(sectionWithCta)}
                {renderCards()}
                <Faq section={sectionFaq} headingStyle={style.headingBorder} />
                {renderCtaButton(sectionWithCta)}
            </div>
        </BackgroundImage>
    )
}

