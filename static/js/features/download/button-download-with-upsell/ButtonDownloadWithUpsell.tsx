import React, { useEffect, useState } from 'react'
import { Translate } from 'react-localize-redux'
import { useDispatch } from 'react-redux'
import ButtonDownload from 'features/download/button-download'
import { fetchVersionIfNeeded } from 'features/DownloadButton/actions'
import { HeadingXSmall } from 'layouts/typography'
import PlatformHelper from 'utils/platform'
import getConfig from 'config/web'
import UpsellProduct from 'features/upsell/for-account-created'

export default function ButtonDownloadWithUpsell(): JSX.Element {
    const [hasVersions, setHasVersions] = useState(false)

    const dispatch = useDispatch()
    // Making sure we have versions in state.
    useEffect(() => {
        if (!hasVersions) {
            // Only use dispatch once, when using useSelector to later this causes an endless loop.
            dispatch(fetchVersionIfNeeded)
            setHasVersions(true)
        }
    })

    // Get platform name
    const helper = new PlatformHelper()
    const platform = helper.getOSName()

    // Get url prefix from config

    const { launcherVersionDownloadUrl } = getConfig()
    const urlPrefix = launcherVersionDownloadUrl

    return (
        <Translate>
            {({ translate }) => (
                <>
                    <ButtonDownload
                        title={translate(
                            'signup.success.accountCreated'
                        ).toString()}
                        TitleComponent={HeadingXSmall}
                        text={translate(
                            'signup.verify.success.download'
                        ).toString()}
                        platform={platform}
                        urlPrefix={urlPrefix}
                        text2=""
                    />
                    <div id="upsell_on_download">
                        <UpsellProduct />
                    </div>
                </>
            )}
        </Translate>
    )
}
