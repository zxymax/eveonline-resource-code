import React from 'react'

import { findSectionByIdentifier } from 'lib/pages/api'

import { Container } from 'layouts'
import NotFound from 'pages/not-found'

// // Templates to use
import Article from '../article'

// Components to use here
import Aura from '../../components/aura'
import ImageTextCard from '../../components/imageTextCard'
import Carousel from '../../components/carousel'
import Section from '../../components/section'

// Helpers
import AcademyPageTemplateEnum from '../../models/academy-page-template-enum'
import { getSitemapPageBySlug } from '../../sitemap/selectors'

import Props from '../Props'

export default function World({
    page,
    sitemapPage,
    location,
    language,
}: Props): JSX.Element {
    const { id } = location
    // We are either on career detail page e.g. /world/slug
    if (id) {
        const articlesPage = getSitemapPageBySlug(sitemapPage, id)

        const pageTemplate = articlesPage?.template

        if (pageTemplate === AcademyPageTemplateEnum.Article) {
            return (
                <Article
                    page={page}
                    sitemapPage={articlesPage}
                    location={location}
                    language={language}
                />
            )
        }

        // Unlikely to happen but then NotFound
        return <NotFound />
    }

    // Get sections to use here
    const sections = page?.sectionsCollection?.items

    const auraSection = findSectionByIdentifier(sections, 'academy-aura')
    const imageCardSection1 = findSectionByIdentifier(
        sections,
        'academy-image-text-card-1'
    )
    const carouselSection1 = findSectionByIdentifier(
        sections,
        'academy-carousel-1'
    )
    const carouselSection2 = findSectionByIdentifier(
        sections,
        'academy-carousel-2'
    )
    const carouselSection3 = findSectionByIdentifier(
        sections,
        'academy-carousel-3'
    )
    const carouselSection4 = findSectionByIdentifier(
        sections,
        'academy-carousel-4'
    )

    return (
        <div>
            <Container>
                {auraSection && (
                    <Section>
                        <Aura section={auraSection} />
                    </Section>
                )}
                {imageCardSection1 && (
                    <Section>
                        <ImageTextCard section={imageCardSection1} />
                    </Section>
                )}
                {carouselSection1 && (
                    <Section>
                        <Carousel
                            section={carouselSection1}
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
                {carouselSection3 && (
                    <Section>
                        <Carousel
                            section={carouselSection3}
                            location={location}
                        />
                    </Section>
                )}
                {carouselSection4 && (
                    <Section>
                        <Carousel
                            section={carouselSection4}
                            location={location}
                        />
                    </Section>
                )}
            </Container>
        </div>
    )
}
