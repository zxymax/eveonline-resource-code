import React from 'react'
import PropTypes from 'prop-types'
import ReduxFirstRouterLink from 'redux-first-router-link'
import { shortHash } from 'utils/hash/short-hash'

const getTo = (url, path, lang) => {
    // If url is provided, we use that
    if (url != null && url !== '') {
        return url
    }

    const payload = {}
    // We don't want to have /en/ in the link
    if (lang != null && lang !== 'en' && lang !== '') {
        payload.lang = lang
    }
    if (path != null) {
        if (path.page != null) {
            payload.page = path.page
        }
        if (path.subpage != null) {
            payload.subpage = path.subpage
        }
        if (path.id != null) {
            payload.id = path.id
        }
        if (path.subid !== null) {
            payload.subid = path.subid
        }
        if (path.query != null) {
            payload.query = path.query
        }
    }
    return { type: 'PAGE', payload }
}

const Link = ({ children, className, lang, url, path, ...rest }) => {
    // Ensure there is always a data-id
    if (!rest['data-id'])
        rest['data-id'] = shortHash({ className, lang, url, path, ...rest })

    return (
        <ReduxFirstRouterLink
            className={className}
            to={getTo(url, path, lang)}
            {...rest}
        >
            {children}
        </ReduxFirstRouterLink>
    )
}

Link.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    lang: PropTypes.string,
    url: PropTypes.string,
    path: PropTypes.shape({
        page: PropTypes.string,
        subpage: PropTypes.string,
        query: PropTypes.any,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
}

export default Link
