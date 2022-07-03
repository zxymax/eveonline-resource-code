import React from 'react'
// import { AxiosResponse } from 'axios'
import { redirect } from 'redux-first-router'
import getConfig from 'config/web'
import flags, { pageFlags } from 'config/flags'
import SEOComponent from 'features/seo'
import WWW from 'pages/www'
import Omega from 'pages/omega'
import Articles from 'pages/articles'
import ArticlesCategory from 'pages/articles-category'
import Article from 'pages/article'
import Monument from 'pages/monument'
import Download from 'pages/download'
import Signup from 'pages/signup'
import SignupVerify from 'pages/signup-verify'
import SignupConfirmation from 'pages/signup-confirmation'
import PartnershipProgram from 'pages/partnership-program'
import Policies from 'pages/policies'
import TestErrorPage from 'pages/testerrorpage'
import DynamicPage from 'pages/dynamic-page'
import SeoPage from 'pages/seo-page'
import Discovery from 'pages/discovery'
import Recruit from 'pages/recruit'
import News from 'pages/news'
import Academy from 'pages/academy'
// import Return from 'pages/return'
import ReturnToEve from 'pages/return-to-eve'
import Fanfest from 'pages/fanfest'
import Vegas from 'pages/vegas'
import Events from 'pages/events'
import Portal from 'pages/portal'
// import PlaySessionEnded from 'pages/play-session-ended'
import Launch from 'pages/launch'
import Comic from 'pages/comic'
import Anywhere from 'pages/anywhere'
// import MyYearInEVE from 'pages/year-in-eve'

// TODO move to helper for less imports and logic in sitemap.js
import TestPage from 'pages/testpage'
// import LanguageType from 'models/language-type'
// import { GlobalState } from 'types'
import SessionEnded from 'pages/anywhere/components/session-ended'
import SitemapModel from 'models/sitemap-model'
import Loading from 'layouts/loading'
import Login from 'packages/authentication/components/login'
import Logout from 'packages/authentication/components/logout'
import Callback from 'packages/authentication/components/callback'

import { fetchPageArticles } from '../lib/pages/api'

import {
    // setPage,
    // setPageStarted,
    setArticles,
    setArticlesStarted,
    setArticlesSuccessful,
    redirect as redirectAction,
    // setNotFound,
} from '../lib/pages/actions'

import getRedirectFromPath from '../utils/redirect/redirect'
import {
    runArticleRedirects,
    getArticleLegacy,
    getArticleFromApiForNewNews,
} from './sitemap/helpers'

const { articlesApiUrl, authentication, contentful } = getConfig()

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// async function getPagePopulate(
//     id: string,
//     slug: string,
//     dispatch: (action: unknown) => void,
//     getState: () => GlobalState,
//     language: LanguageType
// ): Promise<void> {
//     if (!getState().pages[id]) {
//         dispatch(setPageStarted(id))
//         const page = (await fetchPageWithoutDispatch(
//             slug,
//             language
//         )) as AxiosResponse
//         if (page && !page.data) {
//             return dispatch(setNotFound())
//         }
//         return dispatch(setPage(id, page.data))
//     }
// }

