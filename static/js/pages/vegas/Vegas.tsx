import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BackgroundImage from 'features/background-image'
import { NOT_FOUND } from 'redux-first-router'
import { GlobalState } from 'types/redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageWithSeo from 'features/page-with-seo'
import PageType from 'models/types/ts/pageType'
import { findSectionByIdentifier } from 'lib/pages/api'
import style from './Vegas.module.scss'
import Hero from './components/vegas/hero'
import News from './components/vegas/news'
import Location from './components/vegas/location'
import Faq from './components/vegas/faq'
import Tickets from './components/vegas/tickets'

const Vegas = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)
    const dispatch = useDispatch()
    const slug = 'vegas'

    interface MapLocation {
        mapUrl: string
    }

    const getConfigValue = (configObject: MapLocation): string => {
        return configObject.mapUrl
    }

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page?.sectionsCollection?.items
                    const hero = findSectionByIdentifier(sections, 'vegas-hero')
                    const news = findSectionByIdentifier(sections, 'vegas-news')
                    const location = findSectionByIdentifier(
                        sections,
                        'vegas-location'
                    )
                    const tickets = findSectionByIdentifier(
                        sections,
                        'vegas-tickets'
                    )
                    const faq = findSectionByIdentifier(sections, 'vegas-faq')

                    return (
                        <BackgroundImage
                            url="//images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg"
                            repeat="repeat"
                            size="contain"
                            position="top center"
                            className={style.content}
                        >
                            <BackgroundImage
                                url={page.pageBackground.url}
                                repeat="no-repeat"
                                size="contain"
                                position="center top"
                                className={style.hero}
                            >
                                <PageWithSeo
                                    page={page}
                                    showLoading={false}
                                    hideSitename={false}
                                >
                                    {hero && <Hero section={hero} />}
                                    {news && <News section={news} />}
                                    {location && page.config && (
                                        <Location
                                            section={location}
                                            mapUrl={getConfigValue(
                                                page.config as MapLocation
                                            )}
                                        />
                                    )}
                                    {tickets && <Tickets section={tickets} />}
                                    {faq && <Faq section={faq} />}
                                </PageWithSeo>
                            </BackgroundImage>
                        </BackgroundImage>
                    )
                }

                // page not found in contentful
                dispatch({ type: NOT_FOUND })
                return <></>
            }}
        </PageBySlugQuery>
    )
}

export default Vegas

