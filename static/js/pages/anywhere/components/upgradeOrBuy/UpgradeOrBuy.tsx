import React, { useContext, useState } from 'react'
import {
    getLoggedInJwt,
    getLoggedInUser,
} from 'packages/authentication/lib/selectors'
import { useSelector } from 'react-redux'
import {
    HeadingSmall,
    ParagraphLarge,
    ParagraphRegular,
} from 'layouts/typography'
import getConfig from 'config/web'
import { Translate, TranslateFunction } from 'react-localize-redux'
import { Button } from 'layouts'
import { UserContext } from 'utils/context/UserContext'
import { flags } from 'config'
import { ClipLoader } from 'react-spinners'
import purchasePack from 'services/api/entitlements/purchasePack'
import PlexBalance from 'features/plex-balance'
import { Modal, useModal } from 'layouts/modal'
import { IconAnywhereTypeEnum } from 'layouts/svgIcon/models/icon-type-enum'
import AnywhereIcon from 'layouts/svgIcon/anywhere'
import pushPlayNowEvent from 'features/playnow/PlayNowDatalayerEvents'
import DataLayerEventsEnum from 'features/playnow/models/datalayer-events-enum'
import { useScript } from 'hooks'
import { callSpeedTestWithParameters } from 'features/playnow/PlayNowFunctions'
import { getLanguage } from 'selectors'
import { PlexLogo } from '../svg/plex'
import FrameContainer from '../container'
import s from './UpgradeOrBuy.module.scss'
// import Modal from '../modal_OBSOLETE'

interface UpgradeOrBuyProps {
    plexWithdrawal: (arg0: boolean) => void
}

