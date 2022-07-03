import React, { useState, useEffect } from 'react'
import getSettings from 'settings'
import DownloadButton, { Props } from './DownloadButton'

export default function DownloadButtonNew(props: Props): JSX.Element {
    // Set default here, which will be changed when settings are loaded
    const defaultInstallerDownloadUrl =
        'https://binaries.eveonline.com/EveLauncher-'

    const [installerDownloadUrl, setInstallerDownloadUrl] = useState<string>(
        defaultInstallerDownloadUrl
    )

    const [downloadEventEnabled, setDownloadEventEnabled] = useState<boolean>(
        false
    )

    const [eventGatewayUrl, setEventGatewayUrl] = useState<string>(null)

    // Doing new things here, then loading old DownloadButton also with newer props
    useEffect(() => {
        // Get settings, either default or external from settings-page
        // Until that returns or if it fails then the default value above is set
        getSettings().then((s) => {
            const downloadUrl = s.urlInstallerDownloadUrl
            const enabled = s.eventEnabledDownload
            const gatewayUrl = s.urlEventGatewayBaseUrl

            setInstallerDownloadUrl(downloadUrl)
            setDownloadEventEnabled(enabled)
            setEventGatewayUrl(gatewayUrl)
        })
    }, [])

    return (
        <DownloadButton
            installerDownloadUrl={installerDownloadUrl}
            downloadEventEnabled={downloadEventEnabled}
            eventGatewayUrl={eventGatewayUrl}
            {...props}
        />
    )
}
