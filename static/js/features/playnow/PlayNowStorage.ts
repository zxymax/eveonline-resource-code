// import { setItem, getItem } from 'utils/storage'
import { isClient } from 'config/web'

const USER_TOKEN = 'signup-token'
const USER_NAME = 'signup-username'
const PLAY_TOKEN = 'signup-play'

export const setAfterSignupCookies = (
    userToken: string,
    username: string,
    playToken: string
): void => {
    if (isClient) {
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 30) // Store cookies for 30 minutes
        if (userToken !== undefined)
            sessionStorage.setItem(USER_TOKEN, userToken)
        if (username !== undefined) sessionStorage.setItem(USER_NAME, username)
        if (playToken !== undefined)
            sessionStorage.setItem(PLAY_TOKEN, playToken)
    }
}

export interface AfterSignupCookieValuesModel {
    user_token?: string
    username?: string
    access_token?: string
}

export const getAfterSignupCookieValues = (): AfterSignupCookieValuesModel => {
    if (isClient) {
        const values = {
            user_token: sessionStorage.getItem(USER_TOKEN),
            username: sessionStorage.getItem(USER_NAME),
            access_token: sessionStorage.getItem(PLAY_TOKEN),
        }
        return values
    }
    return {}
}
