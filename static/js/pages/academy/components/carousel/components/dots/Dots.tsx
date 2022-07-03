import React from 'react'
import style from './Dots.module.scss'

interface Props {
    children: React.ReactNode
    className?: string
}

const Dots = ({ children, className }: Props): JSX.Element => (
    <div className={style(style.dots, className)}>{children}</div>
)

Dots.defaultProps = {
    className: '',
}

export default Dots
