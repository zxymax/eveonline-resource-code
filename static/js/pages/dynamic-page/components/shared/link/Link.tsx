import React from 'react'
import style from './Link.module.scss'

interface Props {
    children: React.ReactNode
    href: string
    color: string
    onClick: () => void
}

const Link = ({
    children,
    href,
    color,
    onClick = null,
}: Props): JSX.Element => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={style.link}
        style={{ color }}
        onClick={onClick}
    >
        {children}
    </a>
)

export default Link
