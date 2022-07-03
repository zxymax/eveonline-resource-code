import React from 'react'
import PropTypes from 'prop-types'
import style from './FullscreenVideo.scss'

const FullscreenVideo = ({
    children,
    animate,
    transition = true,
    isVisible,
}) => (
    <div
        className={style(style.video, {
            [style.animate]: animate,
            [style.transition]: transition,
            [style.visible]: isVisible,
        })}
    >
        <div className={style.inner}>{children}</div>
    </div>
)

FullscreenVideo.propTypes = {
    children: PropTypes.node,
    animate: PropTypes.bool,
    isVisible: PropTypes.bool,
}

export default FullscreenVideo
