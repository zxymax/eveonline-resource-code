import React from 'react'
import { Translate, TranslateFunction } from 'react-localize-redux'
import flags from 'config/flags'
import Button from 'layouts/button'

interface Props {
    page: string
    className: string // Not used, but sett e.g. in Navigation component, could remove here and there and maybe elsewhere
}

const CTA = ({ page, ...rest }: Props): JSX.Element => {
    /**
     * * CTA Navigation Button
     * * Customize based on page level
     */
    const renderButtonTheme = (translate: TranslateFunction): JSX.Element => {
        const { colorThemeEnabled } = flags.features

        switch (page) {
            case 'omega':
                return (
                    <Button
                        theme={colorThemeEnabled ? 'quadrant' : 'omega'}
                        size="small"
                        path="https://www.eveonline.com/signup"
                        data-id="eveNav_omegaUpgrade"
                        {...rest}
                    >
                        {translate('navigation.createAccount')}
                    </Button>
                )
            default:
                return (
                    <Button
                        theme={colorThemeEnabled ? 'quadrant' : 'primary'}
                        size="small"
                        path="https://www.eveonline.com/signup"
                        data-id="eveNav_playFree"
                        {...rest}
                    >
                        {translate('navigation.playForFree')}
                    </Button>
                )
        }
    }

    return (
        <Translate>{({ translate }) => renderButtonTheme(translate)}</Translate>
    )
}

export default CTA
