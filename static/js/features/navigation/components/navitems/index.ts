import { connect } from 'react-redux'
import items from './navigation-items'

import NavItems from './NavItems'

/* eslint-disable @typescript-eslint/explicit-function-return-type */

function mapStateToProps(state) {
    return {
        page: state.location.payload.page,
        subpage: state.location.payload.subpage,
        items,
    }
}

export default connect(mapStateToProps)(NavItems)
