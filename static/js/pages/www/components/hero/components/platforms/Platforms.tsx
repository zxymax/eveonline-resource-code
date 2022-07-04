import React from 'react'
import { Translate } from 'react-localize-redux'
import { isMobile } from 'react-device-detect'
import getConfig, { isClient } from 'config/web'
import IconSteam from './IconSteam'
import IconEpic from './IconEpic'
import style from './Platforms.module.scss'

interface Props {
    template: string
}

const { platformSteam, platformEpic } = getConfig()

const Platforms = ({ template }: Props): JSX.Element => {
    const getSteamLink = (): string =>
        isMobile ? platformSteam.mobile : platformSteam.desktop

    const getEpicLink = (): string =>
        isMobile ? platformEpic.mobile : platformEpic.desktop

    return (
        <div className={style(style.platforms, style[template])}>
            <div className={style.inner}>
                <div className={style.text}>
                    <Translate id="frontpage.platformText" />
                </div>
                {isClient && (
                    <div className={style.icons}>
                        <a href={getSteamLink()} className={style.icon}>
                            <IconSteam />
                        </a>
                        <a href={getEpicLink()} className={style.icon}>
                            <IconEpic />
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Platforms

