import React from 'react'
import PropTypes from 'prop-types'
import styles from '../Frame.scss'

const Content = ({
    children,
    className,
    top,
    bottom,
    corner,
    large,
    medium,
    small,
    offset,
}) => {
    const cuts = top && bottom
    const topCut = top && !bottom
    const bottomCut = bottom && !top
    const l = large && !medium && !small
    const m = medium && !large && !small
    const s = small || (!large && !medium)
    const classNames = styles('content', className, {
        corner,
        noCorner: !corner,
        cornerOnly: !corner && !top && !bottom,
        largeCuts: cuts && l,
        mediumeCuts: cuts && m,
        smallCuts: cuts && s,
        largeTopCut: topCut && l,
        mediumTopCut: topCut && m,
        smallTopCut: topCut && s,
        largeBottomCut: bottomCut && l,
        mediumBottomCut: bottomCut && m,
        smallBottomCut: bottomCut && s,
        offset,
        regular: !offset,
    })
    return <div className={classNames}>{children}</div>
}

Content.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    corner: PropTypes.bool,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    offset: PropTypes.bool,
}

export default Content
