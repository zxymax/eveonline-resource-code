import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from 'types/redux'
import PageType from 'models/types/ts/pageType'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import { findSectionByIdentifier } from 'lib/pages/api'
import PageWithSeo from 'features/page-with-seo'
import Launch from './Launch'

const LaunchContainer = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)

    return (
        <PageBySlugQuery slug="launch-eve-online" locale={language}>
            {(page: PageType) => {
                if (page) {
                    const content = findSectionByIdentifier(
                        page.sectionsCollection.items,
                        'launch-eve-online-content'
                    )
                    return (
                        <PageWithSeo
                            page={page}
                            hideSitename
                            showLoading={false}
                        >
                            <Launch content={content} />
                        </PageWithSeo>
                    )
                }
            }}
        </PageBySlugQuery>
    )
}

export default LaunchContainer
