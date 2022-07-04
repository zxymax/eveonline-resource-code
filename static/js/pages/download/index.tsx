import React from 'react'
import { useSelector } from 'react-redux'
import PageWithSeo from 'features/page-with-seo'
import PageType from 'models/types/ts/pageType'
import { getLanguage } from 'selectors'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import Download from './components/download'

export default function DownloadContainer(): JSX.Element {
    const slug = 'download-eve-online'
    // const language = useSelector((state) => state.language)
    const language = useSelector((state) => getLanguage(state))

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType): JSX.Element => {
                let hasContent = false
                if (page) {
                    hasContent = true

                    const { body, sectionsCollection } = page

                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={!hasContent}
                            hideSitename
                        >
                            <Download
                                title={page.siteName}
                                body={body}
                                sections={sectionsCollection.items}
                                // language={language}
                                hasContent={hasContent}
                            />
                        </PageWithSeo>
                    )
                }

                return <h1>Not Found</h1>
            }}
        </PageBySlugQuery>
    )
}

