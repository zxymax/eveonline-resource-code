import axios from 'axios'
import { NOT_FOUND } from 'redux-first-router'
import { paths } from '../../config'

export const REQUEST_VERSIONS = 'REQUEST_VERSIONS'
export const FETCH_VERSIONS = 'FETCH_VERSIONS'
export const FETCH_VERSIONS_SUCCESSFULL = 'FETCH_VERSIONS_SUCCESSFULL'
export const IS_FETCHING_VERSIONS = 'IS_FETCHING_VERSIONS'

export function isFetching() {
    return {
        type: IS_FETCHING_VERSIONS,
    }
}

export function fetchedVersionsSuccessful(payload) {
    return {
        type: FETCH_VERSIONS_SUCCESSFULL,
        payload,
    }
}

export function requestVersions(payload) {
    return {
        type: REQUEST_VERSIONS,
        payload,
    }
}

export function notFound() {
    return {
        type: NOT_FOUND,
    }
}

function parseVersionsResponse(response) {
    // console.log('RESPONSE', response)
    if (response.status !== 200) throw Error(response.status)
    // now we need to format the response
    if (response.data) {
        return response.data
    }
    return {}
}

async function getDataFromVersionsJson() {
    const options = {
        url: paths.launcherVersionsUrl,
        headers: {
            // 'Accept-Language': lang,
        },
        method: 'get',
    }

    return axios(options)
        .then((response) => parseVersionsResponse(response))
        .catch((error) => {
            console.info(
                `Error occurred while fetching Version content: ${error.message}`
            )
        })
}

function shouldFetchVersions(versions) {
    if (!versions) {
        return true
    }
    return false
}

export async function fetchVersionIfNeeded(dispatch, getState) {
    if (!shouldFetchVersions(getState().downloadVersions)) {
        // const largeUrl = paths.adGlareUrl.large

        dispatch(requestVersions())

        // just testing this for now, to display tha ...loading text
        // const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await wait(1000)

        const versions = await getDataFromVersionsJson()

        return dispatch(fetchedVersionsSuccessful({ versions }))
    }
    return Promise.resolve()
}
