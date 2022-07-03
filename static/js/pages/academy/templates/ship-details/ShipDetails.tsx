import React from 'react'
import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import Section from '../../components/section'
import Activities from '../../components/activites'
import RelatedCards from '../../components/relatedCards'
import FitsSection from '../../components/fits/FitsSection'
import Social from '../../components/article/components/social'
import { InfoBoxTypeEnum } from '../../components/info-box/InfoBox'
import { InfoBoxModel } from '../../components/info-box/InfoBoxModel'
import InfoBox from '../../components/info-box'
import ArticleView from '../../components/article'

import Props from '../Props'
import style from './ShipDetails.module.scss'

export default function ShipDetails({
    page,
    sitemapPage,
    location,
    language,
}: Props): JSX.Element {
    if (!page) return <></>

    const sections = page?.sectionsCollection?.items

    // Get ship info data from page.config field
    const jsonContent = page?.config as {
        shipInfo: InfoBoxModel
    }
    const { shipInfo } = jsonContent

    const contentSection = findSectionByIdentifier(sections, 'academy-content')

    const activitiesSection = findSectionByIdentifier(
        sections,
        'academy-activities'
    )

    const relatedCardsSection = findSectionByIdentifier(
        sections,
        'academy-related'
    )

    const shipFitsSection = findSectionByIdentifier(
        sections,
        'academy-ship-fits'
    )

    // We are on main ships page
    return (
        <div className={style.shipDetails}>
            {contentSection && (
                <ArticleView
                    section={contentSection}
                    sitemapPage={sitemapPage}
                    location={location}
                    sideContent={
                        <InfoBox
                            type={InfoBoxTypeEnum.ShipInfo}
                            info={shipInfo}
                            language={language}
                        />
                    }
                    language={language}
                />
            )}
            <Container>
                {shipFitsSection && (
                    <Section>
                        <FitsSection
                            section={shipFitsSection}
                            location={location}
                        />
                    </Section>
                )}

                <Social
                    language={language}
                    slug={`${location.page}/${location.subpage}/${location.id}/${location.subid}`}
                />

                {activitiesSection && (
                    <Section>
                        <Activities
                            section={activitiesSection}
                            location={location}
                        />
                    </Section>
                )}
                {relatedCardsSection && (
                    <Section>
                        <RelatedCards
                            section={relatedCardsSection}
                            location={location}
                        />
                    </Section>
                )}
            </Container>
        </div>
    )
}
