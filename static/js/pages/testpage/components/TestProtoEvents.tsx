import React, { useEffect, useState } from 'react'
import ProtoManager from 'proto'
// import { getValues } from 'proto/helpers/journeyvalues/JourneyValuesStorage'
import { useSettings } from 'settings'
import ProtoEventModel from 'proto/models/ProtoEventModel'
import JourneyValuesManager from 'proto/helpers/journeyvalues'
import { isClient } from 'config/web'
import { PlatformEnum } from 'proto/models/downloadInfoType'
// import testHelloWorld from 'proto/prototest'
// import { Link } from 'features'
// import { setValues } from 'utils/proto/ProtoValuesStorage'

export default function TestProtoEvents(): JSX.Element {
    const [eventObject, setEventObject] = useState<ProtoEventModel>(null)
    const [storedValues, setStoredValues] = useState('Nothing stored')

    const settings = useSettings()

    useEffect(() => {
        const journeyValuesManager = new JourneyValuesManager(isClient)
        const valuesString = JSON.stringify(
            journeyValuesManager.getJourneyValues(),
            null,
            2
        )
        setStoredValues(valuesString)
    }, [])

    const userId = 123456

    async function processSignupClick(): Promise<void> {
        const returnedMessage = await ProtoManager.publishAccountCreatedEvent(
            userId,
            settings
        )
        setEventObject(returnedMessage)
    }

    async function processDownloadClick(): Promise<void> {
        const returnedMessage = await ProtoManager.publishInstallerDownloadEvent(
            '12345678',
            PlatformEnum.windows,
            'Windows 10',
            settings.urlEventGatewayBaseUrl,
            settings.eventEnabledDownload
        )
        setEventObject(returnedMessage)
    }

    return (
        <div>
            <h1>ProtoManager test page</h1>
            <p>
                You can follow links or construct your own with query parameters
                that you want to test
            </p>
            <p>
                Note TL;DR; Use Incognito: There is also landing page and
                referrer url sent with Signup event and those values are stored
                in browser session
            </p>
            <h2>Step 1:</h2>
            <p>
                follow or copy this{' '}
                <a href="?gclid=gclid_test&yclid=yclid_test&utm_source=utm_source_test&utm_medium=utm_medium_test&utm_campaign=utm_campaign_test&utm_term=utm_term_test">
                    LINK
                </a>{' '}
                and open in new browser window{' '}
            </p>
            <h2>Step 2:</h2>
            <p>Click the button to simulate after signup event.</p>
            <p>hardcoded userId: {userId}</p>
            <button onClick={() => processSignupClick()} type="button">
                CLICK TO GENEREATE SIGNUP EVENT
            </button>
            <br />
            <br />
            <button onClick={() => processDownloadClick()} type="button">
                CLICK TO GENEREATE DOWNLOAD EVENT
            </button>

            {eventObject && (
                <>
                    <h3>Event:</h3>
                    <pre
                        style={{
                            fontSize: '.85rem',
                            padding: '.25rem .5rem',
                            // overflowX: 'scroll',
                        }}
                    >
                        {JSON.stringify(eventObject.eventObject, null, 2)}
                    </pre>
                    <h3>Message in event:</h3>
                    <pre
                        style={{
                            fontSize: '.85rem',
                            padding: '.25rem .5rem',
                            // overflowX: 'scroll',
                        }}
                    >
                        {JSON.stringify(eventObject.messageObject, null, 2)}
                    </pre>
                </>
            )}
            <br />
            <h3>getJourneyValues() will return this: </h3>
            <pre
                style={{
                    fontSize: '.85rem',
                    padding: '.25rem .5rem',
                    // overflowX: 'scroll',
                }}
            >
                {storedValues}
            </pre>
        </div>
    )
}
