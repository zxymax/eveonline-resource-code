import React from 'react'
import PropTypes from 'prop-types'
import s from './Row.scss'

const Row = (props) => {
    const { children, className } = props
    return <div className={`${s.row} ${className}`}>{children}</div>
}

Row.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default Row

