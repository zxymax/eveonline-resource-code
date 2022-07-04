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
        import(/* webpackChunkName: "page-return" */ './discovery')
    )
}

export default function LoadableReturn() {
    const slug = 'discovery'
    const language = useSelector((state) => state.language)

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page) => {
                let hasContent = false
                if (page) {
                    hasContent = true
                    const sections = page.sectionsCollection.items

                    const hero = findSectionByIdentifier(
                        sections,
                        'discovery-hero'
                    )
                    const aboutDiscovery = findSectionByIdentifier(
                        sections,
                        'discovery-what-is-discovery'
                    )
                    const aboutEVE = findSectionByIdentifier(
                        sections,
                        'discovery-what-is-eve-online'
                    )
                    const participate = findSectionByIdentifier(
                        sections,
                        'discovery-participate'
                    )
                    const science = findSectionByIdentifier(
                        sections,
                        'discovery-science'
                    )
                    const plex = findSectionByIdentifier(
                        sections,
                        'discovery-plex-for-good'
                    )
                    const story = findSectionByIdentifier(
                        sections,
                        'discovery-story'
                    )
                    const sponsors = findSectionByIdentifier(
                        sections,
                        'discovery-sponsors'
                    )

                    return (
                        <PageWithSeo page={page}>
                            {isClient && (
                                <React.Suspense fallback={<Loading />}>
                                    <LoadableComponent
                                        hero={hero}
                                        aboutDiscovery={aboutDiscovery}
                                        aboutEVE={aboutEVE}
                                        participate={participate}
                                        science={science}
                                        plex={plex}
                                        story={story}
                                        sponsors={sponsors}
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

// export default function LoadableReturn(props) {
//     const page = useSelector(state => state.pages.returning)

//     return (
//         <PageWithSeo page={page} showLoading={!isClient} hideSitename>
//             {isClient && (
//                 <React.Suspense fallback={<Loading />}>
//                     <LoadableComponent {...props} />
//                 </React.Suspense>
//             )}
//         </PageWithSeo>
//     )
// }