const UpgradeOrBuy = ({ plexWithdrawal }: UpgradeOrBuyProps): JSX.Element => {
    const userToken = useSelector((state) => getLoggedInJwt(state))
    // const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false)
    const [processPayment, setProcessPayment] = useState<boolean>(false)
    const [paymentFailed, setPaymentFailed] = useState<boolean>(false)
    const [speedTestRunning, setSpeedTestRunning] = useState<boolean>(false)
    const [showSpeedFailed, setShowSpeedFailed] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const { isOpen, toggleModal } = useModal()
    const { secureUrl } = getConfig()

    const { plexBalance, updateEntitlement, updatePlex } = useContext(
        UserContext
    )

    const scriptStatus = useScript('//speedof.me/api/api.js')
    const scriptReady = scriptStatus === 'ready'

    // Might want to read this value from the enttitlement endpoint later on
    const costOf24HoursOfStream = 30
    const costOfOmegaDay = 0.40 // prettier-ignore
    const costOfStreamDay = 1.00 // prettier-ignore

    // TODO: add Langauage parameter to secure Omega url
    const language = useSelector((state) => getLanguage(state))
    const upsellSecureUrl = `${secureUrl}/plex?lan=${language}`
    const username = useSelector((state) => getLoggedInUser(state))

    const buyPack = async (packCode: string): Promise<void> => {
        if (plexBalance < costOf24HoursOfStream) {
            pushPlayNowEvent(DataLayerEventsEnum.StartPageInsufficientPlex)
            toggleModal()
        } else {
            if (scriptReady) {
                setSpeedTestRunning(true)
                const speedTestOk = await callSpeedTestWithParameters(
                    userToken,
                    username
                )

                if (!speedTestOk) {
                    setShowSpeedFailed(true)
                    toggleModal()
                    setSpeedTestRunning(false)
                    return
                }
                setSpeedTestRunning(false)
            }

            setProcessPayment(true)

            const purhaseSuccess = await purchasePack(userToken, packCode)
            if (purhaseSuccess) {
                plexWithdrawal(true)

                setTimeout(() => {
                    updateEntitlement(userToken)
                    updatePlex(userToken)
                    setProcessPayment(false)
                }, 2000)
            } else {
                setPaymentFailed(true)
            }
        }
    }

    const YourPlexBalance = (): JSX.Element => {
        return (
            <div className={s.balance}>
                <Translate id="anywhere.yourPlexBalance" />
                <PlexBalance />
            </div>
        )
    }

    const renderNoFunds = (translate: TranslateFunction): JSX.Element => {
        const plexNeeded: number = costOf24HoursOfStream - plexBalance
        return (
            <div className={s.noFundsContainer}>
                <HeadingSmall>
                    {translate('anywhere.noFundsTitle')}
                </HeadingSmall>
                <ParagraphRegular>
                    {translate('anywhere.noFundsDescription')
                        .toString()
                        .replace('##PLEXMISSING##', plexNeeded.toString())
                        .replace(
                            '##CURRENTPLEXBALANCE##',
                            plexBalance.toString()
                        )}
                </ParagraphRegular>
                <div className={s.buttonContainer}>
                    <Button
                        data-id="eveanywhere-no-funds-buy-plex"
                        theme="omega"
                        path={upsellSecureUrl}
                        size="small"
                    >
                        {translate('anywhere.noFundsBtnText')}
                    </Button>
                </div>
            </div>
        )
    }

    const renderInsufficientSpeed = (
        translate: TranslateFunction
    ): JSX.Element => {
        return (
            <div className={s.noFundsContainer}>
                <HeadingSmall>
                    {translate('anywhere.SpeedTestFailedTitle')}
                </HeadingSmall>
                <ParagraphRegular>
                    {translate('anywhere.speedTestFailed')}
                </ParagraphRegular>
            </div>
        )
    }

    return (
        <FrameContainer logo>
            <Translate>
                {({ translate }) => (
                    <div className={s.upgradeOrBuyContainer}>
                        <YourPlexBalance />
                        <ParagraphLarge fontSize={[22, 26]}>
                            {translate('anywhere.upgradeOrBuyTitle')}
                        </ParagraphLarge>
                        <div className={s.UpgradeOrBuy}>
                            <div className={s.item}>
                                <div className={s.inner}>
                                    <div className={s.text}>
                                        <AnywhereIcon
                                            icon={IconAnywhereTypeEnum.LogoIcon}
                                            color="#c0c0c0"
                                        />
                                        <ParagraphRegular>
                                            {translate(
                                                'anywhere.upgradeOrBuySubTitle'
                                            )}
                                        </ParagraphRegular>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            pushPlayNowEvent(
                                                DataLayerEventsEnum.StartPageBuyPlexClick
                                            )
                                        }
                                        data-id="eveanywhere-upsell-button"
                                        theme="omega"
                                        path={upsellSecureUrl}
                                        size="small"
                                    >
                                        {translate(
                                            'anywhere.upgradeOrBuyUpgradeOmega'
                                        )}
                                    </Button>
                                </div>
                                <div className={s.smallPrint}>
                                    {translate(
                                        'anywhere.upgradeOrBuyUpgradeOmegaFrom'
                                    )
                                        .toString()
                                        .replace(
                                            '##PRICE##',
                                            costOfOmegaDay.toString()
                                        )}
                                </div>
                            </div>
                            <div className={s.item}>
                                <div className={s.inner}>
                                    <div className={s.text}>
                                        <AnywhereIcon
                                            icon={IconAnywhereTypeEnum.LogoIcon}
                                        />
                                        <ParagraphRegular>
                                            {translate(
                                                'anywhere.upgradeOrBuyUnlimited'
                                            )}
                                        </ParagraphRegular>
                                    </div>
                                    <Button
                                        data-id="eveanywhere-upsell-button"
                                        theme="omega"
                                        onClick={() => {
                                            buyPack('anywhere-pack-1-day')
                                            pushPlayNowEvent(
                                                DataLayerEventsEnum.StartPageBuyNowClick
                                            )
                                        }}
                                        size="small"
                                    >
                                        {/* {speedTestRunning && (
                                            <div className={s.speedTest}>
                                                Checking speed...
                                            </div>
                                        )} */}

                                        {speedTestRunning ||
                                        (processPayment && !paymentFailed) ? (
                                            <ClipLoader
                                                color="#30B2E6"
                                                size={15}
                                                loading
                                            />
                                        ) : (
                                            <>
                                                {translate(
                                                    'anywhere.upgradeOrBuyBuyNow'
                                                )}
                                                <PlexLogo />{' '}
                                                {costOf24HoursOfStream}
                                            </>
                                        )}
                                    </Button>
                                    {paymentFailed && (
                                        <span className={s.err}>
                                            Error occurred while purchasing play
                                            time
                                        </span>
                                    )}
                                </div>
                                <div className={s.smallPrint}>
                                    <div className={s.worth}>
                                        {translate(
                                            'anywhere.upgradeOrBuyUpgradeOmegaFrom'
                                        )
                                            .toString()
                                            .replace(
                                                '##PRICE##',
                                                costOfStreamDay.toString()
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className={s.bullets}>
                                <ul>
                                    <li>
                                        {translate(
                                            'anywhere.upgradeOrBuyBullet1'
                                        )}
                                    </li>
                                    <li>
                                        {translate(
                                            'anywhere.upgradeOrBuyBullet2'
                                        )}
                                    </li>
                                    <li>
                                        {translate(
                                            'anywhere.upgradeOrBuyBullet3',
                                            null,
                                            { renderInnerHtml: true }
                                        )}
                                    </li>
                                </ul>
                            </div>
                            {flags.isDevelopment && (
                                <div
                                    style={{
                                        textAlign: 'left',
                                        display: 'none',
                                    }}
                                >
                                    <h5>Dev tools 🛠️</h5>
                                    <br />
                                    <input
                                        type="text"
                                        style={{
                                            backgroundColor: 'white',
                                            width: '50px',
                                        }}
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => toggleModal()}
                                        type="button"
                                    >
                                        no funds
                                    </button>
                                </div>
                            )}

                            <Modal
                                isOpen={isOpen}
                                hide={toggleModal}
                                darkTheme
                                darkSmall
                            >
                                {showSpeedFailed
                                    ? renderInsufficientSpeed(translate)
                                    : renderNoFunds(translate)}
                            </Modal>
                        </div>
                    </div>
                )}
            </Translate>
        </FrameContainer>
    )
}
export default UpgradeOrBuy
