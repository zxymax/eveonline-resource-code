import React from 'react'
import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import SectionType from 'models/types/ts/sectionType'
import Props from '../Props'
import Section from '../../components/section'
import Aura from '../../components/aura'
import SkillCards from '../../components/skillsCards'
// import Tabs from '../../components/tabs'

export default function CommunityResources({ page }: Props): JSX.Element {
    if (!page) return <></>

    const sections = page?.sectionsCollection?.items
    const auraSection = findSectionByIdentifier(sections, 'academy-aura')

    // Find all with same identifier that are on this page
    const resourceSections = sections.filter(
        (section) => section.identifier === 'eve-academy-community-resources'
    )

    return (
        <div>
            <Container>
                {auraSection && (
                    <Section>
                        <Aura section={auraSection} />
                    </Section>
                )}
                {resourceSections &&
                    resourceSections.map((section: SectionType) => {
                        return (
                            <>
                                <h2>{section.teaser}</h2>
                                <Section>
                                    <SkillCards section={section} />
                                </Section>
                            </>
                        )
                    })}
            </Container>
        </div>
    )
}
