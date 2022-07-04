import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageWithSeo from 'features/page-with-seo'
import { isEvent } from 'lib/pages/selectors'
import { findSectionByIdentifier } from 'lib/pages/api'
import Loading from 'layouts/loading/PageLoading'
import { isClient } from 'config/web'

// Loadable
let LoadableEvent
let LoadableEvents
if (isClient) {
    LoadableEvent = React.lazy(() =>
        import(/* webpackChunkName: "page-event" */ './components/event')
    )
    LoadableEvents = React.lazy(() =>
        import(/* webpackChunkName: "page-events" */ './components/events')
    )
}

// Shared not found component
const NotFound = () => {
    const dispatch = useDispatch()

    dispatch({ type: NOT_FOUND })
    return <h1>Not Found</h1>
}

export default function LoadableEventsPage() {
    const location = useSelector((state) => state.location)
    const pageSlug = location && location.payload && location.payload.page
    const slug = location && location.payload && location.payload.subpage
    const language = useSelector((state) => state.language)

    if (slug) {
        return (
            <PageBySlugQuery slug={slug} locale={language}>
                {(page) => {
                    let hasContent = false
                    if (page) {
                        /**
                         * * Check if page is Dynamic
                         * * return 404 if not
                         */
                        if (!isEvent(page)) {
                            return <NotFound />
                        }

                        hasContent = true

                        // SECTIONS
                        const sections = page.sectionsCollection.items

                        const hero = findSectionByIdentifier(
                            sections,
                            `${slug}-hero`
                        )
                        const news = findSectionByIdentifier(
                            sections,
                            `${slug}-news`
                        )
                        const eventLocation = findSectionByIdentifier(
                            sections,
                            `${slug}-location`
                        )
                        const tickets = findSectionByIdentifier(
                            sections,
                            `${slug}-tickets`
                        )
                        const faq = findSectionByIdentifier(
                            sections,
                            `${slug}-faq`
                        )
                        let mapUrl
                        if (page.config && page.config.mapUrl)
                            mapUrl = page.config.mapUrl // Map Url is stored in page config

                        return (
                            <PageWithSeo
                                page={page}
                                showLoading={!isClient}
                                hideSitename
                            >
                                {isClient && (
                                    <React.Suspense fallback={<Loading />}>
                                        <LoadableEvent
                                            background={page.pageBackground}
                                            hero={hero}
                                            news={news}
                                            location={eventLocation}
                                            tickets={tickets}
                                            faq={faq}
                                            mapUrl={mapUrl}
                                            hasContent={hasContent}
                                        />
                                    </React.Suspense>
                                )}
                            </PageWithSeo>
                        )
                    }
                    return <NotFound />
                }}
            </PageBySlugQuery>
        )
    }

    return (
        <PageBySlugQuery slug={pageSlug} locale={language}>
            {(page) => {
                if (page) {
                    const sections = page.sectionsCollection
                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={!isClient}
                            hideSitename
                        >
                            {isClient && (
                                <React.Suspense fallback={<Loading />}>
                                    <LoadableEvents
                                        heading={page.body}
                                        sections={sections.items}
                                    />
                                </React.Suspense>
                            )}
                        </PageWithSeo>
                    )
                }
                return <NotFound />
            }}
        </PageBySlugQuery>
    )
}
