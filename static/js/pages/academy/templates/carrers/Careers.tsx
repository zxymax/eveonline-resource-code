import React from 'react'

import { findSectionByIdentifier } from 'lib/pages/api'

import { Container } from 'layouts'
import NotFound from 'pages/not-found'

// Templates to use
import Article from '../article'
import Activity from '../activity'
import CommunityResources from '../community-resources'
import CareerDetails from '../career-details'

// Components to use here
import Aura from '../../components/aura'
import CareerBadges from '../../components/career-badges'
import Carousel from '../../components/carousel'
import VideoCarousel from '../../components/carousel/video-carousel'
import Activities from '../../components/activites'
import Section from '../../components/section'

// Helpers
import AcademyPageTemplateEnum from '../../models/academy-page-template-enum'
import { getSitemapPageBySlug } from '../../sitemap/selectors'

import Props from '../Props'
import style from './Careers.module.scss'

export default function Careers({
    page,
    sitemapPage,
    location,
    language,
}: Props): JSX.Element {
    // if (!page) return <></>

    const { id, subid } = location

    // Get the part of the sitemap here under careers

    // We are either on career detail page e.g. /careers/explorer
    if (id) {
        // Get the sub careers page we are on

        const detailsPage = getSitemapPageBySlug(sitemapPage, id)

        if (subid) {
            // We are on a subpage of a career details page
            const detailsSubpage = getSitemapPageBySlug(detailsPage, subid)

            const pageTemplate = detailsSubpage?.template

            if (pageTemplate === AcademyPageTemplateEnum.Article) {
                return (
                    <Article
                        page={page}
                        sitemapPage={detailsSubpage}
                        location={location}
                        language={language}
                    />
                )
            }
            if (pageTemplate === AcademyPageTemplateEnum.Activity) {
                return (
                    <Activity
                        page={page}
                        sitemapPage={detailsSubpage}
                        location={location}
                        language={language}
                    />
                )
            }

            // Unlikely to happen but then NotFound
            return <NotFound />
        }

        // Can be on special page under /careers that is not career details
        if (
            detailsPage?.template === AcademyPageTemplateEnum.CommunityResources
        ) {
            return (
                <CommunityResources
                    page={page}
                    sitemapPage={detailsPage}
                    location={location}
                    language={language}
                />
            )
        }

        // We are on a careers details page
        return (
            <CareerDetails
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
    const badgeSection = findSectionByIdentifier(
        sections,
        'academy-career-badges'
    )
    const carouselSection1 = findSectionByIdentifier(
        sections,
        'academy-carousel-1'
    )
    const videoCarouselSection = findSectionByIdentifier(
        sections,
        'academy-video-carousel'
    )

    const activitesSection = findSectionByIdentifier(
        sections,
        'academy-activities'
    )

    // We are on careers main page
    return (
        <div className={style.careers}>
            <Container>
                {auraSection && (
                    <Section>
                        <Aura section={auraSection} />
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
                        />
                    </Section>
                )}
                {activitesSection && (
                    <Section>
                        <Activities
                            section={activitesSection}
                            location={location}
                        />
                    </Section>
                )}
                {videoCarouselSection && (
                    <Section>
                        <VideoCarousel section={videoCarouselSection} />
                    </Section>
                )}
            </Container>
        </div>
    )
}
