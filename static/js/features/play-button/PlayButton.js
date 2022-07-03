import React from 'react'
import PropTypes from 'prop-types'
import style from './PlayButton.scss'

const getSize = (size) => {
    switch (size) {
        case 'small':
            return '64'
        case 'medium':
            return '96'
        case 'large':
            return '128'
        default:
            return '128'
    }
}

const PlayButton = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={getSize(size)}
        height={getSize(size)}
        fill="none"
        viewBox="0 0 128 128"
        className={style(style.playButton, className)}
        role="button"
    >
        <path
            fill="#DF1A23"
            d="M63 .577a2 2 0 0 1 2 0l53.426 30.846c.618.357 1 1.017 1 1.732v61.69c0 .715-.382 1.375-1 1.732L65 127.423a2.001 2.001 0 0 1-2 0L9.574 96.577a2 2 0 0 1-1-1.732v-61.69a2 2 0 0 1 1-1.732L63 .577z"
            filter="url(#filter0_i)"
        />
        <path
            fill="#fff"
            d="M55.534 81.031A1 1 0 0 1 54 80.186V47.814a1 1 0 0 1 1.534-.845l25.627 16.185a1 1 0 0 1 0 1.691L55.534 81.031z"
        />
        <defs>
            <filter
                id="filter0_i"
                width="110.851"
                height="127.381"
                x="8.574"
                y=".309"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="1" />
                <feComposite
                    in2="hardAlpha"
                    k2="-1"
                    k3="1"
                    operator="arithmetic"
                />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
                <feBlend in2="shape" result="effect1_innerShadow" />
            </filter>
        </defs>
    </svg>
)

PlayButton.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}

PlayButton.defaultProps = {
    className: null,
    size: 'large',
}

export default PlayButton
