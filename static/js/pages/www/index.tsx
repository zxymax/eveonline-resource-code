import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from 'types/redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import { findSectionByIdentifier } from 'lib/pages/api'
import PageType from 'models/types/ts/pageType'
import PageWithSeo from 'features/page-with-seo'
import BackgroundImage from 'features/background-image'
import LoadingBelowFold from 'layouts/loading/LoadingBelowFold'
import { isClient } from 'config/web'
import Hero from './components/hero'
import Banner from './components/banner'
import style from './WWW.module.scss'

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(
        () => import(/* webpackChunkName: "page-www" */ './WWWContainer')
    )
}

export default function LoadableWWW(): JSX.Element {
    const language = useSelector((state: GlobalState) => state.language)
    const slug = 'www-home'

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page?.sectionsCollection?.items

                    // Get hero & banner sections above fold
                    const hero = findSectionByIdentifier(sections, 'www-hero')
                    let quotes = findSectionByIdentifier(
                        sections,
                        `www-media-quotes-${language}`
                    )
                    // This gets quotes like before, only of localized was not found
                    if (!quotes) {
                        quotes = findSectionByIdentifier(
                            sections,
                            'www-media-quotes'
                        )
                    }

                    const banner = findSectionByIdentifier(
                        sections,
                        'www-banner-section'
                    )

                    return (
                        <PageWithSeo
                            page={page}
                            hideSitename
                            showLoading={false}
                        >
                            <Hero section={hero} quotes={quotes} />
                            <BackgroundImage
                                id="content"
                                className={style.content}
                                url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg"
                            >
                                {banner && <Banner section={banner} />}
                                {isClient ? (
                                    <React.Suspense
                                        fallback={<LoadingBelowFold />}
                                    >
                                        <LoadableComponent
                                            sections={sections}
                                        />
                                    </React.Suspense>
                                ) : (
                                    <LoadingBelowFold />
                                )}
                            </BackgroundImage>
                        </PageWithSeo>
                    )
                }
            }}
        </PageBySlugQuery>
    )
}
