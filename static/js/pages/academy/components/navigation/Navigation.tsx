import React from 'react'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import PageLocationType from 'models/page-location-type'
import AcademyPageType from '../../models/academy-page-type'
import sitemapRoot from '../../sitemap/academy-sitemap'
import { getActiveSitemapPage } from '../../sitemap/selectors'

import NavigationItem from './components/navigation-item'
import Breadcrumbs from './components/breadcrumbs'

import style from './Navigation.module.scss'

interface Props {
    location: PageLocationType
    sitemapPage: AcademyPageType
}

const Navigation = ({ location, sitemapPage }: Props): JSX.Element => {
    // const [tagsActive, setTagsActive] = useState(false)

    const language = useSelector((state) => getLanguage(state))

    const activeSitemapPage = getActiveSitemapPage(sitemapRoot, location)
    const currentPageSlug = activeSitemapPage?.pageSlug

    // This is (still) simple, nav is only displayed for first three levels and links like that
    function getUrlPrefix(subpage: string | null, lastSlug: string): string {
        const subpageLink = subpage ? `${subpage}/` : ''

        if (location.subpage) {
            return `/${location.page}/${location.subpage}/${lastSlug}`
        }

        return `/${location.page}/${subpageLink}${lastSlug}`
    }

    const renderNavigation = (): JSX.Element => {
        return (
            <nav className={style.navigation}>
                <ol className={cx({ [style.frontpage]: !location.subpage })}>
                    {sitemapPage?.pages
                        ?.filter((page) => !page.hideInNavigation) // Check if page should be hidden from navigation
                        .map((page: AcademyPageType) => {
                            // Make LOC links
                            const url =
                                language === 'en'
                                    ? `${getUrlPrefix(
                                          page.subpage,
                                          page.pageSlug
                                      )}`
                                    : `/${language}${getUrlPrefix(
                                          page.subpage,
                                          page.pageSlug
                                      )}`

                            let isCurrent = false
                            if (currentPageSlug === page?.pageSlug)
                                isCurrent = true

                            return (
                                <NavigationItem
                                    sitemapPage={page}
                                    url={url}
                                    key={page.pageSlug}
                                    isCurrent={isCurrent}
                                />
                            )
                        })}
                </ol>
            </nav>
        )
    }

    return (
        <div className={style.navigation}>
            <Breadcrumbs
                location={location}
                sitemapRoot={sitemapRoot}
                language={language}
            />
            {activeSitemapPage?.pages && renderNavigation()}
        </div>
    )
}
export default Navigation

