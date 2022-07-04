import React, { Component } from 'react'
import _debounce from 'lodash/debounce'
import _startCase from 'lodash/startCase'
import _startsWith from 'lodash/startsWith'
import Logger from 'utils/logging'
import { push } from 'redux-first-router'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Container, Border, Icon } from 'layouts'
import { Link, SEO } from 'features'
import { pageFlags } from 'config/flags'
import BreadCrumbs from '../../../articles/components/articles/components/articles-breadcrumbs'
import Pagination from '../pagination'
import ArticlesList from '../articles-list'
import style from '../../ArticlesCategory.scss'

class ArticlesSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            articlesLoaded: false,
            articles: [],
            pages: 0,
            page: 0,
            searchParam: this.props.query,
            searchActive: this.props.query !== '',
            resultString: ' results for ', // TODO move to localization system when available
        }

        this.searchInput = React.createRef()
        this.inputSearch = _debounce(this.searchByInput, 200)
        this.addHistory = _debounce(this.pushToHistory, 1500)
    }

    componentDidMount = () => {
        this.searchInput.current.value = this.state.searchParam
        if (!isNaN(this.props.page)) {
            this.search({ pageId: this.props.page, query: this.props.query })
        }
    }

    componentDidUpdate = (prevProps) => {
        // Only update if props have changed and props don't match state
        if (
            prevProps.page !== this.props.page ||
            prevProps.query !== this.props.query
        ) {
            if (
                this.props.page !== this.state.page ||
                this.props.query !== this.state.searchParam
            ) {
                this.searchInput.current.value = this.props.query
                const shouldBeActive = this.props.query !== ''
                if (this.state.searchActive !== shouldBeActive) {
                    this.setSearchActive(this.props.query !== '')
                    // this.setState({ searchActive: this.props.query !== ''}) // Refactored to a function, so not getting no-set-state in componentDidMount eslint error
                }
                this.search({
                    pageId: this.props.page,
                    query: this.props.query,
                })
            }
        }
    }

    setSearchActive = (active) => {
        this.setState({ searchActive: active })
    }

    search = ({ pageId, query }) => {
        let q = query.substring(0, 64)
        q = q.replace(/`/g, '')
        q = q.replace(/\\/g, '')
        this.setState({ articlesLoaded: false })
        const searchString = `${this.props.endpoint}?page=${pageId}${
            q !== '' ? `&q=${q}` : ''
        }&cat=${this.props.category}&lang=${
            this.props.lang === 'ja' ? 'en' : this.props.lang
        }` // TODO: remove when we add JA into Article API
        axios
            .get(searchString)
            .then((response) => {
                this.setState({
                    total: response.data.total,
                    articlesLoaded: true,
                    articles: response.data.results,
                    pages: response.data.pages,
                    page: response.data.page,
                    searchParam: query,
                })
            })
            .catch((error) => {
                Logger.captureException(error, {
                    category: 'articles',
                    message: `Could not call '${searchString}' to search for '${query}'`,
                })
                this.setState({
                    total: 0,
                    articlesLoaded: true,
                    articles: [],
                    pages: 0,
                    page: 0,
                    searchParam: query,
                })
            })
    }

    searchByInput = () => {
        const query = this.searchInput.current.value
        this.setState({ articlesLoaded: false, searchParam: query })
        this.search({ pageId: 0, query })
        this.addHistory()
    }

    pushToHistory = () => {
        // No need to add the same query multiple times in a row to the browser history
        if (
            this.state.searchParam === this.props.query &&
            this.props.page === 0
        ) {
            return
        }

        const search =
            this.state.searchParam === ''
                ? null
                : `?q=${this.state.searchParam}`
        push({ pathname: this.props.path, search })
    }

    toggleSearch = () => {
        if (this.state.searchActive) {
            this.searchInput.current.value = ''
            this.inputSearch.cancel()
            this.addHistory.cancel()
        } else {
            this.searchInput.current.focus()
        }
        this.setState({ searchActive: !this.state.searchActive })
    }

    renderPagination = () => (
        // eslint-disable-next-line
        <Pagination
            currentPage={this.state.page}
            pageCount={this.state.pages}
            path={this.props.category}
            query={this.state.searchParam}
            page="articles"
            subpage={this.props.category}
            useQueryParameterForPaging={false}
        />
    )

    renderArticlesHeader = () => (
        <div className={style.article_heading}>
            <h2>
                EVE Online <strong>{_startCase(this.props.category)}</strong>
            </h2>
        </div>
    )

    renderResultHeader = () => {
        if (
            this.state.searchParam == null ||
            this.state.searchParam === '' ||
            !this.state.articlesLoaded
        ) {
            return null
        }

        return (
            <div>
                <span className={style.highlight}>{this.state.total}</span>
                {this.state.resultString}
                <span className={style.highlight}>
                    {this.state.searchParam}
                </span>
            </div>
        )
    }

    renderSearchBox = () => (
        <div
            className={
                this.state.searchActive
                    ? [style.search, style.active].join(' ')
                    : style.search
            }
        >
            <div className={style.searchBox}>
                <div className={[style.icon, style.end].join(' ')} />
                <input
                    ref={this.searchInput}
                    maxLength="64"
                    type="text"
                    onChange={() => this.inputSearch()}
                    placeholder={`Search ${this.props.category}`}
                />
                <button className={style.icon} onClick={this.toggleSearch}>
                    {!this.state.searchActive ? (
                        <Icon solid name="search" />
                    ) : (
                        <Link
                            path={{
                                page: 'articles',
                                subpage: this.props.category,
                            }}
                        >
                            <Icon solid regular name="times" />
                        </Link>
                    )}
                </button>
            </div>
        </div>
    )

    renderCategoryLinks = () => (
        <div className={style.category_links}>
            <a href="/articles/news">News</a>
            <a href="/articles/dev-blogs">Dev Blogs</a>
            <a href="/articles/patch-notes">Patch Notes</a>
        </div>
    )

    render() {
        const metaTitle = _startCase(this.props.category)
        const articlesHeader = this.renderArticlesHeader()
        const resultHeader = this.renderResultHeader()
        const pagination = this.renderPagination()
        const searchBox = this.renderSearchBox()

        return (
            <div className={style(style.articles, style.articles_list)}>
                <SEO title={metaTitle} />
                <Container>
                    <BreadCrumbs
                        first="Home"
                        second="articles"
                        third={this.props.category}
                    />
                    {articlesHeader}
                    {searchBox}
                    <Border primary />
                    <div className={style.result_metadata}>
                        {resultHeader}
                        {pageFlags.newsEnabled && this.renderCategoryLinks()}
                        {pagination}
                    </div>
                    <ArticlesList
                        articles={this.state.articles}
                        category={this.props.category}
                        loaded={this.state.articlesLoaded}
                    />
                    {pagination}
                </Container>
            </div>
        )
    }
}

ArticlesSearch.propTypes = {
    path: PropTypes.string,
    query: PropTypes.string,
    category: PropTypes.string,
    page: PropTypes.number,
    lang: PropTypes.string,
    endpoint: PropTypes.string,
}

export default ArticlesSearch
