import React from 'react'
import { useSelector } from 'react-redux'
import { getSubpage } from 'lib/location/selectors'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageWithSeo from 'features/page-with-seo'
import Loading from 'layouts/loading/PageLoading'
import { findSectionByIdentifier } from 'lib/pages/api'
import { isClient } from 'config/web'
import PageType from 'models/types/ts/pageType'
import { GlobalState } from 'types'
import SubmitForm from './components/submit-form'

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(() => import('./PartnershipProgram'))
}

export default function LoadablePartnerShipProgram(): JSX.Element {
    const slug = 'partnership-program'
    const subpage = useSelector((state) => getSubpage(state))
    const language = useSelector((state: GlobalState) => state.language)

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page.sectionsCollection.items

                    const hero = findSectionByIdentifier(
                        sections,
                        'partnership-program-hero'
                    )
                    const intro = findSectionByIdentifier(
                        sections,
                        'partnership-program-intro'
                    )
                    const benefits = findSectionByIdentifier(
                        sections,
                        'partnership-program-benefits'
                    )
                    const requirements = findSectionByIdentifier(
                        sections,
                        'partnership-program-requirements'
                    )
                    const faq = findSectionByIdentifier(
                        sections,
                        'partnership-program-faq'
                    )
                    const guidelines = findSectionByIdentifier(
                        sections,
                        'partnership-content-guidelines'
                    )

                    if (subpage === 'apply') {
                        return (
                            <PageWithSeo page={page} showLoading={!isClient}>
                                {isClient && (
                                    <React.Suspense fallback={<Loading />}>
                                        <SubmitForm section={hero} />
                                    </React.Suspense>
                                )}
                            </PageWithSeo>
                        )
                    }

                    return (
                        <PageWithSeo page={page} showLoading={!isClient}>
                            {isClient && (
                                <React.Suspense fallback={<Loading />}>
                                    <LoadableComponent
                                        hero={hero}
                                        intro={intro}
                                        benefits={benefits}
                                        requirements={requirements}
                                        guidelines={guidelines}
                                        faq={faq}
                                    />
                                </React.Suspense>
                            )}
                        </PageWithSeo>
                    )
                }
            }}
        </PageBySlugQuery>
    )
}

