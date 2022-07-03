import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { TwitchEmbed } from 'react-twitch-embed'
import _isEmpty from 'lodash/isEmpty'
import { isClient } from 'config/web'
import { getLanguage } from 'selectors'
import { Icon, Button } from 'layouts'
import classNames from 'classnames'
import { fetchSection } from 'lib/pages/api'
import ReactCountDown, { zeroPad, CountdownTimeDelta } from 'react-countdown'
import { SectionViewModel } from 'models'
import Analytics from 'utils/analytics'
import style from './TwitchStream.module.scss'

export default function TwitchStream(): JSX.Element {
    const SESSIONSTREAM = 'NotShowTwitchStream'
    const [showOverlay, setShowOverlay] = useState(false)
    const [widgetData, setWidgetData] = useState<SectionViewModel>(null)
    const [slideIn, setSlideIn] = useState(false)

    const language = useSelector((state) => getLanguage(state))

    const closeOverlay = (): void => {
        sessionStorage.setItem(SESSIONSTREAM, 'true')
        setShowOverlay(false)
    }

    const cx = classNames.bind(style)

    useEffect(() => {
        setTimeout(() => {
            setSlideIn(true)
        }, 2000)
    }, [slideIn])

    useEffect(() => {
        async function GetData(): Promise<SectionViewModel> {
            const response = await fetchSection(
                '1fcaSBqOyVeSny6YSoaZBC',
                language
            )
            setWidgetData(response)
            return response
        }

        if (!widgetData) {
            if (sessionStorage.getItem(SESSIONSTREAM) === 'true') {
                setShowOverlay(false)
            } else if (isClient) {
                setShowOverlay(true)
            } else {
                setShowOverlay(false)
            }
        }

        if (isClient && window.innerWidth > 768) {
            GetData().then((result) => {
                if (sessionStorage.getItem(SESSIONSTREAM) !== 'true') {
                    if (!result) {
                        Analytics.PushEventObject({
                            event: 'streamOverlayStatus_off',
                            streamOverlayStatus: 'off',
                        })
                    } else if (+new Date(result.date) - +new Date() < 0) {
                        Analytics.PushEventObject({
                            event: 'streamOverlayStatus_on',
                            streamOverlayStatus: 'on',
                        })
                    } else {
                        Analytics.PushEventObject({
                            event: 'streamOverlayStatus_countdown',
                            streamOverlayStatus: 'countdown',
                        })
                    }
                }
            })
        }
    }, [language])

    const StreamOngoing = (): JSX.Element => {
        return (
            <>
                <div className={style.header}>
                    <h5>
                        <ReactMarkdown
                            source={widgetData.headline}
                            renderers={{
                                paragraph: ({ children }) => <>{children}</>,
                            }}
                        />
                    </h5>
                </div>
                {isClient && window.Twitch && (
                    <TwitchEmbed
                        channel={widgetData.videoId}
                        id={widgetData.videoId}
                        theme="light"
                        muted
                        width={450}
                        height={253}
                        withChat={false}
                        parent={['www.eveonline.com']}
                    />
                )}
            </>
        )
    }

    const CountDown = (timeUntil: number): JSX.Element => {
        const renderer = ({
            hours,
            minutes,
            seconds,
            completed,
        }: CountdownTimeDelta): JSX.Element => {
            if (completed) {
                // Render a completed state
                return <>{StreamOngoing()}</>
            }

            return (
                <div className={style.countdownContainer}>
                    <img
                        src="https://images.ctfassets.net/7lhcm73ukv5p/5MjMGOKbBYB0BISryLnBmb/06a83d989b7f4afbb68669ea809ef4b0/ccptv.png"
                        alt="CCP TV"
                    />
                    <p>{widgetData.teaser}</p>
                    <div className={style.numbers}>
                        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                    </div>
                    <Button
                        className={style.btn}
                        target="_blank"
                        size="small"
                        theme="pink"
                        path={widgetData.buttonUrl}
                    >
                        {widgetData.buttonText}
                    </Button>
                </div>
            )
        }

        return (
            <div>
                <ReactCountDown
                    date={Date.now() + timeUntil}
                    zeroPadTime={2}
                    renderer={renderer}
                />
            </div>
        )
    }

    const closeButton = (): JSX.Element => (
        <span
            role="button"
            tabIndex={0}
            onClick={closeOverlay}
            onKeyDown={closeOverlay}
            className={style.close}
            title={widgetData.body}
        >
            <Icon light name="times" />
        </span>
    )

    function renderContainer(streamData: SectionViewModel): JSX.Element {
        const difference = +new Date(streamData.date) - +new Date()

        if (difference > 0) {
            return CountDown(difference)
        }

        return <>{StreamOngoing()}</>
    }

    return (
        <>
            {showOverlay && !_isEmpty(widgetData) && (
                <div
                    className={cx(style.stream, {
                        [style.loaded]: slideIn,
                    })}
                >
                    {closeButton()}
                    {renderContainer(widgetData)}
                </div>
            )}
        </>
    )
}
