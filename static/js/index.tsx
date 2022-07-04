import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import {
    LocalizedElement,
    LocalizeProvider,
    onMissingTranslationFunction,
} from 'react-localize-redux'
import { HelmetProvider } from 'react-helmet-async'
import { SettingsProvider } from 'settings'
import getApolloContentfulClient from 'utils/apollo/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { getLanguages } from 'selectors'
import { redirectFromLangCookie } from 'utils/langCookie'
import JourneyValuesManager from 'proto/helpers/journeyvalues'
import sessionId from 'utils/session-id'
import TagManager from 'react-gtm-module'
import getConfig, { isClient } from 'config/web'
import { UserProvider } from 'utils/context/UserContext'
import ScrollContext from 'utils/context/ScrollContext'
import {
    hasToken,
    hasRefreshToken,
    getToken,
    getExpiresAt,
} from './packages/authentication/helpers/token'
import {
    loginSuccess,
    authDoRefreshToken,
} from './packages/authentication/lib/actions'
import App from './layouts/app'
import './index.scss'
// import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'
import './config/fontawesome'
import globalTranslations from './globalTranslations'
import 'airbnb-browser-shims'

const { gtmId } = getConfig()

const { store } = configureStore(window.REDUX_STATE)

interface LocationState {
    payload: unknown
    query: unknown
    pathname: string
}

if (window !== undefined) {
    // Generate session ID
    sessionId()
    // Check if the user has auth cookie on client-side only
    if (hasToken()) {
        store.dispatch(loginSuccess(getToken(), getExpiresAt()))
    } else if (hasRefreshToken()) {
        store.dispatch(authDoRefreshToken())
    }

    const state = store.getState()

    const location = state?.location as LocationState
    // const { location } = state

    const { payload, query, pathname } = location

    // const payload = location.payload
    // const query = location.query
    // const path = location.pathname

    // PROTO_EVENT_TRACKING_CODE
    if (isClient) {
        const journeyValuesManager = new JourneyValuesManager(isClient)
        journeyValuesManager.processFirstPageVisit(pathname, query)
    }

    // redirecting to the language saved in the cookie if required
    redirectFromLangCookie(store.dispatch, payload, location)
}

const tagManagerArgs = {
    gtmId,
}

TagManager.initialize(tagManagerArgs)

const client = getApolloContentfulClient()

const onMissingTranslation: onMissingTranslationFunction = ({
    defaultTranslation,
}): LocalizedElement => defaultTranslation

const renderMethod = module.hot ? render : hydrate

renderMethod(
    <Provider store={store}>
        <SettingsProvider>
            <UserProvider>
                <ApolloProvider client={client}>
                    <LocalizeProvider
                        store={store}
                        initialize={{
                            languages: getLanguages(),
                            translation: globalTranslations,
                            options: {
                                onMissingTranslation,
                                renderToStaticMarkup,
                            },
                        }}
                    >
                        <HelmetProvider>
                            <ScrollContext>
                                <App />
                            </ScrollContext>
                        </HelmetProvider>
                    </LocalizeProvider>
                </ApolloProvider>
            </UserProvider>
        </SettingsProvider>
    </Provider>,
    document.getElementById('root')
)

// serviceWorker.unregister()

