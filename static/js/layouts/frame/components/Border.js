import React from 'react'
import PropTypes from 'prop-types'
import styles from '../Frame.scss'

const Border = ({
    large,
    medium,
    small,
    cutTop,
    cutBottom,
    fillTop,
    fillBottom,
    className,
}) => {
    const cuts = cutTop && cutBottom
    const fills = fillTop && fillBottom
    const topCut = cutTop && !cutBottom && !fillBottom
    const bottomCut = cutBottom && !cutTop && !fillTop
    const topFill = fillTop && !cutBottom && !fillBottom
    const bottomFill = fillBottom && !cutTop && !fillTop
    const topFillbottomCut = fillTop && cutBottom
    const topCutbottomFill = cutTop && fillBottom
    const l = large && !medium && !small
    const m = medium && !large && !small
    const s = small || (!large && !medium)
    const classNames = styles('border', className, {
        corner: !cutTop && !cutBottom,
        largeCuts: cuts && l,
        mediumCuts: cuts && m,
        smallCuts: cuts && s,
        largeTopCut: topCut && l,
        mediumTopCut: topCut && m,
        smallTopCut: topCut && s,
        largeBottomCut: bottomCut && l,
        mediumBottomCut: bottomCut && m,
        smallBottomCut: bottomCut && s,
        largeFills: fills && l,
        mediumFills: fills && m,
        smallFills: fills && s,
        largeTopFill: topFill && l,
        mediumTopFill: topFill && m,
        smallTopFill: topFill && s,
        largeBottomFill: bottomFill && l,
        mediumBottomFill: bottomFill && m,
        smallBottomFill: bottomFill && s,
        largeTopFillBottomCut: topFillbottomCut && l,
        mediumTopFillBottomCut: topFillbottomCut && m,
        smallTopFillBottomCut: topFillbottomCut && s,
        largeBottomFillTopCut: topCutbottomFill && l,
        mediumBottomFillTopCut: topCutbottomFill && m,
        smallBottomFillTopCut: topCutbottomFill && s,
    })
    return <div className={classNames} />
}

Border.propTypes = {
    className: PropTypes.string,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    cutTop: PropTypes.bool,
    fillTop: PropTypes.bool,
    cutBottom: PropTypes.bool,
    fillBottom: PropTypes.bool,
}

export default Border
