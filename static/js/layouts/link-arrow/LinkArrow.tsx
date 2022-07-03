import React from 'react'
import style from './LinkArrow.module.scss'

interface Props {
    className?: string
    color?: string
}

const Arrow = ({ className, color = '#30b2e6' }: Props): JSX.Element => {
    return (
        <span className={style(style.arrow, className)}>
            <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-name="arrow-right"
            >
                <path
                    d="M19.7276 6.22402L13.776 0.272345C13.4128 -0.0907816 12.8239 -0.0907816 12.4608 0.272345C12.0976 0.635546 12.0976 1.22431 12.4608 1.58752L16.8249 5.95165H0.929949C0.416394 5.95165 0 6.36805 0 6.8816C0 7.39508 0.416394 7.81155 0.929949 7.81155H16.8249L12.4609 12.1757C12.0977 12.5389 12.0977 13.1277 12.4609 13.4909C12.6425 13.6723 12.8805 13.7632 13.1185 13.7632C13.3565 13.7632 13.5945 13.6723 13.7761 13.4909L19.7276 7.53919C20.0908 7.17599 20.0908 6.58722 19.7276 6.22402Z"
                    fill={color}
                />
            </svg>
        </span>
    )
}

Arrow.defaultProps = {
    className: '',
    color: '#30b2e6',
}

export default Arrow
