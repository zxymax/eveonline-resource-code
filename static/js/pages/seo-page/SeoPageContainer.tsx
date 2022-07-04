import React from 'react'
import { useSelector } from 'react-redux'
import { getSubpage } from 'lib/location/selectors'
import { isSeo } from 'lib/pages/selectors'
import NotFound from 'pages/not-found'
import PageWithSeo from 'features/page-with-seo'
import PageBySlugQuery from 'queries/PageBySlugQuery'

import { GlobalState } from 'types'
import PageType from 'models/types/ts/pageType'
import SeoLandingPage from './components'

export default function SeoPageContainer(): JSX.Element {
    const subpage = useSelector((state) => getSubpage(state))

    const slug = `seo-page-${subpage}`

    const language = useSelector((state: GlobalState) => state.language)

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page && isSeo(page)) {
                    const { sectionsCollection } = page

                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={false}
                            hideSitename
                        >
                            <SeoLandingPage
                                sections={sectionsCollection.items}
                                slug={subpage}
                            />
                        </PageWithSeo>
                    )
                }

                return <NotFound />
            }}
        </PageBySlugQuery>
    )
}

