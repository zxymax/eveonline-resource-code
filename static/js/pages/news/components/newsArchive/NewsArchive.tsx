import React, { useState, useEffect, useRef } from 'react'
import _map from 'lodash/map'
import { useSelector } from 'react-redux'
import { Translate } from 'react-localize-redux'
import { push } from 'redux-first-router'
import ArticlesArchiveQuery from 'queries/ArticlesArchiveQuery'
import {
    getLocationPayload,
    getQuery,
    getPathname,
} from 'lib/location/selectors'
import { isClient } from 'config/web'
import { Container, Section } from 'layouts'
import { HeadingRegular } from 'layouts/typography'
import { SEO } from 'features'
import LinkArrow from 'pages/www/components/shared/link-arrow'
import NewsTagType from 'types/news/NewsTagType'
import LanguageType from 'models/language-type'
import NewsType from 'models/types/ts/newsType'
import monthsShort from './locale'
import Pagination from '../../../articles-category/components/pagination'
import TagsContainer from '../tags/TagsContainer'
import { Card } from '../cards'
import FilterYear from './components/filter'
import style from './NewsArchive.module.scss'

interface Props {
    tags: Array<NewsTagType>
    language: LanguageType
}

export default function NewsArchive({ tags, language }: Props): JSX.Element {
    const location = useSelector((state) => getLocationPayload(state))
    const pathname = useSelector((state) => getPathname(state))
    const [pageCount, setPageCount] = useState(0)
    const [pagingCurrentPage, setpagingCurrentPage] = useState<number>(0)
    const pagingQuery = useSelector((state) => getQuery(state))
    const [year, setYear] = useState<string>(
        new Date().getFullYear().toString()
    )
    const [month, setMonth] = useState<string>(null)

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

    type PreviousType = string | number

    const usePrevious = (value: PreviousType): PreviousType => {
        const ref = useRef<PreviousType>()
        useEffect(() => {
            ref.current = value
        })

        return ref.current
    }

    const prevYear = usePrevious(year)
    const prevMonth = usePrevious(month)
    const prevPaging = usePrevious(pagingCurrentPage)

    useEffect(() => {
        if (location && location.id) {
            setYear(location.id.toString())

            // Reset pagination & months when changing year
            if (prevYear !== location.id) {
                setMonth(null)
                setpagingCurrentPage(0)
            }
        }
        if (pagingCurrent >= 1) setpagingCurrentPage(pagingCurrent - 1)
    }, [location, pagingCurrent])

    useEffect(() => {
        // Reset scroll pos when using bottom pagination
        if (isClient && prevPaging !== pagingCurrentPage) {
            if (window.pageYOffset > 500) {
                window.scrollTo(0, 0)
            }
        }
    }, [pagingCurrentPage])

    useEffect(() => {
        // Reset paging when changing month
        if (month && month !== prevMonth && pagingCurrent >= 1) {
            setpagingCurrentPage(0)
            push(pathname)
        }
    }, [month])

    const changeMonth = (monthClicked: string): void => {
        // Toggle functionality -> Check if same month clicked
        if (monthClicked === month) {
            setMonth(null)
        } else {
            setMonth(monthClicked)
        }
    }

    const getMonths = (): Array<JSX.Element> =>
        monthsShort[language].map((m: string, key) => {
            const monthKey = key + 1
            // format month 1-9 with 0 before
            const formatMonth = monthKey < 10 ? `0${monthKey}` : `${monthKey}`

            return (
                <div
                    key={m}
                    className={style(style.date, {
                        [style.active]: formatMonth === month,
                    })}
                    role="presentation"
                    onClick={() => changeMonth(formatMonth)}
                >
                    {m}
                </div>
            )
        })

    const pager = (): JSX.Element =>
        pageCount > 1 ? (
            <div className={style.pagination}>
                <Pagination
                    currentPage={pagingCurrentPage}
                    pageCount={pageCount}
                    path="archive"
                    query={location.id}
                    page="news"
                    subpage="archive"
                    useQueryParameterForPaging
                />
            </div>
        ) : null

    return (
        <div className={style.archive}>
            <Translate>
                {({ translate }) => (
                    <SEO
                        title={`${translate('news.newsArchive')} ${
                            new Date().getFullYear().toString() !== year
                                ? `- ${year}`
                                : ''
                        }`}
                        hideSitename
                    />
                )}
            </Translate>
            <Container>
                <LinkArrow reverse path="news">
                    <Translate id="news.backToNews" />
                </LinkArrow>
                <HeadingRegular textTransform="unset" className={style.heading}>
                    <Translate id="news.newsArchive" />
                </HeadingRegular>
                <TagsContainer tags={tags} />
            </Container>
            <div className={style.content}>
                <div className={style.filter}>
                    <FilterYear year={year} />
                    <div className={style.overflow}>
                        <div className={style.date_group}>{getMonths()}</div>
                    </div>
                </div>
                <div>
                    {pager()}
                    <ArticlesArchiveQuery
                        locale={language}
                        skip={pagingItemsToSkip}
                        limit={pagingItemsPerPage}
                        year={year}
                        month={month}
                    >
                        {(newsList: {
                            loading: boolean
                            total: number
                            items: Array<NewsType>
                        }) => {
                            if (newsList) {
                                if (newsList.loading)
                                    return <Section hasContent={false} />
                                if (newsList.total && newsList.total > 0)
                                    setPageCount(
                                        newsList.total / pagingItemsPerPage
                                    )
                                return (
                                    <div className={style.grid}>
                                        {_map(newsList.items, (item, i) => (
                                            <Card
                                                key={i}
                                                filled
                                                newsItem={item}
                                            />
                                        ))}
                                    </div>
                                )
                            }
                        }}
                    </ArticlesArchiveQuery>
                    {pager()}
                </div>
            </div>
        </div>
    )
}

