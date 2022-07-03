import axios from 'axios'
import qs from 'qs'
import _get from 'lodash/get'
import { getItem } from 'utils/storage'
import getConfig, { isClient } from 'config/web'
import {
    setToken,
    getScopesFromJwt,
    validateScopes,
    removeToken,
    convertExpiresSecondsToTime,
    getSecondsUntilTokenExpires,
    REFRESH_TOKEN,
    setRefreshToken,
} from '../helpers/token'
import { login, logoutRedirect } from '../helpers/authorize'

import { UPDATE_TOKEN_IN_MINUTES } from '../config'


import {
    AUTH_UPDATE_TOKEN_START,
    AUTH_UPDATE_TOKEN_FINISH,
    AUTH_FIRST_LOAD_REFRESH,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_RENEW,
    LOGOUT_REQUEST,
    loginRenew,
    authUpdateTokenStart,
    authUpdateTokenFinish,
    logout,
    authUpdateTokenError,
} from './actions'

const { authentication: { clientId, tokenUrl } } = getConfig()

let refreshIntervalTimer

const stopRefreshInterval = () => {
    if (window !== undefined) {
        clearInterval(refreshIntervalTimer)
    }
}
const startRefreshInterval = (store, force = false) => {
    // Prevent running if server-side
    if (!isClient) return null

    // Check if we need to update the token initially,
    // this is useful if the user refreshes the website
    // and the token has not been updated for a while.
    const minutesUntilTokenExpires = getSecondsUntilTokenExpires() / 60

    if (minutesUntilTokenExpires <= UPDATE_TOKEN_IN_MINUTES || force) {
        store.dispatch(authUpdateTokenStart())
    }

    if (window !== undefined) {
        stopRefreshInterval()
        refreshIntervalTimer = setInterval(() => {
            store.dispatch(authUpdateTokenStart())
        }, 1000 * 60 * UPDATE_TOKEN_IN_MINUTES)
    }
}

const runRefreshToken = (store) => {
    if (!isClient) return null

    // Get refresh token from cookie
    const refreshToken = getItem(REFRESH_TOKEN)

    // If no refresh token exists, we do nothing
    if (!refreshToken) {
        clearInterval(refreshIntervalTimer)
        return null
    }

    // Generate the body we'll send to SSO
    const body = {
        grant_type: 'refresh_token',
        client_id: clientId,
        refresh_token: refreshToken,
    }

    axios(tokenUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(body),
    })
        .then((response) => {
            const { expires_in, access_token, refresh_token } = _get(
                response,
                'data',
                {}
            )
            
            const scopeArr = getScopesFromJwt(access_token)
            const scopesMatched = validateScopes(scopeArr)

            if (access_token && expires_in && scopesMatched) {
                // Update access token
                store.dispatch(
                    authUpdateTokenFinish(
                        access_token,
                        convertExpiresSecondsToTime(expires_in)
                    )
                )

                // Update refresh token
                store.dispatch(setRefreshToken(refresh_token))
            }
            else {
                store.dispatch(authUpdateTokenError())
                store.dispatch(logout())
            }
        })
        .catch((err) => {
            // Update token failed
            store.dispatch(authUpdateTokenError(err))

            if (
                !(
                    (err.response === undefined && err.code === undefined) ||
                    err.code === 'ECONNABORTED'
                )
            ) {
                // Neither network error nor timeout
                store.dispatch(logout())
            }
        })
}

const authMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            login(action.previousPath, action.config)
            break
        case LOGIN_RENEW:
            loginRenew(action.previousPath)
            break
        case LOGIN_SUCCESS:
            setToken(action.token, action.expiresAt)
            startRefreshInterval(store)
            break
        case LOGIN_FAILURE:
            stopRefreshInterval()
            removeToken()
            break
        case LOGOUT_REQUEST:
            stopRefreshInterval()
            removeToken().then(() => logoutRedirect(action.logoutUrl))
            break
        case AUTH_FIRST_LOAD_REFRESH: {
            startRefreshInterval(store, true)
            break
        }
        case AUTH_UPDATE_TOKEN_START: {
            runRefreshToken(store)
            break
        }
        case AUTH_UPDATE_TOKEN_FINISH:
            setToken(action.accessToken, action.expiresAt)
            break
        default:
            break
    }
    return next(action)
}

export default authMiddleware
