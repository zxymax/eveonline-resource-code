import React from 'react'
import { useSelector } from 'react-redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageWithSeo from 'features/page-with-seo'
import Loading from 'layouts/loading/PageLoading'
import { findSectionByIdentifier } from 'lib/pages/api'
import { isClient } from 'config/web'
import PageType from 'models/types/ts/pageType'
import { GlobalState } from 'types'

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(
        () => import(/* webpackChunkName: "page-portal" */ './Portal')
    )
}

export default function LoadableWWW(): JSX.Element {
    const slug = 'eve-portal'
    const language = useSelector((state: GlobalState) => state.language)

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page.sectionsCollection.items

                    const hero = findSectionByIdentifier(
                        sections,
                        'eve-portal-hero'
                    )
                    const omegaBenefits = findSectionByIdentifier(
                        sections,
                        'eve-portal-omega-benefits'
                    )
                    const features = findSectionByIdentifier(
                        sections,
                        'eve-portal-features'
                    )
                    // const comparison = findSectionByIdentifier(
                    //     sections,
                    //     'alpha-omega-comparison'
                    // )
                    const comparison = findSectionByIdentifier(
                        sections,
                        'eve-portal-comparison'
                    )
                    const bottom = findSectionByIdentifier(
                        sections,
                        'eve-portal-bottom'
                    )

                    return (
                        <PageWithSeo page={page} showLoading={!isClient}>
                            {isClient && (
                                <React.Suspense fallback={<Loading />}>
                                    <LoadableComponent
                                        hero={hero}
                                        omegaBenefits={omegaBenefits}
                                        features={features}
                                        comparison={comparison}
                                        bottom={bottom}
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

