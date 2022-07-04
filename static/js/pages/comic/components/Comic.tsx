import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'
import cx from 'classnames'
import { useInView } from 'react-intersection-observer'
import { GlobalState } from 'types/redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import PageWithSeo from 'features/page-with-seo'
import PageType from 'models/types/ts/pageType'
import { findSectionByIdentifier } from 'lib/pages/api'
import Hero from './components/hero'
import Chapter from './components/chapter'
import s from './Comic.module.scss'

const Comic = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)
    const dispatch = useDispatch()
    const slug = 'comic-capsuleer-chronicles'

    const { ref, inView } = useInView({
        threshold: 0.2,
    })

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page?.sectionsCollection?.items
                    const hero = findSectionByIdentifier(sections, 'comic-hero')
                    const chapter1 = findSectionByIdentifier(
                        sections,
                        'comic-issue-1'
                    )
                    const chapter2 = findSectionByIdentifier(
                        sections,
                        'comic-issue-2'
                    )
                    const chapter3 = findSectionByIdentifier(
                        sections,
                        'comic-issue-3'
                    )
                    const chapter1Links = findSectionByIdentifier(
                        sections,
                        'comic-issue-1-links'
                    )
                    const chapter2Links = findSectionByIdentifier(
                        sections,
                        'comic-issue-2-links'
                    )
                    const chapter3Links = findSectionByIdentifier(
                        sections,
                        'comic-issue-3-links'
                    )

                    return (
                        <PageWithSeo
                            page={page}
                            showLoading={false}
                            hideSitename={false}
                        >
                            <div className={cx(s.comic, { [s.bg]: inView })}>
                                <div ref={ref}>
                                    {hero && <Hero section={hero} />}
                                    {chapter3 && (
                                        <Chapter
                                            section={chapter3}
                                            links={chapter3Links}
                                        />
                                    )}
                                </div>
                                {chapter2 && (
                                    <Chapter
                                        section={chapter2}
                                        links={chapter2Links}
                                    />
                                )}
                                {chapter1 && (
                                    <Chapter
                                        section={chapter1}
                                        links={chapter1Links}
                                    />
                                )}
                            </div>
                        </PageWithSeo>
                    )
                }

                // page not found in contentful
                dispatch({ type: NOT_FOUND })
                return <></>
            }}
        </PageBySlugQuery>
    )
}

export default Comic

