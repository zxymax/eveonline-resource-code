import React from 'react'
import classNames from 'classnames'
import { Translate } from 'react-localize-redux'
import { Link } from 'features'

import PageLocationType from 'models/page-location-type'
import AcademyPageType from '../../../../models/academy-page-type'

// Helpers
import { getSitemapPageBySlug } from '../../../../sitemap/selectors'
import { HomeIcon } from '../../../icons'

import style from './Breadcrumbs.module.scss'

interface Props {
    location: PageLocationType
    sitemapRoot: AcademyPageType
    language: string
}

interface ItemModel {
    title: string
    pageSlug: string
    url: string
}

function getUrlWithLanguage(url: string, language: string): string {
    return language === 'en' ? url : `/${language}${url}`
}

const Breadcrumbs = ({
    location,
    sitemapRoot,
    language,
}: Props): JSX.Element => {
    // const cx = classNames.bind(style)

    // Let the root page slug control all for breadcrumbs
    const { page } = location

    const cx = classNames.bind(style)

    const homeUrl = getUrlWithLanguage(`/${page}`, language)

    const items: Array<ItemModel> = []

    // This is messy but gets things done, constucting breadcrumb based on current location

    // Level 2
    if (location?.subpage) {
        const lvl2SitemapPage = getSitemapPageBySlug(
            sitemapRoot,
            location.subpage
        )

        if (lvl2SitemapPage) {
            const lvl2Url = `${homeUrl}/${lvl2SitemapPage.pageSlug}`
            const lvl2Title = lvl2SitemapPage.title // TODO this is tricky for LOC, does not come from contentful
            items.push({
                url: lvl2Url,
                pageSlug: lvl2SitemapPage.pageSlug,
                title: lvl2Title,
            })

            if (location.id) {
                // lvl3
                const lvl3SitemapPage = getSitemapPageBySlug(
                    lvl2SitemapPage,
                    location.id
                )

                if (lvl3SitemapPage) {
                    const lvl3Url = `${lvl2Url}/${lvl3SitemapPage.pageSlug}`
                    const lvl3Title = lvl3SitemapPage.title
                    items.push({
                        url: lvl3Url,
                        pageSlug: lvl3SitemapPage.pageSlug,
                        title: lvl3Title,
                    })

                    if (location.subid) {
                        // lvl4
                        const lvl4SitemapPage = getSitemapPageBySlug(
                            lvl3SitemapPage,
                            location.subid
                        )

                        if (lvl4SitemapPage) {
                            const lvl4Url = `${lvl3Url}/${lvl4SitemapPage.pageSlug}`
                            const lvl4Title = lvl4SitemapPage.title
                            items.push({
                                url: lvl4Url,
                                pageSlug: lvl4SitemapPage.pageSlug,
                                title: lvl4Title,
                            })
                        }
                    }
                }
            }
        }
    }

    const renderLinks = (): JSX.Element[] => {
        return items.map((item: ItemModel, key: number) => {
            // Getting next item, this gets us out of array but can be used to know that we are at the end and can make the last thing active
            const nextItem = items[key + 1]

            const active: boolean = nextItem === undefined

            return (
                <Translate key={item.url}>
                    {({ translate }) => (
                        <span>
                            <span className={style.seperator}>/</span>
                            <Link url={item.url}>
                                <span
                                    className={cx(style.item, {
                                        [style.active]: active,
                                    })}
                                >
                                    {/* {item.title}- */}
                                    {translate(`academyPages.${item.pageSlug}`)}
                                </span>
                            </Link>
                        </span>
                    )}
                </Translate>
            )
        })
    }

    return (
        <div className={style.breadcrumbs}>
            <div className={style.home}>
                <Link url={homeUrl}>
                    <HomeIcon />
                </Link>
            </div>
            <div className={style.links}>{renderLinks()}</div>
        </div>
    )
}

export default Breadcrumbs
