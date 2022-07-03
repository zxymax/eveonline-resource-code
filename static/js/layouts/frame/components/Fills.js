import React from 'react'
import PropTypes from 'prop-types'
import styles from '../Frame.scss'

const Fills = ({ top, bottom, large, medium, small, offset, className }) => {
    if (!top && !bottom) {
        return null
    }

    const fills = top && bottom
    const topFill = top && !bottom
    const bottomFill = bottom && !top
    const l = large && !medium && !small
    const m = medium && !large && !small
    const s = small || (!large && !medium)
    const classNames = styles('fills', className, {
        largeFills: fills && l,
        mediumFills: fills && m,
        smallFills: fills && s,
        largeTopFill: topFill && l,
        mediumTopFill: topFill && m,
        smallTopFill: topFill && s,
        largeBottomFill: bottomFill && l,
        mediumBottomFill: bottomFill && m,
        smallBottomFill: bottomFill && s,
        offset,
        regular: !offset,
    })
    return <div className={classNames} />
}

Fills.propTypes = {
    className: PropTypes.string,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    offset: PropTypes.bool,
}

export default Fills
