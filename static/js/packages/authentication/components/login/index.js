import { connect } from 'react-redux'
import { login } from '../../lib/actions'
import Login from './Login'

function mapStateToProps({ auth, location }) {
    let prevPathname = ''
    if (location && location.query) {
        prevPathname = location.query.path
    }
    return {
        isLoggedIn: auth.isLoggedIn,
        prevPathname,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        login: (config) => dispatch(login(config)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
