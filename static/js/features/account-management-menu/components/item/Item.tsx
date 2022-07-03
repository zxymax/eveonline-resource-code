import React from 'react'
import { Translate } from 'react-localize-redux'
import { Link } from 'features'
// import s from '../../AccountManagementMenu.module.scss'
import s from './Item.module.scss'

interface Props {
    url: string
    external?: boolean
    lang: string
}

interface ItemProps extends Props {
    text: string
    icon: React.ReactNode
}

interface LinkProps extends Props {
    children: React.ReactNode
}

// Conditional link wrapper helper
const RenderLink = ({
    external,
    url,
    lang,
    children,
}: LinkProps): JSX.Element => {
    const accountUrlParam = lang === 'en' ? url : `${url}?lan=${lang}`

    return external ? (
        <a href={accountUrlParam} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    ) : (
        <Link path={{ page: url }}>{children}</Link>
    )
}

const Item = ({ text, url, external, icon, lang }: ItemProps): JSX.Element => {
    return (
        <li className={s.item}>
            <RenderLink external={external} url={url} lang={lang}>
                {icon && <div className={s.icon}>{icon}</div>}
                <Translate id={text} />
            </RenderLink>
        </li>
    )
}

RenderLink.defaultProps = {
    external: false,
}

Item.defaultProps = {
    external: false,
}

export default Item
