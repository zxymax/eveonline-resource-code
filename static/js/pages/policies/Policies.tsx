import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from 'types'
import PageType from 'models/types/ts/pageType'
import SectionType from 'models/types/ts/sectionType'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import { Container } from 'layouts'
import Overview from './components/overview'
import Single from './components/single'
import style from './policies.module.scss'

export default function PoliciesContainer(): JSX.Element {
    // const slug = 'scope-test-2'

    // We are on policies so always get that. It could contain all the policies in sections.
    // const location: PageLocationType = useSelector((state) =>
    //     getLocationPayload(state)
    // )
    const pageSlug = 'policies'
    const location = useSelector((state: GlobalState) => state.location)
    const language = useSelector((state: GlobalState) => state.language)

    const policySlug = location && location.payload && location.payload.subpage

    // console.log('policy Slug', policySlug)
    // console.log('policy subpage', subpage)

    // if (policySlug) {
    //     // We are on a subpage so need to display single policy.
    //     console.log('SINGLE POLICY')
    // } else {
    //     console.log('POLICY OVERVIEW')
    // }

    // const language = useSelector((state) => state.language)

    return (
        <Container>
            <div className={style.policies}>
                <PageBySlugQuery slug={pageSlug} locale={language}>
                    {(page: PageType) => {
                        console.log('waaaat', page)
                        if (page) {
                            if (policySlug) {
                                const policy = page.sectionsCollection.items.find(
                                    (section: SectionType) =>
                                        section.identifier === policySlug
                                )
                                return <Single policy={policy} />
                            }
                            return (
                                <Overview
                                    policies={page.sectionsCollection.items}
                                />
                            )
                        }
                        return (
                            <div>
                                <h1>Not found</h1>
                            </div>
                        )
                    }}
                </PageBySlugQuery>
            </div>
        </Container>
    )
}

