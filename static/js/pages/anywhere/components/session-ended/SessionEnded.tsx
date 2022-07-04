import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PageBySlugQuery from 'queries/PageBySlugQuery'
import { findSectionByIdentifier } from 'lib/pages/api'
import PageType from 'models/types/ts/pageType'
import { GlobalState } from 'types/redux'
import { isClient } from 'config/web'
import SectionType from 'models/types/ts/sectionType'
import { UserContext } from 'utils/context/UserContext'
import pushPlayNowEvent from 'features/playnow/PlayNowDatalayerEvents'
import dataLayerSteps from 'features/playnow/PlayNowDataLayerSteps'
import { SessionEndType } from 'pages/anywhere/AnywhereEnums'
import { ImageLazyLoad, Link } from 'features'
import { getQuery } from 'lib/location/selectors'
import BackgroundImage from 'features/background-image'
import { flags } from 'config'
import Content from './Content'
import s from './SessionEnded.module.scss'

const SessionEnded = (): JSX.Element => {
    const language = useSelector((state: GlobalState) => state.language)
    const [sessionEndType, setSessionEndType] = useState<SessionEndType>()
    const { isOmegaUser } = useContext(UserContext)
    const slug = 'eve-anywhere-game-session-ended'

    const query = useSelector((state) => getQuery(state))

    useEffect(() => {
        pushPlayNowEvent(dataLayerSteps.finish)
    }, [])

    useEffect(() => {
        if (isClient) {
            if (!isOmegaUser) {
                if (query?.signup === 'true') {
                    setSessionEndType(SessionEndType.AlphaNew)
                } else {
                    setSessionEndType(SessionEndType.Alpha)
                }
            } else {
                setSessionEndType(SessionEndType.Omega)
            }
        }
    }, [isOmegaUser])

    const getDataBySessionEndedType = (sections): SectionType => {
        switch (sessionEndType) {
            case SessionEndType.AlphaNew:
                return findSectionByIdentifier(sections, 'new-alpha-player')
            case SessionEndType.Alpha:
                return findSectionByIdentifier(sections, 'alpha-player')
            case SessionEndType.Omega:
                return findSectionByIdentifier(sections, 'omega-player')
            default:
                return findSectionByIdentifier(sections, 'omega-player')
        }
    }

    return (
        <PageBySlugQuery slug={slug} locale={language}>
            {(page: PageType) => {
                if (page) {
                    const sections = page?.sectionsCollection?.items

                    const academyBannerSection = findSectionByIdentifier(
                        sections,
                        'academy-banner'
                    )

                    return (
                        <BackgroundImage
                            url="https://images.ctfassets.net/7lhcm73ukv5p/1fw37hFXpFDilaKYnD8s0L/06baa3d66eac18294fa7f16c6fa879ff/anywhere-bg.jpg"
                            // repeat="no-repeat"
                            size="cover"
                            position="top center"
                        >
                            <div className={s.sessionEnded}>
                                <Content
                                    section={getDataBySessionEndedType(
                                        sections
                                    )}
                                    showAsCards={
                                        sessionEndType !==
                                        SessionEndType.AlphaNew
                                    }
                                />
                                {academyBannerSection && (
                                    <div className={s.banner}>
                                        <Link
                                            path={{
                                                page:
                                                    academyBannerSection.buttonUrl,
                                            }}
                                        >
                                            {academyBannerSection.imageFile && (
                                                <ImageLazyLoad
                                                    image={
                                                        academyBannerSection.imageFile
                                                    }
                                                    lazyloadProps={{
                                                        height: 550,
                                                        offset: 100,
                                                        once: true,
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {flags.isDevelopment && (
                                <>
                                    <button
                                        onClick={() =>
                                            setSessionEndType(
                                                SessionEndType.AlphaNew
                                            )
                                        }
                                        type="button"
                                        title=""
                                    >
                                        Upsell New Alpha Player
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSessionEndType(
                                                SessionEndType.Alpha
                                            )
                                        }
                                        type="button"
                                        title=""
                                    >
                                        Upsell Alpha Player
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSessionEndType(
                                                SessionEndType.Omega
                                            )
                                        }
                                        type="button"
                                        title=""
                                    >
                                        Upsell Omega Player
                                    </button>
                                </>
                            )}
                        </BackgroundImage>
                    )
                }
                return <></>
            }}
        </PageBySlugQuery>
    )
}

export default SessionEnded
