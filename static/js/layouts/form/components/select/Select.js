import React from 'react'
import PropTypes from 'prop-types'
import style from './Select.scss'

function Select(props) {
    const { dark, hasError, className, children, ...rest } = props

    rest.className = style('select', className, {
        dark,
        hasError,
    })

    return <select {...rest}>{children}</select>
}

export default Select

Select.propTypes = {
    dark: PropTypes.bool,
    hasError: PropTypes.bool,
    className: PropTypes.string,
}
