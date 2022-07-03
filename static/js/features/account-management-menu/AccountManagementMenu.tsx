import React from 'react'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { Translate } from 'react-localize-redux'
import ReactTooltip from 'react-tooltip'
import flags from 'config/flags'
import { login } from 'packages/authentication/lib/actions'
import { Icon } from 'layouts'
import AccountIcon, { IconAccountTypeEnum } from 'layouts/svgIcon/account'
import AnywhereIcon, { IconAnywhereTypeEnum } from 'layouts/svgIcon/anywhere'
import getConfig from 'config/web'
import {
    isLoggedIn,
    getLoggedInUser,
} from 'packages/authentication/lib/selectors'
import { getLanguage } from 'selectors'
import PlexBalance from 'features/plex-balance'
import Button from 'layouts/button'
import Item from './components/item'
import s from './AccountManagementMenu.module.scss'

interface NavItemProps {
    translationId: string
    url: string
    external?: boolean
    icon: React.ReactNode
}
interface Props {
    currentPage: string
    className?: string
}

const { secureUrl, secureAccountManagementUrl, authentication } = getConfig()

const items: Array<NavItemProps> = [
    {
        translationId: 'navigation.playNow',
        url: 'anywhere',
        icon: (
            <AnywhereIcon
                icon={IconAnywhereTypeEnum.LogoIcon}
                color="#777"
                width="22"
                height="22"
            />
        ),
    },
    {
        translationId: 'navigation.account.info',
        url: secureAccountManagementUrl,
        external: true,
        icon: <AccountIcon icon={IconAccountTypeEnum.AccountManagement} />,
    },
    {
        translationId: 'navigation.recruit',
        url: 'recruit',
        icon: <AccountIcon icon={IconAccountTypeEnum.Recruit} />,
    },
    {
        translationId: 'navigation.account.logout',
        url: 'logout',
        icon: <AccountIcon icon={IconAccountTypeEnum.LogOut} />,
    },
]

const AccountManagementMenu = ({
    className,
    currentPage,
}: Props): JSX.Element => {
    const loggedIn = useSelector((state) => isLoggedIn(state))
    const username = useSelector((state) => getLoggedInUser(state))
    const language = useSelector((state) => getLanguage(state))
    const dispatch = useDispatch()

    const plexUrl = `${secureUrl}/plex`
    const secureUrlLangQuery =
        language === 'en' ? plexUrl : `${plexUrl}?lan=${language}`

    const supportLangParam = language === 'en' ? 'en-us' : `${language}`
    const tooltipLink = `https://support.eveonline.com/hc/${supportLangParam}/articles/115003168285-PLEX-Vault`

    return (
        <Translate>
            {({ translate }) => (
                <div
                    className={cx(
                        s.accountmenu,
                        {
                            [s.colorTheme]: flags.features.colorThemeEnabled,
                        },
                        className
                    )}
                >
                    {!loggedIn ? (
                        <a
                            onClick={() =>
                                dispatch(login(currentPage, authentication))
                            }
                            role="button"
                            tabIndex={0}
                        >
                            <div className={cx(s.selected, s.login)}>
                                <AccountIcon
                                    icon={IconAccountTypeEnum.AccountAvatar}
                                    className={s.userIcon}
                                />
                                <span className={s.loginText}>
                                    {translate('navigation.account.login')}
                                </span>
                            </div>
                        </a>
                    ) : (
                        <>
                            <div className={s.selected}>
                                <AccountIcon
                                    icon={IconAccountTypeEnum.AccountAvatar}
                                    className={s.userIcon}
                                />
                                <div className={s.userName}>{username}</div>
                                <span className={s.arrow}>
                                    <Icon
                                        name="chevron-down"
                                        className={s.arrow}
                                    />
                                </span>
                            </div>
                            <ul>
                                <div className={s.plex}>
                                    <PlexBalance />
                                    <div className={s.details}>
                                        <a
                                            href={tooltipLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-tip={translate(
                                                'navigation.plexDescription'
                                            )}
                                            className={s.detailsIcon}
                                        >
                                            <AccountIcon
                                                icon={
                                                    IconAccountTypeEnum.Details
                                                }
                                            />
                                        </a>
                                        <Button
                                            className={s.btn}
                                            path={secureUrlLangQuery}
                                            small
                                            theme="omega"
                                        >
                                            {translate('navigation.buyPlex')}
                                        </Button>
                                    </div>
                                </div>
                                {items.map(
                                    ({
                                        translationId,
                                        url,
                                        external,
                                        icon,
                                    }) => (
                                        <Item
                                            key={translationId}
                                            text={translationId}
                                            external={external}
                                            url={url}
                                            icon={icon}
                                            lang={language}
                                        />
                                    )
                                )}
                            </ul>
                        </>
                    )}
                    <ReactTooltip
                        place="bottom"
                        type="dark"
                        className={s.tooltip}
                    />
                </div>
            )}
        </Translate>
    )
}

AccountManagementMenu.defaultProps = {
    className: '',
}

export default AccountManagementMenu
