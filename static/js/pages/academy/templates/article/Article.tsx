import React from 'react'
import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import Props from '../Props'
import Section from '../../components/section'
import ArticleView from '../../components/article'
import Social from '../../components/article/components/social'
import Related from '../../components/article/components/related'
import Activities from '../../components/activites'
import style from './Article.module.scss'

export default function Article({
    page,
    sitemapPage,
    location,
    language,
}: Props): JSX.Element {
    if (!page) return <></>

    const sections = page?.sectionsCollection?.items
    const contentSection = findSectionByIdentifier(sections, 'academy-content')
    const relatedSection = findSectionByIdentifier(sections, 'academy-related')
    const activitiesSection = findSectionByIdentifier(
        sections,
        'academy-activities'
    )

    return (
        <div className={style.article}>
            <Container>
                {contentSection && (
                    <>
                        <ArticleView
                            section={contentSection}
                            sitemapPage={sitemapPage}
                            location={location}
                            language={language}
                        />
                        <Social
                            language={language}
                            slug={`${location.page}/${location.subpage}`}
                        />
                    </>
                )}
                {relatedSection && (
                    <Related
                        section={relatedSection}
                        location={location}
                        language={language}
                    />
                )}
                {activitiesSection && (
                    <Section>
                        <Activities
                            description={false}
                            section={activitiesSection}
                            location={location}
                        />
                    </Section>
                )}
            </Container>
        </div>
    )
}
