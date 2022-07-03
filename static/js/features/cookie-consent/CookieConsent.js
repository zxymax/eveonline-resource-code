import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

class CookieConsent extends Component {
    /**
     * * Prevent re-rendering on language change
     */
    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <Helmet
                script={[
                    {
                        type: 'text/javascript',
                        id: 'Cookiebot',
                        src: 'https://consent.cookiebot.com/uc.js',
                        'data-culture': this.props.lang,
                        'data-cbid': '4cc2df34-0a0c-497c-9e2b-5a281e365fa4',
                        async: false,
                    },
                ]}
            />
        )
    }
}

CookieConsent.propTypes = {
    lang: PropTypes.string,
}

CookieConsent.defaultProps = {
    lang: 'en',
}

export default CookieConsent
