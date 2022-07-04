import React from 'react'
import DownloadButton from 'features/DownloadButton'
import JourneyIdManager from 'proto/helpers/journeyid'

import style from './TestStyles.module.scss'

export default function TestDownloadButtonWithJid(): JSX.Element {
    const jidManager = new JourneyIdManager()
    const jid = `-${jidManager.getJourneyId()}`

    const linkToLauncher = '/EveLauncher-1902445.exe'
    const linkWithJidQueryParameter = `${linkToLauncher}?jid=${jid}`

    return (
        <>
            <h1>Launcher download tests</h1>
            <DownloadButton />
            <br />
            <br />
            <br />
            <br />
            <div>
                <h2>Direct download links</h2>
            </div>
            <br />
            <br />
            <div className={style.container}>
                <div className={style.container_button}>
                    <a href={linkToLauncher} download type="button">
                        Download
                    </a>
                </div>
            </div>
            <div>direct download - from this domain - NO query parameter</div>
            <br />
            <br />
            <br />
            <br />
            <div className={style.container}>
                <div className={style.container_button}>
                    <a
                        href={`https://dev.ccpeveweb.com${linkToLauncher}`}
                        download
                        type="button"
                    >
                        Download
                    </a>
                </div>
            </div>
            <div>
                direct download - from dev.ccpeveweb.com - NO query parameter
            </div>
            <br />
            <br />
            <br />
            <div>
                <h2>Direct download links with query parameter</h2>
            </div>
            <br />
            <br />
            <div className={style.container}>
                <div className={style.container_button}>
                    <a href={linkWithJidQueryParameter} download type="button">
                        Download
                    </a>
                </div>
            </div>
            <div>direct download - from this domain - WITH query parameter</div>
            <br />
            <br />
            <br />
            <br />
            <div className={style.container}>
                <div className={style.container_button}>
                    <a
                        href={`https://dev.ccpeveweb.com${linkWithJidQueryParameter}`}
                        download
                        type="button"
                    >
                        Download
                    </a>
                </div>
            </div>
        </>
    )
}
