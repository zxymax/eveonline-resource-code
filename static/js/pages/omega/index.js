import React from 'react'
import { useSelector } from 'react-redux'
import PageWithSeo from 'features/page-with-seo'
import Loading from 'layouts/loading/PageLoading'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import { findSectionByIdentifier } from 'lib/pages/api'
import { isClient } from 'config/web'

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(() =>
        import(/* webpackChunkName: "page-omega" */ './Omega')
    )
}

export default function LoadableOmega() {
    const slug = 'omega2'
    const language = useSelector((state) => state.language)

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page) => {
                let hasContent = false
                if (page) {
                    hasContent = true

                    const sections = page.sectionsCollection.items

                    const Hero = findSectionByIdentifier(sections, 'omega-hero')
                    const CTA = findSectionByIdentifier(sections, 'omega-cta')
                    const Video = findSectionByIdentifier(
                        sections,
                        'omega-video-section'
                    )
                    const Advantage = findSectionByIdentifier(
                        sections,
                        'omega-advantage'
                    )
                    const Comparison = findSectionByIdentifier(
                        sections,
                        'alpha-omega-comparison'
                    )
                    const MediaQuotes = findSectionByIdentifier(
                        sections,
                        'media-quotes'
                    )
                    const Quotes = findSectionByIdentifier(sections, 'quotes')

                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={!isClient}
                            hideSitename
                        >
                            {isClient && (
                                <React.Suspense fallback={<Loading />}>
                                    <LoadableComponent
                                        Hero={Hero}
                                        CTA={CTA}
                                        Video={Video}
                                        Advantage={Advantage}
                                        Comparison={Comparison}
                                        MediaQuotes={MediaQuotes}
                                        Quotes={Quotes}
                                        hasContent={hasContent}
                                    />
                                </React.Suspense>
                            )}
                        </PageWithSeo>
                    )
                }

                // Fallback error message
                return <h1>Not Found</h1>
            }}
        </PageBySlugQuery>
    )
}

