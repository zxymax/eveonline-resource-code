import React from 'react'
import PropTypes from 'prop-types'
import style from './Input.scss'

function Input(props) {
    const { dark, hasError, className, ...rest } = props

    rest.className = style(style.input, className, {
        dark,
        hasError,
    })

    return <input {...rest} />
}

export default Input

Input.propTypes = {
    dark: PropTypes.bool,
    hasError: PropTypes.bool,
    className: PropTypes.string,
}
