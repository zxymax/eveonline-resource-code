import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Button, Visibility } from 'layouts'
import getConfig from 'config/web'
import { Translate } from 'react-localize-redux'
import { getLanguage } from 'selectors'
import { getAfterSignupCookieValues } from 'features/playnow/PlayNowStorage'
import style from './UpsellProduct.module.scss'

const { secureUrl } = getConfig()

export default function UpsellProduct(): JSX.Element {
    const language = useSelector((state) => getLanguage(state))
    let upsellSecureUrl = `${secureUrl}?lan=${language}`

    const { user_token: userToken } = getAfterSignupCookieValues()
    if (userToken) {
        upsellSecureUrl = `${upsellSecureUrl}&token=${userToken}`
    }

    return (
        <Visibility direction="fadeUp" transitionDelay="1s">
            <Translate>
                {({ translate }) => (
                    <div className={style.upSellProduct}>
                        {/* <a
                              href={upsellSecureUrl}
                              data-id="signup-receipt-limited-time-omega-offer"
                              target="_blank"
                              rel="noopener noreferrer"
                            > */}
                        <div
                            className={classNames(
                                style.ctaContainer,
                                { [style.fr]: language === 'fr' },
                                { [style.de]: language === 'de' },
                                { [style.ru]: language === 'ru' },
                                { [style.ja]: language === 'ja' }
                            )}
                        >
                            <Visibility
                                direction="fadeLeft"
                                transitionDelay="1.5s"
                            >
                                <div className={style.cta}>
                                    <Button
                                        data-id="signup-receipt-limited-time-omega-offer"
                                        theme="omega"
                                        path={upsellSecureUrl}
                                        size="small"
                                    >
                                        {translate(
                                            'signup.upsell.buttonTextLimited'
                                        )}
                                    </Button>
                                </div>
                            </Visibility>
                        </div>
                        {/* </a> */}
                        <div className={style.benefits}>
                            <ul>
                                <li>
                                    {translate('signup.upsell.omegaBenefit1')}
                                </li>
                                <li>
                                    {translate('signup.upsell.omegaBenefit2')}
                                </li>
                                <li>
                                    {translate('signup.upsell.omegaBenefit3')}
                                </li>
                                <li>
                                    {translate('signup.upsell.omegaBenefit4')}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </Translate>
        </Visibility>
    )
}
