import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import { isServer } from 'config/web'

function MediaQuotes({ className, quote }) {
    if (!quote) {
        return null
    }

    if (isServer) {
        return null
    }

    const { body, imageFile, name } = quote

    return (
        <div className={className}>
            <div>
                <img src={imageFile} alt={name} />
                <ReactMarkdown source={body} />
            </div>
        </div>
    )
}

MediaQuotes.propTypes = {
    className: PropTypes.string,
    quote: PropTypes.shape({
        body: PropTypes.string,
        image: PropTypes.string,
        imageFile: PropTypes.string,
        name: PropTypes.string,
    }),
}

export default MediaQuotes