const sitemap: SitemapModel = {
    home: {
        path: '/',
        render: () => <WWW />,
        hideMenuBorder: true,
        hideCTA: true,
        showTwitch: true,
    },
    omega: {
        path: '/omega',
        render: (): JSX.Element => <Omega />,
        hideCTA: true,
        showTwitch: true,
    },
    download: {
        path: '/download',
        render: (): JSX.Element => <Download />,
        hideCTA: true,
    },
    'eve-academy': {
        path: '/eve-academy',
        render: (): JSX.Element => <Academy />,
        hideMenuBorder: true,
        showTwitch: false,
    },
    anywhere: {
        path: '/anywhere',
        render: (): JSX.Element => <Anywhere />,
        hideMenuBorder: true,
    },
    fanfest: {
        path: '/fanfest',
        render: (): JSX.Element => <Fanfest />,
        hideMenuBorder: true,
        showTwitch: false,
    },
    return: {
        path: '/return',
        render: (): JSX.Element => <ReturnToEve />,
        hideMenuBorder: true,
        hideCTA: true,
        showTwitch: true,
    },
    // 'return-to-eve': {
    //     path: '/return-to-eve',
    //     render: (): JSX.Element => <ReturnToEve />,
    //     hideMenuBorder: true,
    //     hideCTA: true,
    //     showTwitch: true,
    //     disabled: !flags.isDevelopment,
    // },
    vegas: {
        path: '/vegas',
        render: (): JSX.Element => <Vegas />,
    },
    'capsuleer-chronicles': {
        path: '/capsuleer-chronicles',
        render: (): JSX.Element => <Comic />,
        hideMenuBorder: true,
    },
    // 'my-year-in-eve-splash': {
    //     path: '/my-year-in-eve-splash',
    //     render: (): JSX.Element => <div />, // SSR redirect in redirectPaths.ts
    //     hideMenuBorder: true,
    // },
    // 'my-year-in-eve-config': {
    //     path: '/my-year-in-eve-config',
    //     render: (): JSX.Element => <div />, // SSR redirect in redirectPaths.ts
    //     hideMenuBorder: true,
    // },
    // 'my-year-in-eve': {
    //     path: '/my-year-in-eve',
    //     render: (): JSX.Element => <div />, // SSR redirect in redirectPaths.ts
    //     hideMenuBorder: true,
    //     hideMenu: true,
    // },
    // 'year-in-eve': {
    //     path: '/year-in-eve',
    //     render: (): JSX.Element => <MyYearInEVE />, // SSR redirect in redirectPaths.ts
    //     hideMenuBorder: true,
    //     hideMenu: true,
    //     requireAuth: false,
    // },
    launch: {
        path: '/launch',
        render: (): JSX.Element => <Launch />,
        hideMenuBorder: true,
        hideCTA: true,
    },
    'play-session-ended': {
        path: '/play-session-ended',
        // render: (): JSX.Element => <PlaySessionEnded />,
        render: (): JSX.Element => <SessionEnded />,
        // disabled: (!flags.isDevelopment && !flags.isStaging),
    },
    expansion: {
        path: '/expansion',
        redirect: redirectAction(),
    },
    articles: {
        path: '/articles',
        render: (): JSX.Element => <Articles />,
        async populate(dispatch, getState, language) {
            if (pageFlags.newsEnabled) {
                const action = redirect(redirectAction('news'))
                return dispatch(action)
            }
            // Run the old articles code until new news are live and all good
            if (!getState().pages.articles) {
                dispatch(setArticlesStarted())
                const articles = await fetchPageArticles(language)
                // return dispatch(setArticles(articles))
                dispatch(setArticles(articles))
            }
            dispatch(setArticlesSuccessful())
        },
        children: {
            values: ['news', 'dev-blogs', 'patch-notes', 'scope'],
            render: (): JSX.Element => (
                <ArticlesCategory endpoint={articlesApiUrl} />
            ),
        },
    },
    article: {
        path: '/article',
        render: (): JSX.Element => <Article />,
        async populate(dispatch, getState, language) {
            if (pageFlags.newsEnabled) {
                return runArticleRedirects(dispatch, getState, language)
            }
            // Run the old legacy code until new news are live and all good
            return getArticleLegacy(
                dispatch,
                getState,
                language,
                contentful.preview
            )
        },
    },
    now: {
        path: '/now',
        render: (): JSX.Element => <DynamicPage />,
        hideMenuBorder: true,
        hideCTA: true,
        showTwitch: false,
    },
    p: {
        path: '/p',
        render: (): JSX.Element => <SeoPage />,
        hideMenuBorder: true,
    },
    events: {
        path: '/events',
        render: (): JSX.Element => <Events />,
    },
    signup: {
        id: 'signup',
        path: '/signup',
        render: (): JSX.Element => <Signup />,
        showDarkHeader: true,
        hideMenu: true,
    },
    signup2: {
        path: '/signup2',
        redirect: redirectAction('signup'),
    },
    'signup-verify': {
        id: 'signupVerify',
        path: '/signup-verify',
        render: (): JSX.Element => <SignupVerify />,
        disabled: false,
        showDarkHeader: true,
        hideMenu: true,
    },
    'signup-confirmation': {
        id: 'signupConfirmation',
        path: '/signup-confirmation',
        render: (): JSX.Element => <SignupConfirmation />,
        disabled: false,
        showDarkHeader: true,
        hideMenu: true,
    },
    discovery: {
        path: '/discovery',
        render: (): JSX.Element => <Discovery />,
    },
    monument: {
        path: '/monument',
        render: (): JSX.Element => (
            <>
                <SEOComponent title="Monument Name Finder" />
                <Monument />
            </>
        ),
        hideMenuBorder: true,
    },
    news: {
        path: '/news',
        render: (): JSX.Element => <News />,
        disabled: !flags.pages.newsEnabled,
        hideMenuBorder: true,
        showTwitch: true,
        async populate(dispatch, getState, language) {
            // Getting article from API the old way and putting in state the old way, to be used to render old news if needed, not found in contentful.
            return getArticleFromApiForNewNews(dispatch, getState, language)
        },
    },
    recruit: {
        id: 'recruit',
        path: '/recruit',
        render: (): JSX.Element => <Recruit />,
        showDarkHeader: true,
        showLogin: true,
        showTwitch: true,
        disabled: !flags.pages.recruitmentEnabled,
    },
    policies: {
        path: '/policies',
        render: (): JSX.Element => <Policies />,
        // Data is populated in component with graphql query.
        disabled: !flags.isDevelopment,
    },
    partners: {
        path: '/partners',
        render: (): JSX.Element => <PartnershipProgram />,
        hideMenuBorder: true,
        // Data is populated in component with graphql query.
    },
    'eve-portal': {
        path: '/eve-portal',
        render: (): JSX.Element => <Portal />,
        hideMenuBorder: true,
    },
    // cookies: {
    //     path: '/cookies',
    //     render: () => <Cookies />,
    //     disabled: true,
    // },
    loading: {
        id: 'loading',
        path: '/loading',
        render: (): JSX.Element => <Loading />,
        disabled: !flags.isDevelopment,
    },
    login: {
        id: 'login',
        path: '/login',
        render: (): JSX.Element => (
            <Login config={authentication}>
                <Loading />
            </Login>
        ),
    },
    logout: {
        id: 'logout',
        path: '/logout',
        render: (): JSX.Element => (
            <Logout logoutUrl={authentication.logoutUrl}>
                <Loading />
            </Logout>
        ),
    },
    callback: {
        id: 'callback',
        path: '/callback',
        render: (): JSX.Element => (
            <Callback getRedirectFromPath={getRedirectFromPath}>
                <Loading />
            </Callback>
        ),
    },
    test: {
        id: 'test',
        path: '/test',
        render: (): JSX.Element => <TestPage />,
        hideMenuBorder: true,
        disabled: !flags.isDevelopment,
        // checkSettings: true
    },
    testerror: {
        id: 'testerror',
        path: '/',
        render: (): JSX.Element => <TestErrorPage />,
    },
}

export default sitemap
