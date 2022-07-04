import React from 'react'
import { findSectionByIdentifier } from 'lib/pages/api'
import { NOT_FOUND } from 'redux-first-router'
import LazyLoad from 'react-lazyload'
import PageBySlugQuery from 'queries/page-by-slug'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from 'types'
import PageType from 'models/types/ts/pageType'
import BackgroundImage from 'features/background-image'
import PageWithSeo from 'features/page-with-seo/PageWithSeo'
import { Container, Section } from 'layouts'
import FeatureVideo from 'features/featureVideo'
import style from './Fanfest.module.scss'
import Hero from './components/Hero'
import News from './components/News'
import Events2 from './components/Events2'
import GoodToKnow from './components/GoodToKnow'
import Photos from './components/Photos'
import Faq from './components/Faq'
import BottomCTA from './components/BottomCTA'

const Fanfest = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)
    const dispatch = useDispatch()
    const slug = 'fanfest'

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page?.sectionsCollection?.items
                    const hero = findSectionByIdentifier(
                        sections,
                        'fanfest-hero'
                    )
                    const videoSection = findSectionByIdentifier(
                        sections,
                        'fanfest-video-section'
                    )
                    const newsSection = findSectionByIdentifier(
                        sections,
                        'fanfest-news'
                    )
                    const sponsors = findSectionByIdentifier(
                        sections,
                        'fanfest-sponsors'
                    )
                    const eventsSection = findSectionByIdentifier(
                        sections,
                        'fanfest20-events'
                    )
                    const goodToKnowSection = findSectionByIdentifier(
                        sections,
                        'good-to-know'
                    )

                    const photoSection = findSectionByIdentifier(
                        sections,
                        'fanfest-photos'
                    )

                    const faqSection1 = findSectionByIdentifier(
                        sections,
                        'fanfest-faq'
                    )
                    const faqSection2 = findSectionByIdentifier(
                        sections,
                        'fanfest-iceland-faq'
                    )
                    const faqSection3 = findSectionByIdentifier(
                        sections,
                        'fanfest-survival-guide-faq'
                    )
                    const bottomSection = findSectionByIdentifier(
                        sections,
                        'fanfest-bottom-cta'
                    )

                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={false}
                            hideSitename={false}
                        >
                            <div className={style.Fanfest}>
                                <BackgroundImage
                                    url="//images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg"
                                    repeat="repeat"
                                    size="contain"
                                    position="top center"
                                >
                                    <BackgroundImage
                                        url="https://images.ctfassets.net/7lhcm73ukv5p/2gCNmVCh4xuxQApftg46jE/4787b41fa6ff9bd3a7535ae87b504323/fanfest-hero-22.jpg"
                                        repeat="no-repeat"
                                        size="contain"
                                        position="center top"
                                        className={style.hero}
                                    >
                                        <div className={style.hero}>
                                            {hero && (
                                                <Section>
                                                    <Hero section={hero} />
                                                </Section>
                                            )}
                                        </div>
                                        {videoSection && (
                                            <Container>
                                                <FeatureVideo
                                                    videoId={
                                                        videoSection.videoId
                                                    }
                                                    image={
                                                        videoSection.imageFile
                                                            ?.url
                                                    }
                                                    title={
                                                        videoSection.headline
                                                    }
                                                    subTitle={
                                                        videoSection.teaser
                                                    }
                                                />
                                            </Container>
                                        )}
                                        <Container>
                                            {newsSection && (
                                                <News section={newsSection} />
                                            )}
                                        </Container>
                                        {sponsors && (
                                            <Container>
                                                <News section={sponsors} logo />
                                            </Container>
                                        )}
                                        {/* {VenueSection && (
                                            <Venue section={VenueSection} />
                                        )} */}
                                        {eventsSection && (
                                            <Container>
                                                <Events2
                                                    section={eventsSection}
                                                />
                                            </Container>
                                        )}

                                        <Container>
                                            {goodToKnowSection && (
                                                <GoodToKnow
                                                    section={goodToKnowSection}
                                                />
                                            )}
                                        </Container>
                                        {photoSection && (
                                            <Photos section={photoSection} />
                                        )}
                                        {faqSection1 && faqSection2 && (
                                            <LazyLoad
                                                height={1600}
                                                offset={200}
                                            >
                                                <Faq
                                                    section1={faqSection1}
                                                    section2={faqSection2}
                                                    section3={faqSection3}
                                                />
                                            </LazyLoad>
                                        )}
                                        {bottomSection && (
                                            <BottomCTA
                                                section={bottomSection}
                                            />
                                        )}
                                    </BackgroundImage>
                                </BackgroundImage>
                            </div>
                        </PageWithSeo>
                    )
                }

                // page not found in contentful
                dispatch({ type: NOT_FOUND })
                return <></>
            }}
        </PageBySlugQuery>
    )
}

export default Fanfest
