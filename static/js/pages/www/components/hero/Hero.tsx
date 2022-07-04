import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { isLoggedIn } from 'packages/authentication/lib/selectors'
import { Container, BackgroundVideo } from 'layouts'
// import { ScrollIndicator } from 'features'
import { getQuery } from 'lib/location/selectors'
import { Link } from 'features'
import getInternalLinkPath from 'lib/link'
import SectionType from 'models/types/ts/sectionType'
import { HeadingMedium, TaglineLarge, headingShadow } from 'layouts/typography'
import { UserContext } from 'utils/context/UserContext'
import { SettingsContext } from 'settings'
import allowedToPlay from 'features/playnow/helpers/allowed'
import BackgroundImage from 'features/background-image'
import AnimatedText from 'layouts/animated-text'
import { isClient, isDevelopment, isLocal } from 'config/web'
import CTA from './components/cta'
import CountDown from './components/countdown'
import Platforms from './components/platforms'
import Quotes from '../quotes'
import style from './Hero.module.scss'

/* eslint-disable react/jsx-props-no-spreading */

interface Props {
    section: SectionType
    quotes: SectionType
}

const Hero = ({ section, quotes }: Props): JSX.Element => {
    const loggedIn = useSelector((state) => isLoggedIn(state))
    const query = useSelector((state) => getQuery(state))

    // This controls if component should start rendering buttons
    // Below is check for if this value is null and then nothing happens.
    // Then we always set it to either true or false, with calling function or false if it is disabled or true with overwrite
    const [canPlayInBrowser, setCanPlayInBrowser] = useState(null)

    const { country } = useContext(UserContext)

    if (isDevelopment || isLocal)
        console.log('country (only logged inDevelopment): ', country)

    const settings = useContext(SettingsContext)

    useEffect(() => {
        // Get the logic here if allowed to play in browser or not
        // Only call allowedToPlay and set the state value on client, should be NULL until then
        if (isClient && country !== null) {
            // If on client then we can call function and set the state
            // to either true or false and the buttons will be rendered
            if (loggedIn && settings.featureEnabledPlayInBrowserButton) {
                setCanPlayInBrowser(allowedToPlay(country))
            } else {
                setCanPlayInBrowser(false)
            }
        }

        // Alway overwrite
        if (query?.crypticParam === 'icanplayeveinBrowseryall') {
            setCanPlayInBrowser(true)
        }
    }, [country])

    const {
        headline,
        teaser,
        imageFile,
        template = '', // alignment
        videoId,
        buttonText,
        buttonUrl,
        date,
        contentCollection: { items },
    } = section

    const renderContent = (): JSX.Element => (
        <div className={cx(style.hero, style[template])}>
            {videoId && (
                <div>
                    <BackgroundVideo
                        fill
                        webm={videoId}
                        poster={`${imageFile?.url}?fl=progressive`}
                        hideOnEnd={!!imageFile}
                        id="video-frontpage"
                    />
                </div>
            )}
            <Container className={style.container}>
                {headline && (
                    <HeadingMedium {...headingShadow}>
                        <AnimatedText>{headline}</AnimatedText>
                    </HeadingMedium>
                )}
                {teaser && (
                    <TaglineLarge as="h2" {...headingShadow}>
                        <AnimatedText>{teaser}</AnimatedText>
                    </TaglineLarge>
                )}
                <CTA content={items} canPlayInBrowser={canPlayInBrowser} />
                <Platforms template={template} />
                {buttonText && (
                    <div className={style.announcement}>
                        <span className={style.text}>
                            {buttonUrl ? (
                                <Link path={getInternalLinkPath(buttonUrl)}>
                                    {buttonText}
                                </Link>
                            ) : (
                                buttonText
                            )}
                        </span>
                        {date && new Date(date) >= new Date() && (
                            <CountDown date={date} />
                        )}
                    </div>
                )}
                {quotes && (
                    <Quotes
                        className={style.quotes}
                        content={quotes.contentCollection?.items}
                    />
                )}
            </Container>
            {/* <ScrollIndicator id="content" /> */}
        </div>
    )

    return videoId ? (
        renderContent()
    ) : (
        <BackgroundImage
            url={imageFile?.url}
            size="cover"
            repeat="no-repeat"
            position="50% 50%"
            height={500}
        >
            {renderContent()}
        </BackgroundImage>
    )
}

export default Hero

