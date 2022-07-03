import React from 'react'
import PropTypes from 'prop-types'
import s from './Container.scss'

const Container = (props) => {
    const { children, className, wide, extraClass } = props

    const classes = [s.container]
    if (wide) {
        classes.push(s.wide)
    }

    if (extraClass) {
        classes.push(extraClass)
    }

    return (
        <div
            className={`${classes.join(' ')} ${
                className !== undefined ? className : null
            }`}
        >
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    wide: PropTypes.bool,
    extraClass: PropTypes.string,
}

export default Container

