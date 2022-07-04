import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticleUrl } from 'utils/articles'
import BackgroundImage from 'features/background-image'
import NotFound from 'pages/not-found'
import getRedirectFromPath from 'utils/redirect/redirect'
import ArticleBySlugQuery from 'queries/ArticleBySlugQuery'
import NewsType from 'models/types/ts/newsType'
import { GlobalState } from 'types/redux'
import SectionType from 'models/types/ts/sectionType'
import NewsDetail from './components/NewsDetail'
import s from './NewsDetailContainer.module.scss'

interface Props {
    featured: SectionType
}

export default function NewsDetailContainer({ featured }: Props): JSX.Element {
    const [article, setArticle] = useState<NewsType>(null)
    const [hasOldArticle, setHasOldArticle] = useState<boolean>(false)
    const [notFound, setNotFound] = useState<boolean>(false)
    const location = useSelector((state: GlobalState) => state.location)
    const dispatch = useDispatch()

    const subpage = location && location.payload && location.payload.subpage

    const slug = location && location.payload && location.payload.id

    const language = useSelector((state: GlobalState) => state.language)

    const oldArticle = useSelector(
        (state: GlobalState) => state && state.pages && state.pages.article
    )

    // Move to helper if needed elsewhere
    // Bit hard to remove any, need to get rid of this instead, and not be using the old article api anymore
    // eslint-disable-next-line
    function mapOldArticleToNew(old: any): NewsType {
        const mappedArticle: NewsType = {
            ...old,
            metaImageUrl: {
                url: old.metaImageUrl,
            },
            sys: {
                publishedAt: old.publishingDate,
            },
        }
        return mappedArticle
    }

    return (
        <div>
            <ArticleBySlugQuery slug={slug} locale={language}>
                {(singleArticle: NewsType) => {
                    // Article found in Contentful, use that
                    if (singleArticle) {
                        if (subpage === 't') {
                            dispatch(
                                getRedirectFromPath(
                                    getArticleUrl(singleArticle, slug)
                                )
                            )
                        }

                        return (
                            <BackgroundImage url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg">
                                <BackgroundImage
                                    url="https://images.ctfassets.net/7lhcm73ukv5p/3kBbL40e9KAKPMlM27jqRw/670eb7dd8cd76eab700ec8445373dd2c/news_detail_background.jpg?q=75"
                                    repeat="no-repeat"
                                    size="cover"
                                    position="center center"
                                    className={s.header}
                                />
                                <NewsDetail
                                    newsItem={singleArticle}
                                    featured={featured}
                                />
                            </BackgroundImage>
                        )
                    }
                    // Article was not in Contentful but might be in Articles API
                    if (oldArticle) {
                        const mappedArticle = mapOldArticleToNew(oldArticle)
                        if (mappedArticle && !hasOldArticle) {
                            setHasOldArticle(true)
                            setArticle(mappedArticle)
                            setNotFound(false)
                        }
                    } else {
                        // Article does not exist
                        setNotFound(true)
                    }

                    return <></>
                }}
            </ArticleBySlugQuery>

            {hasOldArticle && (
                <BackgroundImage url="https://images.ctfassets.net/7lhcm73ukv5p/1mv6Tg8PUsMWyGauWckSOo/5be5f00d5fb6d445f420b7a1c669fd26/star-bg.jpg">
                    <BackgroundImage
                        url="https://images.ctfassets.net/7lhcm73ukv5p/3kBbL40e9KAKPMlM27jqRw/670eb7dd8cd76eab700ec8445373dd2c/news_detail_background.jpg?q=75"
                        repeat="no-repeat"
                        size="cover"
                        position="center center"
                        className={s.header}
                    />
                    <NewsDetail newsItem={article} featured={featured} />
                </BackgroundImage>
            )}
            {notFound && <NotFound />}
        </div>
    )
}
