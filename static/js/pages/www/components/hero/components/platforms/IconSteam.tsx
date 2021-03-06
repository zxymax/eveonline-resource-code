import React from 'react'
import s from './Platforms.module.scss'

const IconSteam = (): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Steam"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
    >
        <ellipse cx="11.79" cy="12.117" fill="#000" rx="11.79" ry="12.117" />
        <path
            className={s.color}
            fill="silver"
            d="M11.98 0C5.664 0 .491 4.921 0 11.176l6.442 2.692a3.358 3.358 0 0 1 2.105-.593l2.866-4.197v-.06c0-2.526 2.033-4.582 4.532-4.582 2.5 0 4.534 2.056 4.534 4.583 0 2.526-2.034 4.582-4.534 4.582-.034 0-.068 0-.103-.002l-4.086 2.947c.002.054.004.109.004.163 0 1.897-1.526 3.44-3.402 3.44-1.647 0-3.024-1.189-3.336-2.762L.414 15.46c1.427 5.1 6.063 8.839 11.566 8.839C18.618 24.3 24 18.86 24 12.15S18.618 0 11.98 0Z"
        />
        <path
            fill="#fff"
            d="M7.552 18.363 6 17.753c.275.545.75 1 1.383 1.251 1.365.54 2.94-.075 3.51-1.374a2.418 2.418 0 0 0 .003-1.952 2.603 2.603 0 0 0-1.45-1.383 2.804 2.804 0 0 0-1.977-.029l1.603.63c1.008.4 1.484 1.499 1.064 2.456-.42.957-1.577 1.41-2.584 1.011ZM13.689 8.995c0-1.245 1.06-2.253 2.366-2.253 1.308 0 2.367 1.008 2.367 2.253s-1.06 2.254-2.367 2.254-2.366-1.01-2.366-2.254ZM19.2 9c0-1.654-1.413-3-3.15-3-1.737 0-3.15 1.346-3.15 3s1.413 3 3.15 3c1.737 0 3.15-1.346 3.15-3Z"
        />
    </svg>
)

export default IconSteam

