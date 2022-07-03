import { connect } from 'react-redux'
import { getLanguage } from 'selectors'
import {
    showNavigation,
    mobileMenuOpen,
    mobileAccountMenuOpen,
    getCurrentPage,
} from 'lib/menu/selectors'
import { closeMobileNavigation, toggleMobileNavigation } from 'lib/menu/actions'
import {
    isLoggedIn,
    getLoggedInUser,
} from 'packages/authentication/lib/selectors'
import Navigation from './Navigation'

/* eslint-disable @typescript-eslint/explicit-function-return-type */

const mapStateToProps = (state) => ({
    showNavigation: showNavigation(state),
    mobileOpen: mobileMenuOpen(state),
    mobileAccountOpen: mobileAccountMenuOpen(state),
    isLoggedIn: isLoggedIn(state),
    userName: getLoggedInUser(state),
    language: getLanguage(state),
    currentPage: getCurrentPage(state),
    page: state.location.payload.page,
})

const mapDispatchToProps = (dispatch) => {
    return {
        closeMobileNavigation: () => dispatch(closeMobileNavigation()),
        toggleMobileNavigation: () => dispatch(toggleMobileNavigation()),
        // toggleMobileNavigationAccount: () => dispatch(toggleMobileNavigationAccount()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

// Old can be set here again instead of above code
// export { default } from '../navigation_old'
