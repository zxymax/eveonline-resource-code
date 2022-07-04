import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import { Link } from 'features'
import style from './Pagination.scss'

const Pagination = (props) => {
    const getPages = () => {
        if (props.currentPage == null) {
            return []
        }

        const tmpPages = []

        const startIndex = Math.max(0, props.currentPage - 5)
        let size = 1
        // Always show at least one page even if there is nothing on it
        if (props.pageCount > 0) {
            size = Math.min(props.pageCount, 10)
        }

        for (let i = startIndex; i < startIndex + size; i++) {
            if (i < props.pageCount) {
                tmpPages.push({
                    id: i + 1,
                    active: i === props.currentPage,
                })
            }
        }

        return tmpPages
    }

    const getLinkPath = (pageId) => {
        let query = null
        if (props.query !== '') {
            if (props.useQueryParameterForPaging) {
                query = { p: props.pageId }
            } else {
                query = { q: props.query }
            }
        }
        let path = {
            id: pageId,
            page: props.page,
            subpage: props.subpage,
            query,
        }

        const searchPaging = {
            // id: props.query,
            page: props.page,
            subpage: props.subpage,
            query: {
                q: props.query,
                p: pageId,
            },
        }

        const pathWithQueryParameterForPaging = {
            id: props.query,
            page: props.page,
            subpage: props.subpage,
            query: { p: pageId },
        }

        if (props.searchPaging) {
            path = searchPaging
        } else if (props.useQueryParameterForPaging) {
            path = pathWithQueryParameterForPaging
        }

        return path
        // return props.useQueryParameterForPaging ? pathWithQueryParameterForPaging : path
    }

    const renderPrevious = () =>
        // eslint-disable-next-line
        props.currentPage > 0 && (
            <li className={style.prev}>
                <Link path={getLinkPath(props.currentPage)}>
                    <Translate id="news.pagerPrevious" />
                </Link>
            </li>
        )

    const renderNext = () => {
        const next = props.currentPage + 2
        return (
            next < props.pageCount + 1 && (
                <li className={style.next}>
                    <Link path={getLinkPath(next)}>
                        <Translate id="news.pagerNext" />
                    </Link>
                </li>
            )
        )
    }

    const renderLinks = () => {
        const pages = getPages()
        return pages.map((item) => (
            <li
                className={style(
                    item.active ? style.active : '',
                    style.paging_iterator
                )}
                key={item.id}
            >
                <Link path={getLinkPath(item.id)}>{item.id}</Link>
            </li>
        ))
    }

    return (
        <div className={style.pagination}>
            <ul>
                {renderPrevious()}
                {renderLinks()}
                <li className={style.current_page}>
                    {(props.currentPage || 0) + 1}
                </li>
                {renderNext()}
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    query: PropTypes.string,
    page: PropTypes.string,
    path: PropTypes.string,
    subpage: PropTypes.string,
    useQueryParameterForPaging: PropTypes.bool,
    searchPaging: PropTypes.bool,
}

export default Pagination
