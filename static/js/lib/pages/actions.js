import { NOT_FOUND } from 'redux-first-router'

export const FETCH_PAGE = 'FETCH_PAGE'
export const FETCH_PAGE_START = 'FETCH_PAGE_START'

export const FETCH_PAGE_HOME = 'FETCH_PAGE_HOME'
export const FETCH_PAGE_HOME_START = 'FETCH_PAGE_HOME_START'

export const FETCH_PAGE_ARTICLES = 'FETCH_PAGE_ARTICLES'
export const FETCH_PAGE_ARTICLES_START = 'FETCH_PAGE_ARTICLES_START'
export const FETCH_PAGE_ARTICLES_SUCCESSFUL = 'FETCH_PAGE_ARTICLES_SUCCESSFUL'
export const FETCH_PAGE_ARTICLES_CATEGORY = 'FETCH_PAGE_ARTICLES_CATEGORY'
export const FETCH_PAGE_ARTICLES_CATEGORY_START =
    'FETCH_PAGE_ARTICLES_CATEGORY_START'
export const FETCH_PAGE_ARTICLE = 'FETCH_PAGE_ARTICLE'
export const FETCH_PAGE_ARTICLE_START = 'FETCH_PAGE_ARTICLE_START'
export const FETCH_PAGE_OPTIMIZE_EVENT = 'FETCH_PAGE_OPTIMIZE_EVENT'
export const FETCH_PAGE_TRANSITION_EVENT = 'FETCH_PAGE_TRANSITION_EVENT'

export const TOGGLE_ACCOUNT_MENU = 'TOGGLE_ACCOUNT_MENU'

export const setPage = (id, page) => ({
    type: FETCH_PAGE,
    id,
    payload: { page },
})
export const setPageStarted = (id) => ({
    type: FETCH_PAGE_START,
    id,
})

export const setHome = (home) => ({ type: FETCH_PAGE_HOME, payload: { home } })
export const setHomeStarted = () => ({ type: FETCH_PAGE_HOME_START })

export const setArticles = (articles) => ({
    type: FETCH_PAGE_ARTICLES,
    payload: { articles },
})
export const setArticlesStarted = () => ({ type: FETCH_PAGE_ARTICLES_START })
export const setArticlesCategory = (articlesCategory) => ({
    type: FETCH_PAGE_ARTICLES_CATEGORY,
    payload: { articlesCategory },
})
export const setArticlesCategoryStarted = () => ({
    type: FETCH_PAGE_ARTICLES_CATEGORY_START,
})
export const setArticle = (article) => ({
    type: FETCH_PAGE_ARTICLE,
    payload: { article },
})
export const setArticleStarted = () => ({ type: FETCH_PAGE_ARTICLE_START })

export function setArticlesSuccessful(payload) {
    return {
        type: FETCH_PAGE_ARTICLES_SUCCESSFUL,
        payload,
    }
}

export function setGoogleOptimizeEvent() {
    return {
        type: FETCH_PAGE_OPTIMIZE_EVENT,
        // payload,
    }
}

export function setPageTransitionEvent() {
    // console.log('%cPAGE TRANSITION', 'color: #ad0011; font-size: 18px')
    return {
        type: FETCH_PAGE_TRANSITION_EVENT,
    }
}

export const setError = () => ({ type: 'ERROR' })
export const setNotFound = () => ({ type: NOT_FOUND })
export const redirect = (page, subpage, id, lang) => ({
    type: 'PAGE',
    payload: { lang, page, subpage, id },
})


