import React from 'react'
import { HeadingSmall } from 'layouts/typography'
import { Translate } from 'react-localize-redux'
import FrameContainer from '../container'
// import style from './AlertBanner.module.scss'

const NotAllowedCountry = (): JSX.Element => {
    return (
        <Translate>
            {({ translate }) => (
                <FrameContainer>
                    <HeadingSmall>
                        {translate('anywhere.wrongCountryTitle')}
                    </HeadingSmall>
                    <p>{translate('anywhere.wrongCountryDescription')}</p>
                </FrameContainer>
            )}
        </Translate>
    )
}

export default NotAllowedCountry
