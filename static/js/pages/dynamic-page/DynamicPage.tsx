import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'
import { GlobalState } from 'types/redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageType from 'models/types/ts/pageType'
import PageWithSeo from 'features/page-with-seo'
import { isDynamic } from 'lib/pages/selectors'
import DynamicPage from './components/dynamic-page'

const DynamicPageContainer = (): JSX.Element => {
    const location = useSelector((state: GlobalState) => state.location)
    const language = useSelector((state: GlobalState) => state.language)
    const dispatch = useDispatch()

    let slug = location && location.payload && location.payload.subpage
    slug = slug && slug.toLowerCase() // TODO - TEMP FIX to make /now/SLUGHASUPPERCASEMADNESS work

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    // Return 404 if page is not dynamic
                    if (!isDynamic(page)) {
                        dispatch({ type: NOT_FOUND })

                        return <h1>Not Found</h1>
                    }

                    return (
                        <PageWithSeo page={page} showLoading={false}>
                            <DynamicPage
                                sections={page.sectionsCollection.items}
                                pageBackground={page.pageBackground}
                                config={page.config}
                            />
                        </PageWithSeo>
                    )
                }

                /**
                 * * Page is not found / undefined
                 * * Return 404
                 * ? Have to return something from render
                 */
                dispatch({ type: NOT_FOUND })
                return <h1>Not Found</h1>
            }}
        </PageBySlugQuery>
    )
}

export default DynamicPageContainer
