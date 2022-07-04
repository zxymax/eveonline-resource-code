import { redirect } from 'redux-first-router'
import queryString from 'query-string'
import _endsWith from 'lodash/endsWith'
import _startsWith from 'lodash/startsWith'

const isLanguageParameter = (parameter) =>
    parameter === 'en' ||
    parameter === 'de' ||
    parameter === 'fr' ||
    parameter === 'ru' ||
    parameter === 'ja'

const getRedirectFromPath = (path) => {
    // Make sure we never have undefined path to work with, at least it will return the root page.
    const pathToWorkWith = path || ''
    const url = pathToWorkWith.split('?')
    let rPath = url[0] // just stuff before query parameters
    let parts

    if (_endsWith(rPath, '/')) {
        rPath = rPath.slice(0, -1)
    }

    let query
    let search

    if (url.length === 2) {
        search = url[1]
        query = queryString.parse(search)
    }

    if (_startsWith(rPath, '/')) {
        parts = rPath.substring(1).split('/')
    } else {
        parts = rPath.split('/')
    }

    let index = 0
    let lang
    if (isLanguageParameter(parts[0])) {
        lang = parts[0]
        index++
    }

    const page = parts[index++]
    const subpage = parts[index++]
    const id = parts[index++]

    const payload = { lang, page, subpage, id }

    if (rPath === '' || rPath === '/') {
        return redirect({ type: 'PAGE' })
    }

    return redirect({ type: 'PAGE', payload, query })
}

export default getRedirectFromPath

