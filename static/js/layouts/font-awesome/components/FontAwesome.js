import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FontAwesome(props) {
    const { name, className, fixedWidth } = props
    let prefix = 'l'
    if (props.brand) prefix = 'b'
    if (props.regular) prefix = 'r'
    if (props.solid) prefix = 's'
    if (props.light) prefix = 'l'
    const icon = [`fa${prefix}`, name]

    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
            fixedWidth={fixedWidth}
            alt={name}
        />
    )
}

export default FontAwesome

FontAwesome.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    brand: PropTypes.bool,
    regular: PropTypes.bool,
    solid: PropTypes.bool,
    light: PropTypes.bool,
    fixedWidth: PropTypes.bool,
}

