import React from 'react'
import { Button } from 'layouts'
import { useSelector } from 'react-redux'
import { GlobalState } from 'types'
import pushPlayNowEvent from 'features/playnow/PlayNowDatalayerEvents'
import DataLayerEventsEnum from 'features/playnow/models/datalayer-events-enum'
import { Translate } from 'react-localize-redux'
import { ParagraphLarge } from 'layouts/typography'
import { IconAnywhereTypeEnum } from 'layouts/svgIcon/models/icon-type-enum'
import AnywhereIcon from 'layouts/svgIcon/anywhere'
import s from './LoginPanel.module.scss'
import { BrowserLogos } from '../svg/browserLogos'
import FrameContainer from '../container/FrameContainer'

const LoginPanel = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)
    return (
        <Translate>
            {({ translate }) => (
                <FrameContainer logo>
                    <div className={s.loginPanel}>
                        {/* <HeadingRegular>
                            {translate('anywhere.notLoggedInTitle')}
                        </HeadingRegular> */}
                        <ParagraphLarge fontSize={[22, 26]}>
                            {translate('anywhere.notLoggedInDescription')}
                        </ParagraphLarge>
                        <Button
                            onClick={() =>
                                pushPlayNowEvent(
                                    DataLayerEventsEnum.StartPageLoginBtnClick
                                )
                            }
                            size="large"
                            path={{
                                page: 'login',
                                query: {
                                    path: `/${language}/anywhere`,
                                },
                            }}
                            data-id="anywhere-login-button"
                            showPlatform={false}
                            icon
                            internal
                        >
                            <AnywhereIcon
                                icon={IconAnywhereTypeEnum.LogoIcon}
                                color="#212121"
                            />
                            {translate('anywhere.notLoggedInButtonText')}
                        </Button>
                        <div className={s.logos}>
                            <BrowserLogos />
                        </div>
                    </div>
                </FrameContainer>
            )}
        </Translate>
    )
}
export default LoginPanel
