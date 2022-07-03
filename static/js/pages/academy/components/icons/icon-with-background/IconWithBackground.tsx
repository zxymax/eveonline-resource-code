import React from 'react'

import style from './IconWithBackground.module.scss'

interface Props {
    children: JSX.Element
    className?: string
    tooltip?: string
}

export default function IconWithBackground({
    children,
    className,
    tooltip = '',
}: Props): JSX.Element {
    return (
        <span
            data-tip={tooltip}
            data-padding="10px 15px"
            className={style(style.background, className)}
        >
            {children}
        </span>
    )
}

IconWithBackground.defaultProps = {
    className: '',
    tooltip: '',
}
