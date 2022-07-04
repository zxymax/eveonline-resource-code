import React from 'react'

import JourneyIdManager from 'proto/helpers/journeyid'
import { isClient } from 'config/web'

const storage: Storage = isClient && sessionStorage

const jidManager = new JourneyIdManager(storage)

export default function TestJourneyId(): JSX.Element {
    return (
        <>
            <h1>journey id</h1>
            <p>{jidManager.getJourneyId()}</p>
            <h1>again and should be same</h1>
            <p>{jidManager.getJourneyId()}</p>
        </>
    )
}
