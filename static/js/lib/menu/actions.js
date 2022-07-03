export const HIDE_NAVIGATION = 'HIDE_NAVIGATION'
export const TOGGLE_MOBILE_NAVIGATION = 'TOGGLE_MOBILE_NAVIGATION'
export const CLOSE_MOBILE_NAVIGATION = 'CLOSE_MOBILE_NAVIGATION'
export const TOGGLE_MOBILE_NAVIGATION_ACCOUNT =
    'TOGGLE_MOBILE_NAVIGATION_ACCOUNT'

export const hideNavigation = (hide) => ({
    type: HIDE_NAVIGATION,
    payload: hide,
})
export const closeMobileNavigation = () => ({ type: CLOSE_MOBILE_NAVIGATION })
export const toggleMobileNavigation = () => ({ type: TOGGLE_MOBILE_NAVIGATION })
export const toggleMobileNavigationAccount = () => ({
    type: TOGGLE_MOBILE_NAVIGATION_ACCOUNT,
})
