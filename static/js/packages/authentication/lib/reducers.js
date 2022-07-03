import { getUserFromJwt } from '../helpers/token'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    AUTH_UPDATE_TOKEN_FINISH,
} from './actions'

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                username: getUserFromJwt(action.token),
                expiresAt: action.expiresAt,
                error: null,
                isLoggingIn: false,
            }
        case AUTH_UPDATE_TOKEN_FINISH:
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                username: getUserFromJwt(action.accessToken),
                token: action.accessToken,
                expiresAt: action.expiresAt,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                username: null,
                expiresAt: null,
                error: action.error,
                isLoggingIn: false,
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                username: null,
                expiresAt: null,
                error: null,
                isLoggingIn: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default auth
