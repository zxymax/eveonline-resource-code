import { Component } from 'react'
import PropTypes from 'prop-types'
import { isClient } from 'config/web'
import { LoginRedirect } from '../../lib/actions'

class Login extends Component {
    componentDidMount() {
        if (isClient) {
            const { dispatch, prevPathname, config } = this.props
            LoginRedirect(dispatch, prevPathname, config)
        }
    }

    render() {
        return this.props.children
    }
}

Login.propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    prevPathname: PropTypes.string,
    config: PropTypes.any, //eslint-disable-line
}

export default Login
