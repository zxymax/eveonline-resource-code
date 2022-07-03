import React from 'react'
import LanguageType from 'models/language-type'
import { InfoBoxModel } from './InfoBoxModel'
import InfoBoxShips from './InfoBoxShips'
import InfoBoxActivity from './InfoBoxActivity'

import style from './InfoBox.module.scss'

export enum InfoBoxTypeEnum {
    ShipInfo,
    ActivityInfo,
}

interface InfoProps {
    type: InfoBoxTypeEnum
    info: InfoBoxModel
    language: LanguageType
    page?: string
}

// TODO add loc for strings inside here in json file to be sent to LOC or it is ready already

export default function InfoBox({
    type,
    info,
    language,
    page,
}: InfoProps): JSX.Element {
    if (!info) return <></>

    switch (type) {
        case InfoBoxTypeEnum.ShipInfo:
            return (
                <div className={style.infoBox}>
                    <InfoBoxShips info={info} language={language} />
                </div>
            )
        case InfoBoxTypeEnum.ActivityInfo:
            return (
                <div className={style.infoBox}>
                    <InfoBoxActivity
                        info={info}
                        language={language}
                        page={page}
                    />
                </div>
            )
        default:
            return <></>
    }
}

InfoBox.defaultProps = {
    page: undefined,
}
