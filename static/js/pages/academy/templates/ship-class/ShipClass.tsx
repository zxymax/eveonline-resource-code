import { Container } from 'layouts'
import { findSectionByIdentifier } from 'lib/pages/api'
import Activities from 'pages/academy/components/activites'
import Aura from 'pages/academy/components/aura'
import RelatedCards from 'pages/academy/components/relatedCards'
import Section from 'pages/academy/components/section'
import React from 'react'
import Props from '../Props'

export default function ShipClass({ page, location }: Props): JSX.Element {
    if (!page) return <></>

    const sections = page?.sectionsCollection?.items

    const auraSection = findSectionByIdentifier(sections, 'academy-aura')

    const activitiesSection = findSectionByIdentifier(
        sections,
        'academy-activities'
    )

    const relatedCardsSection = findSectionByIdentifier(
        sections,
        'academy-related'
    )
    // We are on main ships page
    return (
        <Container>
            {auraSection && (
                <Section>
                    <Aura section={auraSection} />
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
            {activitiesSection && (
                <Section>
                    <Activities
                        section={activitiesSection}
                        location={location}
                    />
                </Section>
            )}
        </Container>
    )
}
