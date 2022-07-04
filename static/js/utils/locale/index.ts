import { isClient } from 'config/web'

function getLocales(): readonly string[] {
    if (isClient) {
        if (window.navigator && window.navigator.languages) {
            return window.navigator.languages
        }
        // Could add more checks here
        // window.navigator.language
        // window.navigator.userLanguage
        // window.navigator.browserLanguage
        // window.navigator.systemLanguage
    }
    return []
}

export default function getLocale(): string {
    if (isClient) {
        const locales = getLocales()
        if (locales && locales.length > 0) {
            return locales[0]
        }
        // return ''
    }
    // Defaults to empty string if nothing found
    return ''
}

