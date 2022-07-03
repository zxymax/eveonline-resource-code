import React from 'react'
import PageType from 'models/types/ts/pageType'
import LanguageType from 'models/language-type'
import PageLocationType from 'models/page-location-type'
import NotFound from 'pages/not-found'
import Frontpage from './templates/frontpage'
import Careers from './templates/careers'
import Ships from './templates/ships'
import World from './templates/world'
import Article from './templates/article'

// Sitemap
import sitemap from './sitemap'
import { getSitemapPageBySlug } from './sitemap/selectors'
import style from './Academy.module.scss'

import mockPage from './templates/mockPage'

function renderPage(
    page: PageType,
    location: PageLocationType,
    language: LanguageType
): JSX.Element {
    const { subpage } = location

    // We are on main page
    if (!location || !location.subpage) {
        return (
            <Frontpage
                page={page}
                sitemapPage={sitemap}
                location={location}
                language={language}
            />
        )
    }

    if (subpage === 'careers') {
        // Get the careers pages and send in
        // const careersSitemap = sitemap?.pages.find((e) => e.slug === 'careers')
        const careersSitemap = getSitemapPageBySlug(sitemap, 'careers')

        return (
            <Careers
                page={page}
                sitemapPage={careersSitemap}
                location={location}
                language={language}
            />
        )
    }

    if (subpage === 'ships') {
        const shipsSitemap = getSitemapPageBySlug(sitemap, 'ships')

        // Should we do supbapge logic here instead of inside ships

        return (
            <Ships
                page={page}
                sitemapPage={shipsSitemap}
                location={location}
                language={language}
            />
        )
    }

    if (subpage === 'world') {
        const worldSitemap = getSitemapPageBySlug(sitemap, 'world')

        return (
            <World
                page={page}
                sitemapPage={worldSitemap}
                location={location}
                language={language}
            />
        )
    }

    // We could be on article sub page straight from the root
    if (subpage) {
        const sitemapPage = getSitemapPageBySlug(sitemap, location.subpage)
        // Only if we find the standalone page in the sitemap
        if (sitemapPage && !sitemapPage.subpage)
            // Not needed unless we get this type of pages
            // if(page?.config?.hasSticky)
            //      return (
            //         <ArticleManySections
            //             page={page}
            //             sitemapPage={sitemapPage}
            //             location={location}
            //             language={language}
            //         />
            //     )

            return (
                <Article
                    page={page}
                    sitemapPage={sitemapPage}
                    location={location}
                    language={language}
                />
            )
    }

    // Could happen if page found in contentful but still does not fit in Academy pages logic
    return <NotFound />
}

interface Props {
    page: PageType
    location: PageLocationType
    language: LanguageType
}

export default function AcademyContainer({
    page,
    location,
    language, // NOT sure if needed but still here for now
}: Props): JSX.Element {
    if (page) {
        return (
            <div className={style.academyContainer}>
                {renderPage(page, location, language)}
            </div>
        )
    }

    return <>{renderPage(mockPage, location, language)}</>
}
