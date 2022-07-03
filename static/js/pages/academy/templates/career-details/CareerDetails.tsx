import React from 'react'

import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import Section from '../../components/section'
import Carousel from '../../components/carousel'
import Activities from '../../components/activites'
import ImageTextCard from '../../components/imageTextCard'
import SkillCards from '../../components/skillsCards'
import Upsell from '../../components/upsell'
import Try from '../../components/try'
import VideoCarousel from '../../components/carousel/video-carousel'
import Props from '../Props'
// import style from './CareerDetails.module.scss'

export default function CareerDetails({ page, location }: Props): JSX.Element {
    if (!page) return <></>

    const sections = page?.sectionsCollection?.items

    const carouselSection1 = findSectionByIdentifier(
        sections,
        'academy-carousel-1'
    )
    const activitiesSection = findSectionByIdentifier(
        sections,
        'academy-activities'
    )
    const carouselSection2 = findSectionByIdentifier(
        sections,
        'academy-carousel-2'
    )
    const imageTextCardSection1 = findSectionByIdentifier(
        sections,
        'academy-image-text-card-1'
    )
    const skillsSection = findSectionByIdentifier(
        sections,
        'academy-skills-cards'
    )
    const imageTextCardSection2 = findSectionByIdentifier(
        sections,
        'academy-image-text-card-2'
    )
    const tryOutSection = findSectionByIdentifier(sections, 'academy-try')
    const upsellSection = findSectionByIdentifier(sections, 'academy-upsell')
    const videoCarouselSection = findSectionByIdentifier(
        sections,
        'academy-video-carousel'
    )
    const communityResourcesSection = findSectionByIdentifier(
        sections,
        'eve-academy-community-resources'
    )

    // We are on main ships page
    return (
        <>
            <Container>
                {carouselSection1 && (
                    <Section>
                        <Carousel
                            section={carouselSection1}
                            location={location}
                        />
                    </Section>
                )}
                {activitiesSection && (
                    <Section>
                        <Activities
                            section={activitiesSection}
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
                {imageTextCardSection1 && (
                    <Section>
                        <ImageTextCard section={imageTextCardSection1} />
                    </Section>
                )}
                {skillsSection && (
                    <Section>
                        <SkillCards section={skillsSection} />
                    </Section>
                )}
                {imageTextCardSection2 && (
                    <Section>
                        <ImageTextCard section={imageTextCardSection2} />
                    </Section>
                )}
                {tryOutSection && (
                    <Section>
                        <Try section={tryOutSection} />
                    </Section>
                )}
            </Container>
            {upsellSection && <Upsell section={upsellSection} />}
            {videoCarouselSection && (
                <Container>
                    <Section>
                        <VideoCarousel section={videoCarouselSection} />
                    </Section>
                </Container>
            )}
            {communityResourcesSection && (
                <Container>
                    <Section>
                        <SkillCards section={communityResourcesSection} />
                    </Section>
                </Container>
            )}
        </>
    )
}
