import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import _map from 'lodash/map'
import { Translate } from 'react-localize-redux'
import { getQuery } from 'lib/location/selectors'
import { isClient } from 'config/web'
import ArticlesByTag from 'queries/ArticlesByTag'
import { SEO } from 'features'
import NotFound from 'pages/not-found'
import { HeadingRegular } from 'layouts/typography'
import LinkArrow from 'pages/www/components/shared/link-arrow'
import { Container } from 'layouts'
import NewsTagType from 'types/news/NewsTagType'
import LanguageType from 'models/language-type'
import NewsType from 'models/types/ts/newsType'
import TagsContainer from '../tags/TagsContainer'
import Pagination from '../../../articles-category/components/pagination'
import { Card } from '../cards'
import style from './NewsByTag.module.scss'

interface Props {
    tag: string
    tags: Array<NewsTagType>
    language: LanguageType
}

const NewsByTag: React.FunctionComponent<Props> = ({
    tag,
    tags,
    language,
}): JSX.Element => {
    const [pageCount, setPageCount] = useState(0)
    const [newsItemCount, setNewsItemCount] = useState(0)
    const [pagingCurrentPage, setpagingCurrentPage] = useState(0)
    const pagingQuery = useSelector((state) => getQuery(state))

    const pagingItemsPerPage = 12
    let pagingItemsToSkip = 0
    let pagingCurrent = 0

    if (pagingQuery) {
        pagingCurrent = parseInt(pagingQuery.p, 10)
        if (pagingCurrentPage === 0 || pagingCurrent === 1) {
            pagingItemsToSkip = 0
        } else {
            pagingItemsToSkip = (pagingCurrent - 1) * pagingItemsPerPage
        }
    }

    const usePrevious = (value: number): number => {
        const ref = useRef<number>()
        useEffect(() => {
            ref.current = value
        })

        return ref.current
    }
    const prevPaging = usePrevious(pagingCurrentPage)

    useEffect(() => {
        if (pagingCurrent >= 1) setpagingCurrentPage(pagingCurrent - 1)
    }, [pagingCurrent])

    useEffect(() => {
        // Reset scroll pos when using bottom pagination
        if (isClient && prevPaging !== pagingCurrentPage) {
            if (window.pageYOffset > 400) {
                window.scrollTo(0, 0)
            }
        }
    }, [pagingCurrentPage])

    const pager = (): JSX.Element =>
        pageCount > 1 ? (
            <div className={style.pagination}>
                <Pagination
                    currentPage={pagingCurrentPage}
                    pageCount={pageCount}
                    path="t"
                    query={tag}
                    page="news"
                    subpage="t"
                    useQueryParameterForPaging
                />
            </div>
        ) : null

    const getTitle = (): JSX.Element => {
        return (
            <Translate>
                {({ translate }) => {
                    if (newsItemCount === 1)
                        return translate('news.newsTaggedWithSingle')
                            .toString()
                            .replace('##COUNT##', newsItemCount.toString())
                            .replace('##TAG##', tag)
                    return translate('news.newsTaggedWithPlural')
                        .toString()
                        .replace('##COUNT##', newsItemCount.toString())
                        .replace('##TAG##', tag)
                }}
            </Translate>
        )
    }

    return (
        <div className={style.newsByTagContainer}>
            <Translate>
                {({ translate }) => (
                    <Container className={style.wrapper}>
                        <SEO
                            title={translate('news.newsTaggedWithTitle')
                                .toString()
                                .replace('##TAG##', tag)}
                        />
                        <LinkArrow reverse path="news">
                            {translate('news.backToNews')}
                        </LinkArrow>
                        <HeadingRegular
                            className={style.heading}
                            textTransform="unset"
                        >
                            {getTitle()}
                        </HeadingRegular>
                        <TagsContainer tags={tags} />
                        {pager()}
                        <ArticlesByTag
                            locale={language}
                            skip={pagingItemsToSkip}
                            limit={pagingItemsPerPage}
                            tag={tag}
                        >
                            {(newsList: {
                                total: number
                                items: Array<NewsType>
                            }) => {
                                if (newsList) {
                                    if (newsList.total && newsList.total > 0)
                                        setPageCount(
                                            newsList.total / pagingItemsPerPage
                                        )
                                    setNewsItemCount(newsList.total)
                                    return (
                                        <div className={style.newsByCategory}>
                                            <div className={style.grid}>
                                                {_map(
                                                    newsList.items,
                                                    (item, i) => (
                                                        <Card
                                                            key={i}
                                                            filled
                                                            newsItem={item}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                }

                                return <NotFound />
                            }}
                        </ArticlesByTag>
                        {pager()}
                    </Container>
                )}
            </Translate>
        </div>
    )
}

export default NewsByTag
