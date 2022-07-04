import React from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'

export default function TestFeatureFlagsConsumer(): JSX.Element {
    const { webTestFlag } = useFlags()

    console.log('test flag: ', webTestFlag)

    if (webTestFlag) {
        return <p>The feature is ON ✔️</p>
    }

    return <p>The feature is OFF 🛑</p>
}
