import React from 'react'
import { useSelector } from 'react-redux'
import { getSubpage } from 'lib/location/selectors'

import PlayNowButton from 'features/playnow/button'
import PlayNowDisplay from 'features/playnow/display'

import { Button } from 'layouts'
import PlexBalance from 'features/plex-balance/PlexBalance'
import StepsEnum from 'features/playnow/models/steps-enum'
import {
    LocalizeContext,
    LocalizeProvider,
} from 'utils/context/localize/LocalizeContext'
import ProtoEvents from './components/TestProtoEvents'
import TestJourneyId from './components/TestJourneyId'
import TestSettings from './components/TestSettings'

import style from './TestContainer.module.scss'
import TestFeatureFlags from './components/TestFeatureFlags'
import TestDefaultProps from './components/TestDefaultProps'
import TestDownloadButtonWithJid from './components/TestDownloadButtonWithJid'
import TestPlayNowDisplay from './components/TestPlayNowDisplay'

export default function TestContainer(): JSX.Element {
    // Get subpage and display relevant components
    const subpage = useSelector((state) => getSubpage(state))

    function renderContent(): JSX.Element {
        if (subpage === 'flags') {
            return <TestFeatureFlags />
        }
        if (subpage === 'playnowbutton') {
            return <TestPlayNowDisplay />
        }
        if (subpage === 'playbutton') {
            return (
                <Button
                    size="large"
                    theme="quadrant"
                    path={{ page: 'play' }}
                    data-id="homepage-playfree-button"
                    showPlatform={false}
                    internal
                >
                    Launch EVE Online
                </Button>
            )
        }
        if (subpage === 'playpage') {
            return (
                // Add localize provider in main app
                <LocalizeProvider>
                    {/* Every consumer should know about at least one resource set it needs and should ask for that before with getResourceSet */}
                    {/* Then send in translate function to components that need it, and they know the keys they want translated */}
                    <LocalizeContext.Consumer>
                        {({ translate, getResourceSet }) => {
                            getResourceSet('EveAnywhere')
                            console.log(
                                'translate test: ',
                                translate('EveAnywhere.SessionEnded.ThankYou')
                            )
                            return (
                                <>
                                    <PlayNowDisplay
                                        step={StepsEnum.Run}
                                        isModal={false}
                                        // translate2={translate}
                                    />
                                    <PlayNowDisplay
                                        step={StepsEnum.End}
                                        isModal={false}
                                        // translate2={translate}
                                    />
                                    <PlayNowDisplay
                                        step={StepsEnum.Download}
                                        isModal={false}
                                        // translate2={translate}
                                    />
                                    <PlayNowDisplay
                                        step={StepsEnum.NoServers}
                                        isModal={false}
                                        // translate2={translate}
                                    />

                                    <PlayNowDisplay
                                        step={StepsEnum.NoSpeed}
                                        isModal={false}
                                        // translate2={translate}
                                    />
                                    <PlayNowDisplay
                                        step={StepsEnum.NoOmega}
                                        isModal={false}
                                        // translate2={translate}
                                    />
                                    <PlayNowDisplay
                                        step={StepsEnum.NoLogin}
                                        isModal={false}
                                        // translate2={translate}
                                    />
                                </>
                            )
                        }}
                    </LocalizeContext.Consumer>
                </LocalizeProvider>
            )
        }
        if (subpage === 'download') {
            return <TestDownloadButtonWithJid />
        }
        if (subpage === 'proto') {
            return <ProtoEvents />
        }
        if (subpage === 'journey') {
            return <TestJourneyId />
        }
        if (subpage === 'settings') {
            return <TestSettings />
        }
        if (subpage === 'playbuttontest') {
            return <PlayNowButton />
        }
        if (subpage === 'props') {
            return (
                <TestDefaultProps
                    requiredString="this is the required string"
                    // optionalString="this is the optional string"
                />
            )
        }
        return (
            <>
                <PlexBalance />
                <a href="/test/flags">Test Launch Darkly Feature Flags</a>
                <br />
                <br />
                <a href="/test/playnowbutton">Test Play Now Button</a>
                <br />
                <br />
                <a href="/test/props">Test Default Props</a>
                <br />
                <br />
                <a href="/test/news">Test News Home Improvements</a>
                <br />
                <br />
                <a href="/test/playbutton">Test Play in Browser button</a>
                <br />
                <a href="/test/playpage">Test Play in Browser (Display only)</a>
                <br />
                <br />
                <br />
                <a href="/test/settings">Test Settings</a>
                {/* <br />
                    <a href='/test/play'>Test Play in Browser (Execute)</a> */}
                <br /> <br /> <br />
                <a href="/test/proto">Test Proto Events</a>
                <br />
                <a href="/test/journey">Test Journey ID</a>
                <br />
                <a href="/test/download">
                    Test Download Button with Journey ID
                </a>
                <p>this is just a test something something</p>
            </>
        )
    }

    return <div className={style.container}>{renderContent()}</div>
}

