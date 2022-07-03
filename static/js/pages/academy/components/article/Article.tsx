import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import PageLocationType from 'models/page-location-type'
import { Container } from 'layouts'
import AcademyPageType from '../../models/academy-page-type'
import Header from './components/header'
import Content from './components/content'
import Navigation from '../navigation'

import style from './Article.module.scss'

interface Props {
    section: SectionType
    sitemapPage: AcademyPageType
    location: PageLocationType
    sideContent?: JSX.Element
    language: string
}

const Article = ({
    section,
    sitemapPage,
    location,
    sideContent,
}: Props): JSX.Element => (
    <div className={style.article}>
        <Container>
            <Navigation location={location} sitemapPage={sitemapPage} />
        </Container>
        {section.headline && (
            <Header
                headline={section.headline}
                imageFile={section.imageFile}
                wideImage={sideContent !== undefined}
            />
        )}
        <Container>
            {sideContent ? (
                <div className={style.withSideContent}>
                    <Content section={section} />
                    <div>{sideContent}</div>
                </div>
            ) : (
                <Content section={section} fluid />
            )}
        </Container>
    </div>
)

Article.defaultProps = {
    sideContent: undefined,
}

export default Article
