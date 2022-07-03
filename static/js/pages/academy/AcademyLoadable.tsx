import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageType from 'models/types/ts/pageType'
import PageLocationType from 'models/page-location-type'
import { findSectionByIdentifier } from 'lib/pages/api'
import { GlobalState } from 'types/redux'
import { getLocationPayload } from 'lib/location/selectors'
import PageWithSeo from 'features/page-with-seo'
import BackgroundImage from 'features/background-image'
import Hero from './components/hero'
import { getActiveSitemapPage, getSitemapPageBySlug } from './sitemap/selectors'
import sitemap from './sitemap'
import AcademyPageType from './models/academy-page-type'
import AcademyContainer from './AcademyContainer'
import style from './Academy.module.scss'

export default function LoadableAcademy(): JSX.Element {
    const location: PageLocationType = useSelector((state) =>
        getLocationPayload(state)
    )

    const dispatch = useDispatch()

    // Specific for have correct item in navigation
    // Navigation is either for top level or for subpages, not lower than that
    let sitemapPageForNav: AcademyPageType
    if (location.subpage) {
        sitemapPageForNav = getSitemapPageBySlug(sitemap, location.subpage)
    } else {
        sitemapPageForNav = sitemap
    }

    const currentSitemapPage = getActiveSitemapPage(sitemap, location)

    const slug =
        currentSitemapPage?.contentfulSlugPrefix + currentSitemapPage?.pageSlug

    const language = useSelector((state: GlobalState) => state.language)

    // TODO Maybe end with having this check and then not found
    if (slug) {
        return (
            <PageBySlugQuery slug={slug} locale={language}>
                {(page: PageType) => {
                    if (page) {
                        if (!page.sectionsCollection) return <h3>xxxx</h3>

                        const sections = page?.sectionsCollection?.items
                        const hero = findSectionByIdentifier(
                            sections,
                            'academy-hero'
                        )
                        return (
                            <PageWithSeo
                                page={page}
                                showLoading={false}
                                hideSitename={false}
                            >
                                <BackgroundImage
                                    url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg"
                                    className={style.academy}
                                >
                                    <Hero
                                        section={hero}
                                        sitemapPage={sitemapPageForNav}
                                        location={location}
                                    />
                                    <AcademyContainer
                                        page={page}
                                        location={location}
                                        language={language}
                                    />
                                </BackgroundImage>
                            </PageWithSeo>
                        )
                    }
                }}
            </PageBySlugQuery>
        )
    }

    // We did not find the page in contentful
    dispatch({ type: NOT_FOUND })
    return <></>
}
