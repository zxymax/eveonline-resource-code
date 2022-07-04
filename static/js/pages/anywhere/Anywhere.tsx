import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { isClient } from 'config/web'
import { UserContext } from 'utils/context/UserContext'
import { isLoggedIn } from 'packages/authentication'
import { PulseLoader } from 'react-spinners'
import BackgroundImage from 'features/background-image'
import allowedToPlay from 'features/playnow/helpers/allowed'
import pushPlayNowEvent from 'features/playnow/PlayNowDatalayerEvents'
import DataLayerEventsEnum from 'features/playnow/models/datalayer-events-enum'
import { flags } from 'config'
import { HeadingSmall } from 'layouts/typography'
import NotAllowedCountry from './components/notEligableCountry'
import LoginPanel from './components/logIn/loginPanel'
import UpgradeOrBuy from './components/upgradeOrBuy/UpgradeOrBuy'
import { DisplayViewEnum } from './AnywhereEnums'
import s from './Anywhere.module.scss'
import Play from './components/play/Play'
import MobileInfo from './components/mobile-disclaimer'
import FrameContainer from './components/container'

const Anywhere = (): JSX.Element => {
    const loggedIn = useSelector((state) => isLoggedIn(state))
    const { entitlement, isOmegaUser, country } = useContext(UserContext)
    const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false)
    const [displayView, setDisplayView] = useState<string>(
        DisplayViewEnum.LoadingComponent
    )

    const LoadingPulse = (): JSX.Element => {
        return (
            <FrameContainer>
                <div className={s.loading}>
                    <HeadingSmall>Loading</HeadingSmall>
                    <div className={s.dots}>
                        <PulseLoader size={50} color="#30b2e6" loading />
                    </div>
                </div>
            </FrameContainer>
        )
    }

    useEffect(() => {
        if (isClient) {
            // setEndType()

            if (country !== null && !allowedToPlay(country)) {
                pushPlayNowEvent(
                    DataLayerEventsEnum.StartPageCountryNotSupported
                )
                setDisplayView(DisplayViewEnum.WrongCountry)
            } else if (!loggedIn) {
                pushPlayNowEvent(DataLayerEventsEnum.StartPageNotLoggedIn)
                setDisplayView(DisplayViewEnum.Login)
            } else if (isOmegaUser) {
                setDisplayView(DisplayViewEnum.CanPlay)
            } else if (entitlement && entitlement?.isEntitled) {
                setDisplayView(DisplayViewEnum.CanPlay)
            } else if (entitlement && !entitlement.isEntitled) {
                pushPlayNowEvent(DataLayerEventsEnum.StartPageAlphaPlayer)
                setDisplayView(DisplayViewEnum.UpgradeOrBuyOmega)
            }
        }
    }, [entitlement, country, isOmegaUser])

    // Rendering options
    // 1. Have not fetched neccesary values (PLEX, Entitlemnts...)   -> display Loading component
    // 1. wrong country => display country not supported yet
    // 2. not logged in => display login screen
    // 2. logged in
    //    - isOmega => show play screen
    //    - Alpha => no entitlement -> show upgrade/buy screen
    //    - Alpha => no entitement -> insufficient PLEX -> Insufficeint PLEX screen
    //    - Alpha => buy entitlement Succesfull -> show play screen
    //    - Alpha => has entitlement - show play screen

    function renderPage(screenToShow: string): JSX.Element {
        switch (screenToShow) {
            case DisplayViewEnum.WrongCountry:
                return <NotAllowedCountry />
            case DisplayViewEnum.Login:
                return <LoginPanel />
            case DisplayViewEnum.CanPlay:
                return <Play hasRecentlyPurchased={purchaseSuccess} />
            case DisplayViewEnum.UpgradeOrBuyOmega:
                return <UpgradeOrBuy plexWithdrawal={setPurchaseSuccess} />
            case DisplayViewEnum.LoadingComponent:
                return <LoadingPulse />
            default:
                return <LoadingPulse />
        }
    }

    return (
        <BackgroundImage
            url="https://images.ctfassets.net/7lhcm73ukv5p/1fw37hFXpFDilaKYnD8s0L/06baa3d66eac18294fa7f16c6fa879ff/anywhere-bg.jpg"
            // repeat="no-repeat"
            size="cover"
            position="top center"
        >
            <div className={s.anywhere}>
                <div id="mobileInfoWrapper">
                    {isClient && isMobile && <MobileInfo />}
                </div>
                {renderPage(displayView)}
            </div>

            {flags.isDevelopment && (
                <div>
                    {/* <p>
                        {purchaseSuccess ? 'purchase success' : 'no purchase'}
                    </p> */}
                    <h5>Dev tools 🛠️</h5>
                    <button
                        onClick={() => setDisplayView(DisplayViewEnum.Login)}
                        type="button"
                        title="Not Logged in"
                    >
                        Not logged in
                    </button>
                    <button
                        onClick={() => setDisplayView(DisplayViewEnum.CanPlay)}
                        type="button"
                        title="Not Logged in"
                    >
                        Play Game
                    </button>
                    <button
                        onClick={() =>
                            setDisplayView(DisplayViewEnum.LoadingComponent)
                        }
                        type="button"
                        title="Not Logged in"
                    >
                        Loading
                    </button>
                    <button
                        onClick={() =>
                            setDisplayView(DisplayViewEnum.UpgradeOrBuyOmega)
                        }
                        type="button"
                        title="Not Logged in"
                    >
                        Upgrade Or buy
                    </button>
                    <button
                        onClick={() => setPurchaseSuccess(true)}
                        type="button"
                        title="Not Logged in"
                    >
                        Show plex purchase receipt
                    </button>
                </div>
            )}
        </BackgroundImage>
    )
}

export default Anywhere
