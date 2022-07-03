// export { default } from './ErrorBoundary'

import { connect } from 'react-redux'
import ErrorBoundary from './ErrorBoundary'

function mapStateToProps(state) {
    // page should be 'store' for the store module
    // subpage is mapped to page for the store module.
    // id is mapped to subpage for the store module.
    return state
}

export default connect(mapStateToProps, null)(ErrorBoundary)
