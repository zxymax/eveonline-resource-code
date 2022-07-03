export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_RENEW = 'LOGOUT_RENEW'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT = 'LOGOUT'
export const AUTH_UPDATE_TOKEN_START = 'AUTH_UPDATE_TOKEN_START'
export const AUTH_UPDATE_TOKEN_FINISH = 'AUTH_UPDATE_TOKEN_FINISH'
export const AUTH_UPDATE_TOKEN_ERROR = 'AUTH_UPDATE_TOKEN_ERROR'
export const AUTH_FIRST_LOAD_REFRESH = 'AUTH_FIRST_LOAD_REFRESH'

export const loginSuccess = (token, expiresAt) => ({
    type: LOGIN_SUCCESS,
    token,
    expiresAt,
})

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error,
})

export const login = (previousPath, config) => ({
    type: LOGIN_REQUEST,
    previousPath,
    config,
})

export const loginRenew = (previousPath) => ({
    type: LOGIN_RENEW,
    previousPath,
})

export const logout = (logoutUrl) => ({
    type: LOGOUT_REQUEST,
    logoutUrl,
})

export async function LoginRedirect(dispatch, previousPath, config) {
    return dispatch(login(previousPath, config))
}

export function LogoutRedirect(dispatch, logoutUrl) {
    return dispatch(logout(logoutUrl))
}

export const authUpdateTokenStart = () => ({
    type: AUTH_UPDATE_TOKEN_START,
})

export const authUpdateTokenFinish = (accessToken, expiresAt) => ({
    type: AUTH_UPDATE_TOKEN_FINISH,
    accessToken,
    expiresAt,
})

export const authUpdateTokenError = (updateTokenError) => ({
    type: AUTH_UPDATE_TOKEN_ERROR,
    updateTokenError,
})

export const authDoRefreshToken = () => ({
    type: AUTH_FIRST_LOAD_REFRESH,
})
