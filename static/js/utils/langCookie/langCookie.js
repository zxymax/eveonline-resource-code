import { redirect } from 'redux-first-router'
import { setItem, getItem } from 'utils/storage'

const LANGUAGE_COOKIE = 'www-lang'

export const setLangCookie = (lang) => {
    const expires = new Date()
    expires.setDate(expires.getDate() + 180)
    setItem(LANGUAGE_COOKIE, lang, { path: '/', expires })
}

export const getLangCookie = () => getItem(LANGUAGE_COOKIE)

export const redirectFromLangCookie = (dispatch, payload, location) => {
    const cookieLang = getLangCookie()
    let shouldRedirect = false

    const urlLanguage =
        payload.lang === undefined || payload.lang === '' ? 'en' : payload.lang

    if (cookieLang) {
        if (cookieLang !== urlLanguage) {
            shouldRedirect = true
            if (cookieLang === 'en') {
                payload.lang = undefined
            } else {
                payload.lang = cookieLang
            }
        }
    }

    if (shouldRedirect) {
        dispatch(
            redirect({
                type: 'PAGE',
                payload,
                query: location.query,
            })
        )
    }
}

