import axios from 'axios'
import { NOT_FOUND } from 'redux-first-router'
import { paths } from '../../config'
import { getLanguage } from '../../selectors'

export const REQUEST_ADS = 'REQUEST_ADS'
export const FETCH_ADS = 'FETCH_ADS'
export const FETCH_ADS_SUCCESSFULL = 'FETCH_ADS_SUCCESSFULL'
export const IS_FETCHING_ADS = 'IS_FETCHING_ADS'

export function isFetching() {
    return {
        type: IS_FETCHING_ADS,
    }
}

export function fetchedAdsSuccessful(payload) {
    return {
        type: FETCH_ADS_SUCCESSFULL,
        payload,
    }
}

export function requestAds(payload) {
    return {
        type: REQUEST_ADS,
        payload,
    }
}

export function notFound() {
    return {
        type: NOT_FOUND,
    }
}

const fallbackAd = (language) => [
    {
        id: '1337',
        src: `https://web.ccpgamescdn.com/aws/eveonline/images/fallback/recruit-fallback-${language}.png`,
        link:
            'https://www.eveonline.com/recruit?utm_source=www&utm_medium=banner&utm_campaign=recruitment&utm_content=defaultcreative',
    },
]

function parseAdGlareResponse(response) {
    if (response.status !== 200)
        // Returning
        return fallbackAd
    // now we need to format the response
    if (response.data.response.success === 1) {
        return response.data.response.campaigns.map((v) => ({
            id: v.cID,
            src: v.creative_data.image_url,
            link: v.creative_data.click_url,
        }))
    }
    return fallbackAd
}

async function getDataFromAdGlareJson(adglareUrl, lang) {
    const options = {
        url: `${adglareUrl}&ag_custom_term=${lang}`,
        headers: {
            'Accept-Language': lang,
        },
        method: 'get',
    }

    return axios(options).then((response) => parseAdGlareResponse(response))
}

function shouldFetchAds(ads) {
    if (ads.shouldFetch) return true
    if (ads.isFetching) return false
    return !ads.adTypes
}

export async function fetchAdsIfNeeded(dispatch, getState) {
    // *const { payload: { ads } } = getState().ads // eslint-disable-line
    const language = getLanguage(getState())

    if (shouldFetchAds(getState().ads)) {
        dispatch(requestAds())

        // just testing this for now, to display tha ...loading text
        // const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await wait(2000)

        let small = []
        try {
            small = await getDataFromAdGlareJson(
                paths.adGlareUrl.medium,
                language
            )
        } catch (err) {
            small = fallbackAd(language)
        }

        return dispatch(fetchedAdsSuccessful({ small }))
    }
    return Promise.resolve()
}

export async function fetchAdsIfNeededNew(dispatch, getState) {
    // *const { payload: { ads } } = getState().ads // eslint-disable-line
    const language = getLanguage(getState())

    if (shouldFetchAds(getState().ads)) {
        dispatch(requestAds())

        let small = []
        try {
            small = await getDataFromAdGlareJson(
                paths.adGlareUrl.large,
                language
            )
        } catch (err) {
            small = fallbackAd(language)
        }

        return dispatch(fetchedAdsSuccessful({ small }))
    }
    return Promise.resolve()
}
