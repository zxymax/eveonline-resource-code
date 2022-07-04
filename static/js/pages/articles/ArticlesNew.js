import React from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import { getHash } from 'utils/articles'
import ArticlesByCategory from 'queries/ArticlesByCategory'
import Articles from './components/articles'

export default function ArticlesNew() {
    const lang = useSelector((state) => getLanguage(state))

    function imgReplace(str) {
        return str
            .replace('//images.ctfassets.net/', '//webimg.ccpgamescdn.com/')
            .replace('https:', '')
    }

    function process(articles) {
        // console.log('articles: ', articles)

        const processed = articles.map((article) => {
            return {
                ...article,
                id: getHash(article),
                metaImageUrl:
                    article.metaImageUrl &&
                    article.metaImageUrl.url &&
                    imgReplace(article.metaImageUrl.url),
            }
        })

        return processed
    }

    return (
        <ArticlesByCategory locale={lang} limit={5} category="news">
            {(news) => {
                return (
                    <ArticlesByCategory
                        locale={lang}
                        limit={3}
                        category="dev-blogs"
                    >
                        {(devblogs) => {
                            return (
                                <ArticlesByCategory
                                    locale={lang}
                                    limit={2}
                                    category="patch-notes"
                                >
                                    {(patchNotes) => {
                                        return (
                                            <ArticlesByCategory
                                                locale={lang}
                                                limit={2}
                                                category="scope"
                                            >
                                                {(scope) => {
                                                    return (
                                                        <Articles
                                                            news={process(news)}
                                                            devblogs={process(
                                                                devblogs
                                                            )}
                                                            patchNotes={process(
                                                                patchNotes
                                                            )}
                                                            scope={process(
                                                                scope
                                                            )}
                                                            lang={lang}
                                                            hasContent
                                                        />
                                                    )
                                                }}
                                            </ArticlesByCategory>
                                        )
                                    }}
                                </ArticlesByCategory>
                            )
                        }}
                    </ArticlesByCategory>
                )
            }}
        </ArticlesByCategory>
    )
}
