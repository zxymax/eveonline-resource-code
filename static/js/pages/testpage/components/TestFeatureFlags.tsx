import React from 'react'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

import TestFeatureFlagsConsumer from './TestFeatureFlagsConsumer'

function TestFeatureFlags(): JSX.Element {
    return (
        <>
            <h1>Feature Flags Testing</h1>
            <TestFeatureFlagsConsumer />
        </>
    )
}

export default withLDProvider({
    clientSideID: '609a63e3a894c10c57b26ad9',
    user: {
        key: 'aa0ceb',
        name: 'Ingvi Rafn',
        email: 'ingvih@ccpgames.com',
    },
    options: {
        /* ... */
    },
})(TestFeatureFlags)
