import React from 'react'
import { Link } from 'features'
import isExternal from 'utils/link-helper'
import getInternalLinkPath from 'lib/link'
import style from './LinkArrow.module.scss'

interface Props {
    children: React.ReactNode
    path: string
    reverse?: boolean
    className?: string
}

const Arrow = ({
    children,
    reverse,
}: {
    children: React.ReactNode
    reverse: boolean
}): JSX.Element => (
    <div className={style(style.inner, { [style.reverse]: reverse })}>
        <div
            className={style(style.arrow, style.left, {
                [style.reverse]: reverse,
            })}
        >
            <div className={style.shaft} />
        </div>
        <div className={style.main}>
            <span className={style.text}>{children}</span>
            <div className={style(style.arrow, style.right)}>
                <div className={style.shaft} />
            </div>
        </div>
    </div>
)

const LinkArrow = ({
    children,
    path,
    reverse = false,
    className,
}: Props): JSX.Element => {
    const isArrowReversed = reverse
    if (isExternal(path)) {
        return (
            <a
                className={style(style.link, className)}
                target="_blank"
                rel="noopener noreferrer"
                href={path}
            >
                <Arrow reverse={isArrowReversed}>{children}</Arrow>
            </a>
        )
    }

    return (
        <Link
            path={getInternalLinkPath(path)}
            className={style(style.link, className)}
        >
            <Arrow reverse={isArrowReversed}>{children}</Arrow>
        </Link>
    )
}

LinkArrow.defaultProps = {
    reverse: false,
    className: '',
}

export default LinkArrow

