import PropTypes from 'prop-types'

const { string } = PropTypes

export const propTypes = {
    headline: string,
    teaser: string,
    body: string,
    image: string,
    buttonText: string,
    buttonUrl: string,
    videoId: string,
}

export const defaultProps = {}
