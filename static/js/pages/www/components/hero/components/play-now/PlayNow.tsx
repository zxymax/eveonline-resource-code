import React from 'react'
import { Translate } from 'react-localize-redux'
import { Button } from 'layouts'
import { IconAnywhereTypeEnum } from 'layouts/svgIcon/models/icon-type-enum'
import AnywhereIcon from 'layouts/svgIcon/anywhere'
import flags from 'config/flags'
import style from '../../Hero.module.scss'

const PlayNow = (): JSX.Element => {
    return (
        <>
            <Button
                size="large"
                theme={
                    flags.features.colorThemeEnabled ? 'quadrant' : 'primary'
                }
                className={style.btn}
                data-id="play-in-browser-frontpage"
                path={{ page: 'anywhere' }}
                internal
                showPlatform={false}
                icon
            >
                <AnywhereIcon
                    icon={IconAnywhereTypeEnum.LogoIcon}
                    color="#212121"
                    width="26"
                    height="26"
                />
                <Translate id="PlayNowOmega.PlayInBrowser" />
            </Button>
        </>
    )
}

export default PlayNow

