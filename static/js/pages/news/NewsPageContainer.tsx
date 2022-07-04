import React from 'react'
import { useSelector } from 'react-redux'
import {
    // getPage,
    getSubpage,
    getId,
    getQuery,
    getLocationPayload,
} from 'lib/location/selectors'
import { findSectionByIdentifier } from 'lib/pages/api'
import { GlobalState } from 'types/redux'
// import PageType from 'models/types/ts/pageType'
import PageWithSeo from 'features/page-with-seo'
import { AdGlareProvider } from 'utils/context/AdGlareContext'
// import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageNewsContentQuery from 'queries/NewsPageContentQuery'
// import NewsTag from 'types/news/NewsTagType'
import NewsContentType from 'types/news/NewsContentType'
import NewsByTag from './components/newsByTag'
import NewsArchive from './components/newsArchive'
import SearchResult from './components/searchResult'
import NewsDetails from './components/newsDetail'
import PageWithHeader from './components/shared/page-with-header'
import AlertBar from './components/alert-bar'

import NewsPage from './components'

export default function NewsPageContainer(): JSX.Element {
    // const newsPage = useSelector((state) => getPage(state))
    const subpage = useSelector((state) => getSubpage(state))
    const id = useSelector((state) => getId(state))
    const location = useSelector((state) => getLocationPayload(state))
    const language = useSelector((state: GlobalState) => state.language)
    const searchQueryParam = useSelector((state) => getQuery(state))

    return (
        // <PageBySlugQuery slug={newsPage} locale={language}>
        <AdGlareProvider>
            <PageNewsContentQuery locale={language}>
                {({
                    page,
                    tags,
                    featured,
                    latestPatchNotes,
                }: NewsContentType) => {
                    if (page) {
                        const sections = page?.sectionsCollection?.items
                        const heroSection = findSectionByIdentifier(
                            sections,
                            'news-page-header'
                        )
                        const patchNotesCarousel = findSectionByIdentifier(
                            sections,
                            'news-page-patch-notes-carousel'
                        )
                        const bottomSection = findSectionByIdentifier(
                            sections,
                            'news-page-footer'
                        )
                        const alertBar = findSectionByIdentifier(
                            sections,
                            'news-alert-bar'
                        )

                        const renderAlertBar = !!(alertBar && alertBar?.body)

                        if (subpage === 't' && id) {
                            return (
                                <PageWithSeo
                                    page={page}
                                    showLoading={false}
                                    hideSitename
                                >
                                    <PageWithHeader>
                                        <NewsByTag
                                            language={language}
                                            tag={location.id}
                                            tags={tags}
                                        />
                                    </PageWithHeader>
                                </PageWithSeo>
                            )
                        }

                        // Search in Artices/news by title or content  "/news/q/triglavian"
                        if (subpage === 'search') {
                            return (
                                <PageWithSeo
                                    page={page}
                                    showLoading={false}
                                    hideSitename
                                >
                                    <PageWithHeader>
                                        <SearchResult
                                            language={language}
                                            query={
                                                searchQueryParam
                                                    ? searchQueryParam.q
                                                    : ''
                                            }
                                            tags={tags}
                                        />
                                    </PageWithHeader>
                                </PageWithSeo>
                            )
                        }

                        // We are displaying a single article
                        if (subpage === 'view' && id) {
                            return (
                                <>
                                    {renderAlertBar && (
                                        <AlertBar section={alertBar} />
                                    )}
                                    <NewsDetails featured={featured} />
                                </>
                            )
                        }

                        if (subpage === 'archive') {
                            return (
                                <PageWithSeo
                                    page={page}
                                    showLoading={false}
                                    hideSitename
                                >
                                    <PageWithHeader>
                                        <NewsArchive
                                            tags={tags}
                                            language={language}
                                        />
                                    </PageWithHeader>
                                </PageWithSeo>
                            )
                        }

                        return (
                            <PageWithSeo
                                page={page}
                                showLoading={false}
                                hideSitename
                            >
                                {renderAlertBar && (
                                    <AlertBar section={alertBar} />
                                )}
                                <NewsPage
                                    hero={heroSection}
                                    patchNotesCarousel={patchNotesCarousel}
                                    promo={bottomSection}
                                    featured={featured}
                                    language={language}
                                    tags={tags}
                                    latestPatchNotes={latestPatchNotes}
                                />
                            </PageWithSeo>
                        )
                    }
                    return <h1>Not Found</h1>
                }}
            </PageNewsContentQuery>
        </AdGlareProvider>
    )
}
