import PropTypes from 'prop-types'

const { string } = PropTypes

export const propTypes = {
    primary: string,
    secondary: string,
    className: PropTypes.string,
}

export const defaultProps = {
    primary: 'Play for Free',
    secondary: 'Or Upgrade to Omega',
    className: '',
}
