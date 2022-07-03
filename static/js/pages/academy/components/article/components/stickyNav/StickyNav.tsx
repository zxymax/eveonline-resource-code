import React from 'react'
import { Translate } from 'react-localize-redux'
import { Link } from 'react-scroll'
import style from './StickyNav.module.scss'

interface Props {
    anchors: Array<string>
}

const StickyNav = ({ anchors }: Props): JSX.Element => {
    return (
        <div className={style.stickyNav}>
            <span>
                <Translate id="academy.sticySections" />
            </span>
            <div className={style.line} />
            {anchors.map((item) => (
                <Link
                    key={item}
                    href={item}
                    offset={-70}
                    to={item}
                    smooth
                    spy
                    activeClass={style.active}
                >
                    {item}
                </Link>
            ))}
        </div>
    )
}

export default StickyNav
