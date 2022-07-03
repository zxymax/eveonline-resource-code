import React from 'react'
import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import Aura from '../../components/aura'
import CareerBadges from '../../components/career-badges'
import ContentCards from '../../components/content-cards'
import Empires from '../../components/empires'
import SkillCards from '../../components/skillsCards'
import Carousel from '../../components/carousel'
import VideoCarousel from '../../components/carousel/video-carousel'
import Section from '../../components/section'
import Props from '../Props'
import style from './Frontpage.module.scss'

export default function Frontpage({ page, location }: Props): JSX.Element {
    if (page) {
        const sections = page?.sectionsCollection?.items

        const auraSection = findSectionByIdentifier(sections, 'academy-aura')

        const badgeSection = findSectionByIdentifier(
            sections,
            'academy-career-badges'
        )

        const carouselSection1 = findSectionByIdentifier(
            sections,
            'academy-carousel-1'
        )

        const cardsSection = findSectionByIdentifier(sections, 'academy-cards')

        const empiresSection = findSectionByIdentifier(
            sections,
            'academy-empires'
        )

        const carouselSection2 = findSectionByIdentifier(
            sections,
            'academy-carousel-2'
        )

        const videoCarouselSection = findSectionByIdentifier(
            sections,
            'academy-video-carousel'
        )

        const communityResourcesSection = findSectionByIdentifier(
            sections,
            'eve-academy-community-resources'
        )

        if (sections) {
            return (
                <div className={style.frontpage}>
                    <Container>
                        {auraSection && (
                            <Section>
                                <Aura section={auraSection} />{' '}
                            </Section>
                        )}

                        {badgeSection && (
                            <Section>
                                <CareerBadges
                                    section={badgeSection}
                                    location={location}
                                />
                            </Section>
                        )}
                        {carouselSection1 && (
                            <Section>
                                <Carousel
                                    section={carouselSection1}
                                    location={location}
                                />{' '}
                            </Section>
                        )}
                        {cardsSection && (
                            <Section>
                                <ContentCards
                                    section={cardsSection}
                                    location={location}
                                />
                            </Section>
                        )}
                        {carouselSection2 && (
                            <Section>
                                <Carousel
                                    section={carouselSection2}
                                    location={location}
                                />
                            </Section>
                        )}
                    </Container>
                    {empiresSection && (
                        <Section>
                            <Empires section={empiresSection} />
                        </Section>
                    )}
                    <Container>
                        {videoCarouselSection && (
                            <Section>
                                <VideoCarousel section={videoCarouselSection} />
                            </Section>
                        )}
                    </Container>
                    {communityResourcesSection && (
                        <Container>
                            <Section>
                                <SkillCards
                                    section={communityResourcesSection}
                                />
                            </Section>
                        </Container>
                    )}
                </div>
            )
        }
    }
    return <p>Not found</p>
}
