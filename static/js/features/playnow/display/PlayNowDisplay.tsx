import React from 'react'
import { SyncLoader } from 'react-spinners'
import { Button } from 'layouts'
import { HeadingSmall, ParagraphLarge } from 'layouts/typography'
import { isClient } from 'config/web'
import { Translate } from 'react-localize-redux'
import UpsellProductAfterAnywhere from 'features/upsell/for-stream-ended'
import ButtonDownloadWithUpsell from 'features/download/button-download-with-upsell'
import CountDown from './CountDown'
import LoadingText from './LoadingText'
import PlayNowContainer from '../container'
import style from './PlayNowDisplay.module.scss'
import StepsEnum from '../models/steps-enum'

interface Props {
    step: StepsEnum
    isModal: boolean
}

export default function PlayNowDisplay({ step, isModal }: Props): JSX.Element {
    // const onClickHandler = () => {
    //     // console.log('running in display')
    //     // runPlayNow()
    // }

    function renderLoading(title: string, sub: string): JSX.Element {
        // console.log('render loading!!')
        return (
            <Translate>
                {({ translate }) => (
                    <>
                        {/* <p>trans: {translate(title)}</p>
                        <p>trans: {translate(sub)}</p> */}
                        <HeadingSmall>{translate(title)}</HeadingSmall>
                        <ParagraphLarge>{translate(sub)}</ParagraphLarge>
                        <div className={style.loadingWrapper}>
                            <SyncLoader
                                size={25}
                                margin={5}
                                color="#FAB400"
                                //   loading
                            />
                        </div>
                        <LoadingText />
                    </>
                )}
            </Translate>
        )
    }

    // function renderPlayNow() {
    //     return (
    //         <>
    //             <h2>PLAY EVE ONLINE IN BROWSER</h2>
    //             {/* <Button
    //               size='large'
    //               theme={'quadrant'}
    //               onClick={() => onClickHandler()}
    //               data-id='homepage-playnow-button'
    //               showPlatform={false}
    //               internal
    //             >
    //                 Play NOW
    //             </Button><br/> */}
    //             <button onClick={() => onClickHandler()}>Play NOW</button>
    //         </>
    //     )
    // }

    const refreshPage = (): void => {
        if (isClient) window.location.reload()
    }

    function renderContent(
        message: string,
        sub: string | undefined,
        buttonText: string,
        path: string,
        dataId: string
    ): JSX.Element {
        return (
            <>
                <Translate>
                    {({ translate }) => (
                        <>
                            <HeadingSmall>{translate(message)}</HeadingSmall>
                            <ParagraphLarge>
                                {sub ? translate(sub) : ''}
                            </ParagraphLarge>
                            <Button
                                size="large"
                                theme="quadrant"
                                path={translate(path).toString()}
                                data-id={dataId}
                                showPlatform={false}
                            >
                                {translate(buttonText)}
                            </Button>
                        </>
                    )}
                </Translate>
            </>
        )
    }

    function renderNoServers(): JSX.Element {
        return renderContent(
            'PlayNowOmega.NoServers.Msg',
            'PlayNowOmega.NoServers.Sub',
            'PlayNowOmega.NoServers.ButtonText',
            'PlayNowOmega.StartUrl',
            '' // DATA_ID_NEEDED
        )
    }

    function renderNoSpeed(): JSX.Element {
        return (
            <Translate>
                {({ translate }) => (
                    <>
                        <HeadingSmall>
                            {translate('PlayNowOmega.NoSpeed.Msg')}
                        </HeadingSmall>
                        <ParagraphLarge>
                            {translate('PlayNowOmega.NoSpeed.Sub')}
                        </ParagraphLarge>
                        <div className={style.buttonWrapper}>
                            <Button
                                size="large"
                                theme="quadrant"
                                onClick={() => refreshPage()}
                                // path={translate(path).toString()}
                                data-id="PlayNowOmega.NoSpeedReload"
                                showPlatform={false}
                            >
                                try again
                            </Button>
                            <span>or</span>
                            <Button
                                size="large"
                                theme="secondary"
                                path={translate(
                                    'PlayNowOmega.StartUrl'
                                ).toString()}
                                data-id="PlayNowOmega.NoSpeedStartClient"
                                showPlatform={false}
                            >
                                {translate('PlayNowOmega.NoSpeed.ButtonText')}
                            </Button>
                        </div>
                    </>
                )}
            </Translate>
        )
        // return renderContent(
        //     'PlayNowOmega.NoSpeed.Msg',
        //     'PlayNowOmega.NoSpeed.Sub',
        //     // 'Download the game to your PC/MAC to start playing.',
        //     'PlayNowOmega.NoSpeed.ButtonText',
        //     'PlayNowOmega.StartUrl',
        //     '' // DATA_ID_NEEDED
        // )
    }

    function renderNoOmega(): JSX.Element {
        return renderContent(
            'PlayNowOmega.NoOmega.Msg',
            'PlayNowOmega.NoOmega.Sub',
            'PlayNowOmega.NoOmega.ButtonText',
            'PlayNowOmega.NoOmega.Path',
            '' // DATA_ID_NEEDED
        )
    }

    // const loginPath = ({ page: 'login', query: { path: `/`, }}).toString()

    function renderNoLogin(): JSX.Element {
        return renderContent(
            'PlayNowOmega.NoLogin.Msg',
            'PlayNowOmega.NoLogin.Sub',
            'PlayNowOmega.NoLogin.ButtonText',
            'PlayNowOmega.LoginUrl',
            '' // DATA_ID_NEEDED
        )
    }

    function renderUnexpectedError(): JSX.Element {
        return renderContent(
            'PlayNowOmega.Error.Msg',
            undefined,
            'PlayNowOmega.Error.ButtonText',
            'PlayNowOmega.LaunchUrl',
            '' // DATA_ID_NEEDED
        )
    }

    function renderDefault(): JSX.Element {
        return renderContent(
            'PlayNowOmega.Default.Msg',
            undefined,
            'PlayNowOmega.Default.ButtonText',
            'PlayNowOmega.LaunchUrl',
            '' // DATA_ID_NEEDED
        )
    }

    // TODO Add loc here
    function renderSessionEnded(): JSX.Element {
        return (
            <>
                <HeadingSmall>
                    <Translate id="PlayNowOmega.SessionEnded.ThankYou" />
                </HeadingSmall>
                <div className={style.info}>
                    <ParagraphLarge>
                        <Translate id="PlayNowOmega.SessionEnded.ProgressSaved" />
                    </ParagraphLarge>
                </div>
                <UpsellProductAfterAnywhere />
            </>
        )
    }

    function renderDownload(): JSX.Element {
        return <ButtonDownloadWithUpsell />
    }

    function renderLaunching(): JSX.Element {
        return (
            <>
                <HeadingSmall>
                    <Translate id="PlayNowOmega.CheckComplete" />
                </HeadingSmall>
                <ParagraphLarge>
                    <Translate id="PlayNowOmega.UndockingIn" />
                </ParagraphLarge>
                <CountDown />
            </>
        )
    }

    function renderStep(): JSX.Element {
        switch (step) {
            case StepsEnum.Start:
                return renderLoading(
                    'PlayNowOmega.GettingThingsReady',
                    'PlayNowOmega.HoldOn'
                )
            case StepsEnum.Running:
                return renderLoading('PlayNowOmega.HoldOn', '...')
            case StepsEnum.Run:
                return renderLoading(
                    'PlayNowOmega.CheckingConnectionQuality',
                    'PlayNowOmega.FewSeconds'
                )
            case StepsEnum.NoServers:
                return renderNoServers()
            case StepsEnum.NoSpeed:
                return renderNoSpeed()
            case StepsEnum.NoOmega:
                return renderNoOmega()
            case StepsEnum.NoLogin:
                return renderNoLogin()
            case StepsEnum.NoUrl:
                return renderUnexpectedError()
            case StepsEnum.Download:
                return renderDownload()
            case StepsEnum.End:
                return renderSessionEnded()
            case StepsEnum.Error:
                return renderUnexpectedError()
            case StepsEnum.Launching:
                return renderLaunching()
            case StepsEnum.Done:
                return renderDefault()
            default:
                return renderLoading('Hold on', 'Loading')
        }
    }

    return (
        <>
            {isModal ? (
                <div className={style.modalContainer}>{renderStep()}</div>
            ) : (
                <PlayNowContainer>{renderStep()}</PlayNowContainer>
            )}
        </>
    )
}
