import React from 'react'
import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import Section from '../../components/section'
import Social from '../../components/article/components/social'
import Props from '../Props'
import ArticleView from '../../components/article'
import { InfoBoxTypeEnum } from '../../components/info-box/InfoBox'
import { InfoBoxModel } from '../../components/info-box/InfoBoxModel'
import InfoBox from '../../components/info-box'
import Activities from '../../components/activites'
import style from './Activity.module.scss'

export default function Activity({
    page,
    sitemapPage,
    location,
    language,
}: Props): JSX.Element {
    if (!page) return <></>

    const sections = page?.sectionsCollection?.items

    let infoJSON: InfoBoxModel = null

    if (page?.config) {
        const pageConfig = page?.config as {
            info: InfoBoxModel
        }
        infoJSON = pageConfig?.info
    }

    const contentSection = findSectionByIdentifier(sections, 'academy-content')
    const activitiesSection = findSectionByIdentifier(
        sections,
        'academy-activities'
    )

    return (
        <div className={style.activity}>
            {contentSection && (
                <ArticleView
                    section={contentSection}
                    sideContent={
                        <InfoBox
                            type={InfoBoxTypeEnum.ActivityInfo}
                            info={infoJSON}
                            language={language}
                            page={location.page}
                        />
                    }
                    sitemapPage={sitemapPage}
                    location={location}
                    language={language}
                />
            )}
            <Container>
                <Social
                    language={language}
                    slug={`${location.page}/${location.subpage}/${location.id}/${location.subid}`}
                />
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
