import React from 'react'
import values from 'config/values'
import LanguageType from 'models/language-type'
import { Content } from 'layouts'
import {
    Footer,
    SEO,
    CookieConsent,
    IEWarning,
    Personalization,
} from 'features'
import TwitchStream from 'features/twitch-stream'
import Navigation from 'features/navigation'
import ErrorBoundary from 'features/error-boundary'

/* eslint-disable react/jsx-props-no-spreading */

interface Props {
    page: React.ReactNode
    lang: LanguageType
    darkNavigation: boolean
    hideMenuBorder: boolean
    showLogin: boolean
    hideCTA: boolean
    showTwitch: boolean
}

const DefaultPageLayout = ({
    page,
    lang,
    darkNavigation,
    hideMenuBorder,
    hideCTA,
    showTwitch,
}: Props): JSX.Element => {
    return (
        <div className={lang}>
            {showTwitch && <TwitchStream />}
            <Personalization />
            <IEWarning />
            <SEO {...values.seo} hideSitename />
            <CookieConsent lang={lang} />
            <Navigation
                lightTheme={darkNavigation}
                hideBorder={hideMenuBorder}
                hideCTA={hideCTA}
            />
            <Content>
                <ErrorBoundary>{page}</ErrorBoundary>
                <Footer />
            </Content>
        </div>
    )
}

export default DefaultPageLayout
