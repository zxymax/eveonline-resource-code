import _ from 'lodash'

export const showNavigation = (state) => _.get(state, 'navigation.show', true)
export const mobileMenuOpen = (state) =>
    _.get(state, 'navigation.mobileOpen', false)
export const mobileAccountMenuOpen = (state) =>
    _.get(state, 'navigation.mobileAccountOpen', false)

export const getCurrentPage = (state) => state.location.pathname
