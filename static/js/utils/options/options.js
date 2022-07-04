import { redirect } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'
import decode from 'jwt-decode'
// import Analytics from 'utils/analytics'
// import { getQuery } from 'lib/location/selectors'
// import processQueryParameters from 'utils/proto/QueryParameterProcessor'
import { addEventToDataLayer } from 'utils/analytics/virtualpath'
import consoleLog from 'utils/logging/ConsoleLogger'
import _isArray from 'lodash/isArray'
import _xor from 'lodash/xor'
import getConfig from 'config/web'
import queryString from 'query-string'

// import TagManager from 'react-gtm-module'
import {
    isLoggedIn,
    isAllowed,
    ShouldFetchNewTokenIfNeeded,
} from '../../packages/authentication'

import {
    hasToken,
    getToken,
    getExpiresAt,
    removeToken,
} from '../../packages/authentication/helpers/token'

import { loginSuccess } from '../../packages/authentication/lib/actions'

const { authentication: { scopesArray } } = getConfig()

const validateToken = (dispatch, payload) => {
    if (!hasToken()) return null

    // Start by decoding the JWT
    const jwt = decode(getToken())
    // Get the scopes in token as an array
    const scopeArr = _isArray(jwt.scp) ? [...jwt.scp] : [jwt.scp]

    // If there is a mismatch between scopes provided, and the ones requested
    // we destroy the tokens and issue a location reload
    if (_xor(scopeArr, scopesArray).length > 0) {
        removeToken().then(() => dispatch(redirect(payload)))
    }
}

export default {
    onBeforeChange: (
        dispatch,
        getState,
        { action: { payload, meta }, extra }
    ) => {
        const page = payload.page
        const subpage = payload.subpage
        const pageLocked = isAllowed(page, subpage)

        // console.log('getState(): ', getState())
        // console.log('meta: ', meta)

        consoleLog('isDevelopment=true - onBeforeChange running!')

        // TODO only on client, if possible, get correct Title and add to datalayer

        // console.log('document: ', document.getElementsByTagName('title'))
        // if(isClient)
        // console.log(
        //     'page.title: GET IT AND PUSH IT TO DATALAYER HERE IF POSSIBLE'
        // )
        // const tagManagerArgs = {
        //     dataLayer: {
        //         'page.title': 'test'
        //     }
        // }

        // TagManager.dataLayer(tagManagerArgs)

        // Adding to virtualpath if needed.
        const query =
            meta &&
            meta.location &&
            meta.location.current &&
            meta.location.current.query

        // console.log('payload: ', payload)

        addEventToDataLayer(page, subpage, query)

        // * Has Token in Cookie but not in state, first load.
        // ! Does not work on server (yet) because we don't have cookies
        // if (isClient) {
        if (hasToken() && !isLoggedIn(getState())) {
            dispatch(loginSuccess(getToken(), getExpiresAt(), ''))
        }
        // }

        const tokenExpiresAt = getState().auth.expiresAt
        const currentTime = new Date().getTime() // + 170000
        // Token has or is about to expire
        const tokenExpired = tokenExpiresAt - currentTime < 500

        if (pageLocked) {
            // Redirect behavior
            let path = ''
            let search = ''

            // * Getting urls part for redirect
            path = meta.location.current.pathname
            search = meta.location.current.search

            // * Prefix query parameters with questin mark
            if (search) search = `?${search}`

            // * Append query parameters
            if (search) path += search

            if (!isLoggedIn(getState()) || tokenExpired) {
                dispatch(
                    redirect({
                        type: 'PAGE',
                        payload: { page: 'login' },
                        query: { path },
                    })
                )
            } else {
                validateToken(dispatch, {
                    type: 'PAGE',
                    payload: { page: 'login' },
                    query: { path },
                })
            }
        }
    },
    onAfterChange: (dispatch, getState) => {
        consoleLog('isDevelopment=true - onAfterChange running!')

        // Fetch new token if needed
        if (isLoggedIn(getState()) && ShouldFetchNewTokenIfNeeded()) {
            // return dispatch(redirect({ type: 'LOGIN' }))
            // dispatch(login(action.previousPath))
        }
    },
    querySerializer: queryString,
    restoreScroll: restoreScroll({ manual: true }),
    // restoreScroll: restoreScroll({
    //     shouldUpdateScroll: (prev, locationState) => {
    //         // disable scroll restoration on history state changes
    //         // note: this is useful if you want to maintain scroll position from previous route
    //         if (prev.pathname === locationState.pathname) {
    //             return [0, 0]
    //         }

    //         // Setting to top on first load server side. Then locationState is empty json {}
    //         if (!locationState.pathname) {
    //             return [0, 0]
    //         }

    //         return true
    //     }
    // })
}

