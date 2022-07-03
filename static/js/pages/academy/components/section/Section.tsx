import React from 'react'
import style from './Section.module.scss'

type Props = {
    children: React.ReactNode
    large?: boolean
}

const defaultProps = {
    large: false,
}

const Section = ({ children, large }: Props): JSX.Element => (
    <section className={style(style.section, { [style.large]: large })}>
        {children}
    </section>
)

Section.defaultProps = defaultProps

export default Section
