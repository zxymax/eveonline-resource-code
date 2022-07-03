import decode from 'jwt-decode'
import parseInt from 'lodash/parseInt'
import getConfig from 'config/web'
import { setItem, removeItem, getItem } from '../../../utils/storage'

const { authentication: { scopesArray } } = getConfig()


const TOKEN_KEY = 'token'
const EXPIRES_AT_KEY = 'expiresAt'
export const LOGINSTATE = 'loginState'
export const VERIFIER_KEY = 'codeVerifier'
export const REFRESH_TOKEN = 'ccp-rt'
export const PREVIOUS_PATH_COOKIE = 'www_prev_path'
const REFRESH_EXPIRATION_DAYS = 7 // Expire refresh cookie in 7 days

export const getExpiresAt = () => Number(getItem(EXPIRES_AT_KEY)) || null

export const getToken = () => {
    const expiresAt = getExpiresAt()

    if (expiresAt === null || expiresAt < Date.now()) {
        // login(window.location.href)
    }

    if (expiresAt === null || expiresAt > Date.now()) {
        return getItem(TOKEN_KEY) || null
    }
    return null
}

export const getSecondsUntilTokenExpires = () => {
    const expiresAt = getExpiresAt()
    const diff = expiresAt - Date.now()
    return diff / 1000
}

export const ShouldFetchNewTokenIfNeeded = () => {
    const diffSeconds = getSecondsUntilTokenExpires()
    if (diffSeconds < 300) {
        return true
    }
    return false
}

export const convertExpiresSecondsToTime = (expiresIn) => {
    const expiresDate = expiresIn ? parseInt(expiresIn) : NaN
    return !isNaN(expiresDate) ? Date.now() + expiresDate * 1000 : null
}

export const getUserFromJwt = () => {
    const currToken = getToken()
    let decodedToken = ''
    if (currToken) {
        decodedToken = decode(currToken)
    } else {
        decodedToken = ''
    }
    return decodedToken.name
}

export const validateScopes = (scopes) => {
    return scopesArray.every(scope => scopes.includes(scope))
}

export const getScopesFromJwt = (token = null) => {
    const currToken = token || getToken()
    let decodedToken = ''
    if (currToken) {
        decodedToken = decode(currToken)
    } else {
        decodedToken = ''
    }
    return decodedToken.scp
}

export const SetUniqueState = (uniqueState) => {
    setItem(LOGINSTATE, uniqueState)
}

export const hasToken = () => getToken() !== null

export const setToken = (token, expiresAt) => {
    setItem(TOKEN_KEY, token)
    if (expiresAt !== null) {
        setItem(EXPIRES_AT_KEY, expiresAt)
    } else {
        removeItem(EXPIRES_AT_KEY)
    }
}

export const setRefreshToken = (token) => {
    const expires = new Date()
    expires.setDate(expires.getDate() + REFRESH_EXPIRATION_DAYS)
    setItem(REFRESH_TOKEN, token, { path: '/', sameSite: 'strict', expires })
}

export const hasRefreshToken = () => getItem(REFRESH_TOKEN) != null

export const removeToken = () =>
    new Promise((resolve, reject) => {
        removeItem(TOKEN_KEY)
        removeItem(EXPIRES_AT_KEY)
        removeItem(LOGINSTATE)
        removeItem(REFRESH_TOKEN)
        resolve()
    })
