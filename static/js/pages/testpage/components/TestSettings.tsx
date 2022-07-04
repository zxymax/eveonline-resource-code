import React from 'react'
// import getSettings from 'settings'
import { useSettings } from 'settings'

export default function TestSettings(): JSX.Element {
    const settings = useSettings()

    // useEffect(() => {

    //         ;(async () => {
    //         setSettings(await getSettings())
    //   })()

    // console.log('test settings loaded')
    //
    // }, [])

    return (
        <>
            <h1>Test Settings</h1>
            {settings && (
                <>
                    <h1>SETTINGS FOUND</h1>
                    <div>
                        eventEnabledSignup:{' '}
                        {settings.eventEnabledSignup ? (
                            <h1>SHOW</h1>
                        ) : (
                            <h1>NOT SHOW</h1>
                        )}
                    </div>
                    <p>url: {settings.urlEventGatewayBaseUrl}</p>

                    <div>
                        eventEnabledSomeEvent:{' '}
                        {settings.eventEnabledSomeEvent ? (
                            <h1>SHOW</h1>
                        ) : (
                            <h1>NOT SHOW</h1>
                        )}
                    </div>
                    {/* {settings.testBoolSetting ? (
                    <h1>SHOW</h1>
                ) : (
                    <h1>NOT SHOW</h1>
                )}
                <h1>
                    test string 1:{' '}
                    {settings.testStringSetting}
                </h1>
                {settings.enablePersonalizedVideoPage ? (
                    <h1>SHOW Personalized</h1>
                ) : (
                    <h1>NOT SHOW Personalized</h1>
                )}
                {settings.enableTestPage ? (
                    <h1>SHOW Test page</h1>
                ) : (
                    <h1>NOT SHOW Test page</h1>
                )} */}
                </>
            )}
        </>
    )
}
