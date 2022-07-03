import React from 'react'
import PropTypes from 'prop-types'
import Box from './Box'
import styles from '../Frame.scss'

const Frame = ({
    children,
    className,
    frameClass,
    filled,
    border,
    large,
    medium,
    small,
    cutoutTop,
    cutCorner,
    cutoutBottom = true,
}) => {
    const props = {
        className,
        boxClass: frameClass,
        large,
        medium,
        small,
        cutoutTop,
        cutoutBottom,
        border,
        cutCorner,
    }

    if (filled || border) {
        props.className = styles(styles.defaultFilled, className)
        props.cutoutTop = false
        props.fillClass = styles.fillColor
        props.fillTop = true
        // props.cutCorner = true
    }

    if (border) {
        props.className = styles(styles.transparent, className)
        props.borderTopFill = true
        props.borderBottom = true
    }

    return <Box {...props}>{children}</Box>
}

Frame.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    frameClass: PropTypes.string,
    filled: PropTypes.bool,
    border: PropTypes.bool,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    cutoutTop: PropTypes.bool,
    cutCorner: PropTypes.bool,
}

Frame.defaultProps = {
    cutoutTop: true,
    cutCorner: false,
}

export default Frame
