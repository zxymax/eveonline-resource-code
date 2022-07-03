import { Component } from 'react'
import PropTypes from 'prop-types'
import { LogoutRedirect } from '../../lib/actions'

class Logout extends Component {
    componentDidMount = () => {
        const { dispatch, logoutUrl } = this.props
        LogoutRedirect(dispatch, logoutUrl)
    }

    render() {
        return this.props.children
    }
}

Logout.propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    logoutUrl: PropTypes.string,
}

export default Logout
