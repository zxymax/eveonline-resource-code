import React from 'react'
import cx from 'classnames'
import s from './Wrapper.module.scss'

interface Props {
    children: React.ReactNode
    className?: string
}

const Wrapper = ({ children, className }: Props): JSX.Element => (
    <div className={cx(s.wrapper, className)}>{children}</div>
)

Wrapper.defaultProps = {
    className: '',
}

export default Wrapper
