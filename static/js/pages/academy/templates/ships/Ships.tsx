import React from 'react'

import { findSectionByIdentifier } from 'lib/pages/api'

import { Container } from 'layouts'

import { getSitemapPageBySlug } from '../../sitemap/selectors'

// Templates to use
import ArticleManySections from '../article/ArticleManySections'
import ShipClass from '../ship-class'
import ShipDetails from '../ship-details'

// Components to use here
import Aura from '../../components/aura'
import Carousel from '../../components/carousel'
import ShipShowcase from '../../components/ship-showcase'
import Upsell from '../../components/upsell'
import Section from '../../components/section'

import Props from '../Props'
import style from './Ships.module.scss'

export default function Ships({
    page,
    sitemapPage,
    location,
    language,
}: Props): JSX.Element {
    // if (!page) return <></>

    const { id, subid } = location

    if (id) {
        // We are on a ship details page

        const shipClassSitemapPage = getSitemapPageBySlug(sitemapPage, id)

        if (subid) {
            // Not sure if needed here
            const shipDetailsSitemapPage = getSitemapPageBySlug(
                shipClassSitemapPage,
                subid
            )
            return (
                <ShipDetails
                    page={page}
                    sitemapPage={shipDetailsSitemapPage}
                    location={location}
                    language={language}
                />
            )
        }

        // We are on a special ships page
        if (page?.config?.hasSticky)
            return (
                <ArticleManySections
                    page={page}
                    sitemapPage={sitemapPage}
                    location={location}
                    language={language}
                />
            )

        // We are on a ship class overview page
        return (
            <ShipClass
                page={page}
                sitemapPage={sitemapPage}
                location={location}
                language={language}
            />
        )
    }

    // Get sections to use here
    const sections = page?.sectionsCollection?.items

    const auraSection = findSectionByIdentifier(sections, 'academy-aura')

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

    const shipShowcaseSection = findSectionByIdentifier(
        sections,
        'academy-ships-showcase'
    )

    const upsellSection = findSectionByIdentifier(sections, 'academy-upsell')

    // We are on the main ships page
    return (
        <div className={style.ships}>
            <Container>
                {auraSection && (
                    <Section>
                        <Aura section={auraSection} />
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
            </Container>
            {shipShowcaseSection && (
                <Section>
                    <ShipShowcase
                        section={shipShowcaseSection}
                        language={language}
                    />
                </Section>
            )}
            <Upsell section={upsellSection} />
        </div>
    )
}
