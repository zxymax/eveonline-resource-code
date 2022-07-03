/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { redirect } from 'redux-first-router'
import { fetchArticle, fetchPageArticles } from 'lib/pages/api'
import {
    setArticleStarted,
    setArticle,
    setArticlesStarted,
    setArticles,
    redirect as redirectAction,
    setNotFound,
} from 'lib/pages/actions'

export async function getArticleFromApiForNewNews(
    dispatch,
    getState,
    language
) {
    const {
        payload: { subpage, id },
    } = getState().location

    const slug = id

    const currentArticle = getState().pages.article

    // Check if this article is currently in state
    if (!currentArticle || currentArticle.id !== slug) {
        // Not in state so try getting from Articles API
        // We are only doing this on new news paths to get old articles.
        if (subpage === 'view') {
            // Hack to not show really old article from elastic that breaks GDPR
            if (
                slug ===
                'the-council-of-stellar-management-second-election-results-are-in'
            ) {
                return dispatch(setNotFound())
            }

            dispatch(setArticleStarted())

            // Get the article
            const article = await fetchArticle(slug, language).catch(() =>
                console.log('error when getting article')
            )

            // Article found, putting in state to use as fallback
            if (article !== null) {
                return dispatch(setArticle(article))
            }
        }
    }
}

export async function getArticleLegacy(
    dispatch,
    getState,
    language,
    preview: boolean
) {
    // console.log('getArticle_Legacy() running...')
    if (!getState().pages.articles) {
        dispatch(setArticlesStarted())
        const articles = await fetchPageArticles(language)
        dispatch(setArticles(articles))
    }
    const {
        payload: { subpage, id },
    } = getState().location

    if (!getState().pages.article || getState().pages.article.id !== subpage) {
        dispatch(setArticleStarted())
        if (!subpage) {
            return dispatch(setNotFound())
        }

        // Hack to not show really old article from elastic that breaks GDPR
        if (
            subpage ===
            'the-council-of-stellar-management-second-election-results-are-in'
        ) {
            return dispatch(setNotFound())
        }

        // Adding preview functionality for dev and preview web
        if (preview) {
            // No need to do anything, maybe invert the if??
            // console.log('IT IS SET TO PREVIEW!!')
            // this part is handled by graphql query and preview
            // No need to get article here with our API, let component with graphql handle it.
        } else {
            const article = await fetchArticle(subpage, language).catch(() =>
                dispatch(setNotFound())
            )

            // Article not found or error.
            if (article == null) {
                return dispatch(setNotFound())
            }

            // Redirect to correct slug if article has slug set
            // and slug in url is not same as article slug.
            if (article.slug) {
                if (article.slug !== id) {
                    const action = redirect(
                        redirectAction('article', article.id, article.slug)
                    )
                    return dispatch(action)
                }
                // This is slug in url that should not be there if slug is not set in article.
            } else if (id) {
                const action = redirect(redirectAction('article', article.id))
                return dispatch(action)
            }
            return dispatch(setArticle(article))
        }
    }
}

export async function runArticleRedirects(dispatch, getState, language) {
    // console.log('getArticle_Redirects() running...')

    const newsMainPath = 'news' // could be articles if we want to remove unique identifier from there.

    if (!getState().pages.articles) {
        dispatch(setArticlesStarted())
        const articles = await fetchPageArticles(language)
        dispatch(setArticles(articles))
    }

    const {
        payload: { subpage, id },
    } = getState().location

    // if (!getState().pages.article || getState().pages.article.id !== subpage) {
    // console.log('SITEMAP subpage:: ', subpage)
    if (!subpage) {
        return dispatch(setNotFound())
    }

    // New experiment to redirect always from /article/{identifier}/{slug}
    // From /article/{unid}/{slug} to /article/view/{slug}
    // console.log('SITEMAP: subpage and id: ', subpage, id)
    if (subpage.length === 6 && id) {
        // console.log('THIS IS (LIKELY) identifier url')
        const action = redirect(redirectAction(newsMainPath, 'view', id))
        return dispatch(action)
    }
    // Special case, we can support while articles api is still alive
    // Might be a link to only unique identifier
    if (subpage.length === 6 && !id) {
        // console.log('THIS IS (LIKELY) only with identifier, find article in articles api and redirect')
        const article = await fetchArticle(subpage, language).catch(() =>
            dispatch(setNotFound())
        )
        // Article not found or error.
        // if (article == null) {
        //     return dispatch(setNotFound())
        // }
        // console.log('ARTICLE: ', article)
        if (article.slug) {
            if (article.slug !== id) {
                const action = redirect(
                    redirectAction(newsMainPath, 'view', article.slug)
                )
                return dispatch(action)
            }
            // This is slug in url that should not be there if slug is not set in article.
        }
    }
    // This is a url type to older articles that don't have identifier, path is /article/{slug} redirect to /news/view/{slug}
    else if (subpage && !id) {
        // From /article/{slug} to /article/view/{slug}
        if (subpage && !id) {
            // console.log('THIS IS (LIKELY) old slug, ')

            // Hack to not show really old article from elastic that breaks GDPR
            if (
                subpage ===
                'the-council-of-stellar-management-second-election-results-are-in'
            ) {
                return dispatch(setNotFound())
            }

            // Redirect straight to new news path, that will handle getting the article from Articles API and more.
            const action = redirect(
                redirectAction(newsMainPath, 'view', subpage)
            )
            return dispatch(action)
        }
    }

    // }
}
