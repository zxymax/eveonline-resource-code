import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'
import { GlobalState } from 'types/redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageWithSeo from 'features/page-with-seo'
import BackgroundImage from 'features/background-image'
import { Container, Section } from 'layouts'
import PageType from 'models/types/ts/pageType'
import { findSectionByIdentifier } from 'lib/pages/api'
import Hero from './components/hero'
import Video from './components/video'
import Faq from './components/faq'
import Cta from './components/cta'
import Resources from './components/resources-cards'
import s from './ReturnToEve.module.scss'
import EveInfo from './components/eve-info'
import Carousel from './components/recent-changes/Carousel'

const Comic = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)
    const dispatch = useDispatch()
    const slug = 'return-to-eve'

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page?.sectionsCollection?.items
                    const hero = findSectionByIdentifier(
                        sections,
                        'return-to-eve-hero'
                    )
                    const cta = findSectionByIdentifier(
                        sections,
                        'return-to-eve-cta'
                    )

                    const eve = findSectionByIdentifier(
                        sections,
                        'return-to-eve-eve-never-sleeps'
                    )

                    const video = findSectionByIdentifier(
                        sections,
                        'return-to-eve-video'
                    )

                    const recentChanges = findSectionByIdentifier(
                        sections,
                        'return-to-eve-recent-changes'
                    )

                    const faq = findSectionByIdentifier(
                        sections,
                        'return-to-eve-faq'
                    )

                    const resources = findSectionByIdentifier(
                        sections,
                        'return-to-eve-player-resources'
                    )

                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={false}
                            hideSitename={false}
                        >
                            <BackgroundImage
                                url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg"
                                className={s.bg}
                            >
                                <div className={s.returnToEve}>
                                    {hero && <Hero section={hero} />}
                                    <Container>
                                        {cta && <Cta section={cta} />}
                                    </Container>
                                    {eve && <EveInfo section={eve} />}
                                    {recentChanges && (
                                        <Container>
                                            <Section>
                                                <Carousel
                                                    section={recentChanges}
                                                />
                                            </Section>
                                        </Container>
                                    )}
                                    <BackgroundImage
                                        url="https://images.ctfassets.net/7lhcm73ukv5p/5A9lhNQaI1T1LpQJkg3elG/801a35580f3012b57d7278e7259e2945/return_bg_section.png"
                                        repeat="no-repeat"
                                        size="contain"
                                        // height={500}
                                        position="center top"
                                        lazy={false}
                                    >
                                        <Container>
                                            {video && <Video section={video} />}
                                            {faq && <Faq section={faq} />}
                                        </Container>
                                    </BackgroundImage>

                                    {resources && (
                                        <Container>
                                            <Resources section={resources} />
                                        </Container>
                                    )}
                                </div>
                            </BackgroundImage>
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

export default Comic

