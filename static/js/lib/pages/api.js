import axios from 'axios'
import _find from 'lodash/find'
import Logger from 'utils/logging'
import getConfig from 'config/web'
import { AccountInfo, OmegaStatus } from 'types/account'
import SectionType from 'models/types/ts/sectionType'

const { sectionsApiUrl, articlesApiUrl, pagesApiUrl, cis } = getConfig()

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function findSectionByIdentifier(
    sections: Array<SectionType>,
    identifier: string
): SectionType {
    return _find(
        sections,
        (section) => section && section.identifier === identifier
    )
}

// TODO: Temporary hack to display EN content when passing JA into the articles API
function returnEnDefaultlang(language: string): string {
    return language === 'ja' ? 'en' : language
}

export async function fetchSection(id: string, language: string) {
    // Old code, keeping here for revert if needed
    // const { data } = await axios.get(`${SECTIONS_URL}/${id}?lang=${language}`)

    // return data[id]

    const url = `${sectionsApiUrl}/${id}?lang=${language}`

    return axios
        .get(url)

        .then((response) => {
            // Success 🎉
            if (response?.data) return response.data[id]
        })
        .catch((error) => {
            Logger.captureNetworkException(error, url, 'api.fetchSection')
        })
}

// NOT USED
// export async function fetchSections(sectionIds, language) {
//     const sections = await axios.get(
//         `${SECTIONS_URL}/${sectionIds}?lang=${returnEnDefaultlang(language)}`
//     )
//     return sections.data
// }

export async function fetchArticles(
    category: string,
    language: string,
    size = 10
) {
    const articles = await axios.get(
        `${articlesApiUrl}?cat=${category}&lang=${returnEnDefaultlang(
            language
        )}&pagesize=${size}`
    )

    return articles
}

/**
 * TODO This can be removed and related Redux things.
 * @param language The language to get the articles in
 * @returns Whole lot of stuff to put in Redux state, should not be used anymore after new news went live
 */
export async function fetchPageArticles(language: string) {
    const [news, devblogs, patchNotes, scope, upgrade] = await Promise.all([
        fetchArticles('news', returnEnDefaultlang(language), 5),
        fetchArticles('dev-blogs', returnEnDefaultlang(language), 3),
        fetchArticles('patch-notes', returnEnDefaultlang(language), 2),
        fetchArticles('scope', returnEnDefaultlang(language), 2),
        fetchSection('4jWSWHLzRSwkISQegieaaQ', returnEnDefaultlang(language)),
    ])

    return {
        news: news.data.results,
        devblogs: devblogs.data.results,
        patchNotes: patchNotes.data.results,
        scope: scope.data.results,
        upgrade: upgrade.section,
        hasContent: true,
    }
}

/**
 * TODO, code can be improved, missing .then and .catch and logging and just not proper data handling
 * @param id Id of the page to get
 * @param language The language to get the page in
 * @returns Single page from Contentful
 */
export async function fetchPageWithoutDispatch(id: string, language: string) {
    const url = `${pagesApiUrl}/${id}?lang=${returnEnDefaultlang(language)}`

    const page = await axios
        .get(url)
        .then((response) => {
            // Success 🎉
            return response
        })
        .catch((error) => {
            Logger.captureNetworkException(
                error,
                url,
                'api.fetchPageWithoutDispatch'
            )
        })

    return page
}

/**
 * TODO, code can be improved, missing .then and .catch and logging and just not proper data handling
 * @param subpage The slug of the article to get
 * @param language The language to get the article in
 * @returns Returns an article
 */
export async function fetchArticle(subpage: string, language: string) {
    const { data } = await axios.get(
        `${articlesApiUrl}/${subpage}?lang=${returnEnDefaultlang(language)}`
    )
    if (!data) {
        return null
    }

    return data
}

/**
 * TODO This functionality should be moved to our backend api to encapsulate cis calls. And remove dependency for cis from frontend.
 * @param token JWT user access token
 * @returns Users Account Info
 */
export async function fetchAccountInfo(token: string): Promise<AccountInfo> {
    const info = await axios({
        url: `${cis}v2/users/me`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
        method: 'get',
    })
        .then((result) => (result.status === 200 ? { ...result.data } : null))
        .catch((e) => {
            console.log(e)
            return null
        })

    return info
}

/**
 * TODO This functionality has been moved to our backend api
 * and can be called from another axios client under /services/api/customer
 * @param token JWT user access token
 * @returns Users entitlemenst data
 */
export async function fetchOmegaStatus(token: string): Promise<OmegaStatus> {
    const omegaStatus = await axios({
        url: `${cis}users/me/entitlements/eve_clonestate_omega`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
        method: 'get',
    })
        .then((result) =>
            result.status === 200
                ? result.data || []
                : { isValid: false, expiryDate: null }
        )
        .catch((e) => {
            console.log(e)
            if (e.response && e.response.status === 404) {
                return { isValid: false, expiryDate: null }
            }
            return { isValid: null, expiryDate: null }
        })

    return omegaStatus
}
