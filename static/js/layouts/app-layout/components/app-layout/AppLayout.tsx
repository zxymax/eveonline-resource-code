import React, { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import { isClient } from 'config/web'
import style from './AppLayout.module.scss'

interface Props {
    children: ReactNode
    lang: string
}

const AppLayout = ({ children, lang }: Props): JSX.Element => {
    const [loaded, setLoaded] = useState(false)

    // Get JA font when selected
    useEffect(() => {
        if (isClient && lang === 'ja' && !loaded) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href =
                'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=swap'
            link.addEventListener('load', () => setLoaded(true))
            document.getElementsByTagName('head')[0].appendChild(link)
        }
    }, [lang, loaded])

    const theClass = classNames(style.layout, { [style.japan]: lang === 'ja' })

    return <div className={theClass}>{children}</div>
}

export default AppLayout

