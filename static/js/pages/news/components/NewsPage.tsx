import React, { useContext } from 'react'
import { Translate } from 'react-localize-redux'
import { AdGlareContext } from 'utils/context/AdGlareContext'
import SectionType from 'models/types/ts/sectionType'
import BackgroundImage from 'features/background-image'
import AdGlareNew from 'features/adGlare'
import ArticlesQuery from 'queries/ArticlesQuery'
import { Heading, Container, Button } from 'layouts'
import NewsTagType from 'types/news/NewsTagType'
import NewsType from 'models/types/ts/newsType'
import LanguageType from 'models/language-type'
import Hero from './hero'
import TagsContainer from './tags/TagsContainer'
import PatchNotesCarousel from './patch-notes-carousel'
import PatchNotesLatest from './patch-notes-latest'
import FeaturedPosts from './featured-posts'
import Promo from './promo'
import { Card, CardFeatured } from './cards'
import ArchiveButton from './shared/archive-button'
import style from './NewsPage.module.scss'

interface Props {
    hero: SectionType
    patchNotesCarousel: SectionType
    promo: SectionType
    featured: SectionType
    tags: Array<NewsTagType>
    latestPatchNotes: NewsType
    language: LanguageType
}

export default function NewsPage({
    hero,
    patchNotesCarousel,
    promo,
    featured,
    tags,
    latestPatchNotes,
    language,
}: Props): JSX.Element {
    const adGlare = useContext(AdGlareContext)

    return (
        <BackgroundImage url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg">
            <BackgroundImage
                url={hero.imageFile ? hero.imageFile.url : ''}
                repeat="no-repeat"
                size="cover"
                height={500}
                position="center top"
                className={style.heroBg}
                lazy={false}
            >
                {patchNotesCarousel?.contentCollection?.total > 0 ? (
                    <PatchNotesCarousel section={patchNotesCarousel} />
                ) : (
                    <Hero section={hero} />
                )}
            </BackgroundImage>
            <ArticlesQuery
                locale={language}
                limit={12}
                tagsToExclude={['patch-notes']}
            >
                {(newsList) => {
                    return (
                        <>
                            <Translate>
                                {({ translate }) => (
                                    <>
                                        <Container>
                                            <TagsContainer tags={tags} />
                                            <PatchNotesLatest
                                                item={latestPatchNotes}
                                            />
                                            <div className={style.header}>
                                                <Heading size="small" isThemed>
                                                    <Translate id="news.eveNews" />
                                                </Heading>
                                                <ArchiveButton
                                                    buttonText={translate(
                                                        'news.viewNewsArchive'
                                                    ).toString()}
                                                    path={{
                                                        page: 'news',
                                                        subpage: 'archive',
                                                    }}
                                                    className={style.more}
                                                />
                                            </div>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid2_1
                                                )}
                                            >
                                                <div className={style.item}>
                                                    <CardFeatured
                                                        newsItem={newsList[0]}
                                                    />
                                                </div>
                                                {/* <AdGlare adSize="large" /> */}

                                                <AdGlareNew
                                                    adGlareResponse={adGlare}
                                                />
                                            </div>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid3
                                                )}
                                            >
                                                <Card
                                                    filled
                                                    newsItem={newsList[1]}
                                                    hover
                                                />
                                                <Card
                                                    filled
                                                    newsItem={newsList[2]}
                                                    hover
                                                />
                                                <Card
                                                    filled
                                                    newsItem={newsList[3]}
                                                    hover
                                                />
                                            </div>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid2
                                                )}
                                            >
                                                <Card newsItem={newsList[4]} />
                                                <Card newsItem={newsList[5]} />
                                            </div>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid2_1
                                                )}
                                            >
                                                <div className={style.item}>
                                                    <Card
                                                        newsItem={newsList[6]}
                                                    />
                                                </div>
                                                <FeaturedPosts
                                                    featured={featured}
                                                />
                                            </div>
                                        </Container>
                                        <Container>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid2
                                                )}
                                            >
                                                <Card newsItem={newsList[7]} />
                                                <Card newsItem={newsList[8]} />
                                            </div>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid3
                                                )}
                                            >
                                                <Card newsItem={newsList[9]} />
                                                <Card newsItem={newsList[10]} />
                                                <Card newsItem={newsList[11]} />
                                            </div>
                                            <div
                                                className={style(
                                                    style.grid,
                                                    style.grid3
                                                )}
                                            >
                                                <Button
                                                    internal
                                                    className={style.bottomCTA}
                                                    path={{
                                                        page: 'news',
                                                        subpage: 'archive',
                                                    }}
                                                    border={1}
                                                    size="small"
                                                    theme="secondary"
                                                >
                                                    <Translate id="news.viewNewsArchive" />
                                                </Button>
                                            </div>
                                        </Container>
                                    </>
                                )}
                            </Translate>
                        </>
                    )
                }}
            </ArticlesQuery>

            {promo && <Promo section={promo} />}
        </BackgroundImage>
    )
}

