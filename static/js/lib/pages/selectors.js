import _ from 'lodash'
import { createSelector } from 'reselect'

export const pageType = (page) => {
    // console.log('page', page)

    // Bailing out early
    if (!page) return 'not_set'

    // If has config and config has pageType then return that.
    if (page.config && page.config.pageType) {
        return page.config.pageType
    }

    // Defaults to dynamic for now.
    // If changed then make sure that it's reflected in Contentful (and update unit tests)
    return 'dynamic'
}

export const isDynamic = (page) => {
    const type = pageType(page)
    return type === 'dynamic'
}

export const isSeo = (page) => {
    const type = pageType(page)
    return type === 'seo'
}

export const isEvent = (page) => {
    const type = pageType(page)

    return type === 'event'
}

export const isSingle = (page) => {
    const type = pageType(page)
    return type === 'single'
}

export const isDefault = (page) => {
    const type = pageType(page)
    return type === 'default'
}

const getPages = (state) => _.get(state, 'pages', {})

export const getOmegaState = createSelector([getPages], (pages) => {
    if (!pages.account || !pages.account.omegaStatus) {
        return { isValid: false, expiryDate: null }
    }
    return { ...pages.account.omegaStatus }
})

export const isAccountMenuOpen = createSelector(
    [getPages],
    (pages) => pages.accountMenuOpen
)

export const getActivities = createSelector([getPages], (pages) => {
    if (!pages.account || !pages.account.activities) {
        return { history: [] }
    }
    return {
        fetchFailed: pages.account.activities.fetchFailed,
        history: pages.account.activities.history || [],
    }
})
