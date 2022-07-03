import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Logger from 'utils/logging'
import Error from 'pages/error'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error, errorInfo) {
        // Display fallback UI
        this.setState({ hasError: true })

        let username = null

        const { auth, location, language } = this.props

        if (auth) {
            username = auth.username
        }

        const tags = {
            error_boundary: true,
        }

        const extra = {
            location,
            language,
            errorInfo,
        }

        Logger.captureException(error, extra, tags, username)
    }

    render() {
        if (this.state.hasError) {
            // Rendering error page.
            // this.props.dispatch(redirect({ type: 'ERROR' }))
            return <Error />
        }
        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
}

export default ErrorBoundary
