import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import cx from 'classnames'
import PageType from 'models/types/ts/pageType'
import ContentType from 'models/types/ts/contentType'
import PageLocationType from 'models/page-location-type'
import SectionType from 'models/types/ts/sectionType'
import { isClient } from 'config/web'
import { HeadingRegular, ParagraphLarge } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import { findSectionByIdentifier } from 'lib/pages/api'
import { Container } from 'layouts'
import AcademyPageType from '../../models/academy-page-type'
import ImageText from './components/imageText'
import Navigation from '../navigation'
import style from './Article.module.scss'
import StickyNav from './components/stickyNav'
import Hud from '../hud'

interface Props {
    page: PageType
    sitemapPage: AcademyPageType
    location: PageLocationType
}

const ArticleManySections = ({
    page,
    sitemapPage,
    location,
}: Props): JSX.Element => {
    useEffect(() => {
        // remove overflow to use position: sticky;
        if (isClient && !isMobile) document.body.style.overflow = 'unset'

        return () => {
            if (isClient && !isMobile) document.body.style.overflow = 'hidden'
        }
    }, [])

    const contentSectionIntro = findSectionByIdentifier(
        page.sectionsCollection.items,
        'academy-intro'
    )

    const sections = page.sectionsCollection.items.filter(
        (x) =>
            x.identifier !== 'academy-intro' && x.identifier !== 'academy-hud'
    )

    const stickyNavItems: Array<string> = []
    page.sectionsCollection.items.map((section: SectionType) =>
        stickyNavItems.push(section.headline)
    )

    const hudSection = findSectionByIdentifier(
        page.sectionsCollection.items,
        'academy-hud'
    )

    const renderIntro = (introSection: SectionType): JSX.Element => {
        if (!introSection) return <></>
        return (
            <div className={style.intro} id={introSection.headline}>
                <HeadingRegular>{introSection.headline}</HeadingRegular>
                <div className={style.content}>
                    <div className={style.img}>
                        <img
                            src={`${introSection?.imageFile?.url}`}
                            alt={introSection?.imageFile?.description}
                        />
                    </div>
                    <div className={style.into}>
                        <ParagraphLarge>{introSection.body}</ParagraphLarge>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={style.articleManySections}>
            <Container>
                <Navigation location={location} sitemapPage={sitemapPage} />
            </Container>

            <div className={style.containerWrapper}>
                <StickyNav anchors={stickyNavItems} />
                <div>
                    {renderIntro(contentSectionIntro)}
                    {hudSection && (
                        <div id={hudSection.headline}>
                            <Hud section={hudSection} location={location} />
                        </div>
                    )}
                    {sections.map((section: SectionType) => {
                        const {
                            headline,
                            contentCollection: { total, items },
                        } = section
                        return (
                            <div
                                className={style.sectionContainer}
                                key={section.name}
                                id={headline}
                            >
                                <HeadingUnderline2 title={section.headline} />
                                <div className={style.sectionWrapper}>
                                    {total > 0 &&
                                        items.map((item: ContentType) => (
                                            <div
                                                key={item.sys.id}
                                                className={cx(style.item, {
                                                    [style.full]: total === 1,
                                                })}
                                            >
                                                <ImageText
                                                    key={item.sys.id}
                                                    content={item}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ArticleManySections
