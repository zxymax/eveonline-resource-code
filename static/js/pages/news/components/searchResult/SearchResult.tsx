import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { push } from 'redux-first-router'
import { Translate } from 'react-localize-redux'
import _debounce from 'lodash/debounce'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import { isClient } from 'config/web'
import { SEO } from 'features'
import { getQuery } from 'lib/location/selectors'
import LinkArrow from 'pages/www/components/shared/link-arrow'
import ArticlesSearch from 'queries/ArticlesSearchByTitleContent'
import { HeadingRegular, HeadingXSmall } from 'layouts/typography'
import { Icon, Container, Section } from 'layouts'
import NewsTagType from 'types/news/NewsTagType'
import LanguageType from 'models/language-type'
import NewsType from 'models/types/ts/newsType'
import Pagination from '../../../articles-category/components/pagination'
import TagsContainer from '../tags/TagsContainer'
import { Card } from '../cards'
import ArchiveButton from '../shared/archive-button'
import style from './SearchResult.module.scss'

interface Props {
    query: string
    tags: Array<NewsTagType>
    language: LanguageType
}

const SearchResult: React.FunctionComponent<Props> = ({
    query,
    tags,
    language,
}): JSX.Element => {
    const [inputString, setInputString] = useState('')
    const [searchString, setSearchString] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [totalSearchResultCount, setTotalSearchResultCount] = useState(0)
    const [pagingCurrentPage, setpagingCurrentPage] = useState(0)
    // const location = useSelector((state) => getLocationPayload(state))
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

    type PreviousType = string | number
    const usePrevious = (value: PreviousType): PreviousType => {
        const ref = useRef<PreviousType>()
        useEffect(() => {
            ref.current = value
        })

        return ref.current
    }

    const prevSearchString = usePrevious(searchString)
    const prevPaging = usePrevious(pagingCurrentPage)

    useEffect(() => {
        if (query) {
            setInputString(query)
            setSearchString(query)
        } else {
            setInputString('')
            setSearchString('')
        }
    }, [])

    useEffect(() => {
        if (pagingCurrent >= 1) setpagingCurrentPage(pagingCurrent - 1)
        if (
            prevSearchString &&
            prevSearchString !== searchString &&
            pagingCurrent >= 1
        )
            setpagingCurrentPage(0)
    }, [pagingCurrent, searchString])

    useEffect(() => {
        if (isClient && prevPaging !== pagingCurrentPage) {
            if (window.pageYOffset > 500) {
                window.scrollTo(0, 0)
            }
        }
    }, [pagingCurrentPage])

    const getUrl = (inpString: React.SetStateAction<string>): string => {
        return language === 'en'
            ? `/news/search?q=${inpString}`
            : `/${language}/news/search?q=${inpString}`
    }

    const delayedSetSearchString = useCallback(
        _debounce(
            (inpString: React.SetStateAction<string>) =>
                setSearchString(inpString),
            800
        ),
        []
    )

    const delayedPushToHistory = useCallback(
        _debounce(
            (inpString: React.SetStateAction<string>) =>
                push(getUrl(inpString)),
            1000
        ),
        []
    )

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault()
        setInputString(event.target.value)
        delayedSetSearchString(event.target.value)
        delayedPushToHistory(event.target.value)
    }

    const Pager = (): JSX.Element =>
        pageCount > 1 ? (
            <div
                style={{
                    display: 'grid',
                    gridColumnGap: '30px',
                    gridRowGap: '30px',
                    marginTop: '30px',
                }}
            >
                {totalSearchResultCount > 0 && (
                    <Pagination
                        currentPage={pagingCurrentPage}
                        pageCount={pageCount}
                        path="search"
                        query={query}
                        page="news"
                        subpage="search"
                        searchPaging
                    />
                )}
            </div>
        ) : null

    const getSearchResultText = (count: number): JSX.Element => {
        return (
            <Translate>
                {({ translate }) => {
                    if (count === 1)
                        return translate('news.searchResultsForSingle')
                            .toString()
                            .replace('##COUNT##', count.toString())
                            .replace('##SEARCHSTRING##', searchString)
                    return translate('news.searchResultsForPlural')
                        .toString()
                        .replace('##COUNT##', count.toString())
                        .replace('##SEARCHSTRING##', searchString)
                }}
            </Translate>
        )
    }

    return (
        <Translate>
            {({ translate }) => (
                <div className={style.newsByCategoryContainer}>
                    <SEO
                        title={translate('news.searchResultsTitle')
                            .toString()
                            .replace('##SEARCHSTRING##', searchString)}
                    />
                    <Container className={style.container}>
                        <LinkArrow
                            className={style.backLink}
                            reverse
                            path="news"
                        >
                            {translate('news.backToNews')}
                        </LinkArrow>
                        {/* {getSearchResultText(totalSearchResultCount)} */}
                        <HeadingRegular className={style.title}>
                            {getSearchResultText(totalSearchResultCount)}
                        </HeadingRegular>
                        <div className={style.search}>
                            <TagsContainer tags={tags}>
                                <input
                                    type="text"
                                    value={inputString}
                                    onChange={(event) =>
                                        handleInputChange(event)
                                    }
                                />
                                <Icon solid name="search" />
                            </TagsContainer>
                        </div>
                        <Pager />
                        <ArticlesSearch
                            locale={language}
                            skip={pagingItemsToSkip}
                            limit={12}
                            query={searchString}
                        >
                            {(collection: {
                                loading: boolean
                                dataToRender: {
                                    total: number
                                    items: Array<NewsType>
                                }
                            }) => {
                                if (collection && collection.loading)
                                    return (
                                        <Section
                                            hasContent={false}
                                            spinnerSize={20}
                                        />
                                    )
                                // if (collection && !collection.loading)
                                if (
                                    collection &&
                                    collection.dataToRender.total
                                ) {
                                    setTotalSearchResultCount(
                                        collection.dataToRender.total
                                    )
                                    setPageCount(
                                        collection.dataToRender.total /
                                            pagingItemsPerPage
                                    )
                                } else {
                                    setTotalSearchResultCount(0)
                                    return (
                                        <div className={style.noResults}>
                                            <h4>
                                                {translate(
                                                    'news.searchNoResultsTitle'
                                                )
                                                    .toString()
                                                    .replace(
                                                        '##QUERY##',
                                                        searchString
                                                    )}
                                            </h4>
                                            <h3>
                                                {translate(
                                                    'news.searchSuggestions'
                                                )}
                                            </h3>
                                            <ul>
                                                <li>
                                                    {translate(
                                                        'news.searchSuggestion1'
                                                    )}
                                                </li>
                                                <li>
                                                    {translate(
                                                        'news.searchSuggestion2'
                                                    )}
                                                </li>
                                                <li>
                                                    {translate(
                                                        'news.searchSuggestion3'
                                                    )}
                                                </li>
                                            </ul>
                                            <ArchiveButton />
                                        </div>
                                    )
                                }
                                return (
                                    <div className={style.searchResults}>
                                        {_map(
                                            collection.dataToRender.items,
                                            (item, i) => (
                                                <Card
                                                    key={i}
                                                    filled
                                                    newsItem={item}
                                                />
                                            )
                                        )}
                                        {pagingCurrentPage >=
                                            Math.floor(pageCount) && (
                                            <div className={style.more}>
                                                <HeadingXSmall textTransform="unset">
                                                    <ReactMarkdown
                                                        source={translate(
                                                            'news.cantFindTitle'
                                                        ).toString()}
                                                        disallowedTypes={[
                                                            'paragraph',
                                                        ]}
                                                        unwrapDisallowed
                                                        escapeHtml={false}
                                                    />
                                                </HeadingXSmall>
                                                <LinkArrow
                                                    path="articles/news"
                                                    className={style.moreLink}
                                                >
                                                    <ReactMarkdown
                                                        source={translate(
                                                            'news.cantFindLink'
                                                        ).toString()}
                                                        disallowedTypes={[
                                                            'paragraph',
                                                        ]}
                                                        unwrapDisallowed
                                                        escapeHtml={false}
                                                    />
                                                </LinkArrow>
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </ArticlesSearch>
                        {totalSearchResultCount > 0 && <Pager />}
                    </Container>
                </div>
            )}
        </Translate>
    )
}

export default SearchResult

