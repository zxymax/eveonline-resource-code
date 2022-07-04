import React from 'react'
import ContentType from 'models/types/ts/contentType'
import flags from 'config/flags'
import { Button } from 'layouts'
import PlayNow from '../play-now'
import style from '../../Hero.module.scss'

interface Props {
    content: Array<ContentType>
    canPlayInBrowser: boolean
}

const CTA = ({ content, canPlayInBrowser }: Props): JSX.Element => {
    const playFree = content && content[0]
    const playPremium = content && content[1]
    const { colorThemeEnabled } = flags.features

    return (
        <div
            className={style(style.buttons, {
                [style.colorTheme]: colorThemeEnabled,
            })}
        >
            {playFree && (
                <>
                    {canPlayInBrowser ? (
                        <PlayNow />
                    ) : (
                        <Button
                            size="large"
                            theme={colorThemeEnabled ? 'quadrant' : 'primary'}
                            className={style.btn}
                            path={playFree.buttonUrl}
                            data-id="homepage-playfree-button"
                            showPlatform
                        >
                            {playFree.buttonText}
                        </Button>
                    )}
                </>
            )}
            {playPremium && !canPlayInBrowser && (
                <Button
                    theme={colorThemeEnabled ? 'secondary' : 'secondary'}
                    size="large"
                    className={style.btn}
                    path={playPremium.buttonUrl}
                    data-id="homepage-playpaid-button"
                >
                    {playPremium.buttonText}
                </Button>
            )}
        </div>
    )
}

export default CTA

