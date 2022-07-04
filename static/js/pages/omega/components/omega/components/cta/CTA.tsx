import React from 'react'
import { flags } from 'config'
import { Button } from 'layouts'
import ContentType from 'models/types/ts/contentType'
import style from '../../Omega.module.scss'

interface Props {
    content: {
        items: ContentType
    }
}

const CTA = ({ content }: Props): JSX.Element => {
    const CTA1 = content && content.items[0] as ContentType
    const CTA2 = content && content.items[1] as ContentType

    return (
        <div className={style.upgrade}>
            {CTA1 && (
                <Button
                    size="large"
                    className={style.btn}
                    path={CTA1.buttonUrl}
                    theme={
                        flags.features.colorThemeEnabled ? 'quadrant' : 'omega'
                    }
                    data-id="omegaCreateAccountBtn"
                >
                    {CTA1.buttonText}
                </Button>
            )}
            {CTA2 && (
                <Button
                    size="large"
                    className={style.btn}
                    path={CTA2.buttonUrl}
                    theme="secondary"
                    data-id="omegaUpgradeBtn"
                >
                    {CTA2.buttonText}
                </Button>
            )}
        </div>
    )
}

export default CTA

