import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Button, Visibility } from 'layouts'
import getConfig from 'config/web'
import { Translate } from 'react-localize-redux'
import { getLanguage } from 'selectors'
import DownloadButton from 'features/DownloadButton'
import { getAfterSignupCookieValues } from 'features/playnow/PlayNowStorage'
import ReactMarkdown from 'react-markdown/with-html'
import style from './UpsellProduct.module.scss'

const { secureUrl } = getConfig()

export default function UpsellProduct(): JSX.Element {
    const language = useSelector((state) => getLanguage(state))
    let upsellSecureUrl = `${secureUrl}/omega?lan=${language}`

    const { user_token: userToken } = getAfterSignupCookieValues()
    if (userToken) {
        upsellSecureUrl = `${upsellSecureUrl}&token=${userToken}`
    }

    return (
        <Visibility direction="fadeUp" transitionDelay="1s">
            <Translate>
                {({ translate }) => (
                    <div className={style.upSellProduct}>
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
                                        data-id="play-now-omega-upsell"
                                        theme="omega"
                                        path={upsellSecureUrl}
                                        size="small"
                                    >
                                        {translate(
                                            'signup.upsell.getAheadWithOmega'
                                        )}
                                    </Button>
                                </div>
                            </Visibility>
                        </div>
                        {/* </a> */}
                        <div className={style.benefits}>
                            <p className={style.heading}>
                                {translate('signup.upsell.whatIsInItForYou')}
                            </p>
                            <ul>
                                <li>
                                    <ReactMarkdown
                                        source={translate(
                                            'signup.upsell.omegaBenefitPlayInBrowser'
                                        ).toString()}
                                        escapeHtml={false}
                                        renderers={{
                                            // This is to remove the <p> that surrounds the item and it breaks layout
                                            paragraph: ({ children }) =>
                                                children,
                                        }}
                                    />
                                </li>
                                <li>
                                    {translate('signup.upsell.omegaBenefit1')}
                                </li>
                                <li>
                                    {translate('signup.upsell.omegaBenefit2')}
                                </li>
                                <li>
                                    {translate('signup.upsell.omegaBenefit3')}
                                </li>
                            </ul>
                            <p className={style.orDownload}>
                                {translate('signup.upsell.orDownloadTheGame')}
                            </p>
                            <DownloadButton hideSecondaryPlatform />
                        </div>
                    </div>
                )}
            </Translate>
        </Visibility>
    )
}
