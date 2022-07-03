import { connect } from 'react-redux'
import Logout from './Logout'

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}

export default connect(null, mapDispatchToProps)(Logout)
