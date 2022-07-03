import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { isClient } from 'config/web'
import style from './ScrollIndicator.module.scss'

interface Props {
    id: string
}

const ScrollIndicator = ({ id }: Props): JSX.Element => {
    const [scroll, setScroll] = useState(false)

    const handleScroll = (): void => {
        const scrollPos = window.scrollY

        if (scrollPos > 0) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        if (isClient) {
            window.addEventListener('scroll', handleScroll)

            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [scroll])

    return (
        <Link
            className={style(style.scroll, { [style.hidden]: scroll })}
            to={id || 'content'}
            duration={1200}
            smooth="easeOutQuad"
        >
            <div className={style.arrow} />
            <div className={style.arrow} />
        </Link>
    )
}

export default ScrollIndicator
