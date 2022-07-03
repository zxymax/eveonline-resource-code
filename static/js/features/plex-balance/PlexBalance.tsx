import React, { useContext } from 'react'
import { isLoggedIn } from 'packages/authentication'
import { useSelector } from 'react-redux'
import { UserContext } from 'utils/context/UserContext'
import { ClipLoader } from 'react-spinners'
import AccountIcon, { IconAccountTypeEnum } from 'layouts/svgIcon/account'
import style from './PlexBalance.module.scss'

const PlexBalance = (): JSX.Element => {
    const loggedIn = useSelector((state) => isLoggedIn(state))
    const { plexBalance } = useContext(UserContext)

    function getNumberWithCommas(amount: number): string {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const showBalance = (plexAmount: number): JSX.Element => {
        if (plexAmount >= 0) {
            return <span>{getNumberWithCommas(plexAmount)}</span>
        }
        return <ClipLoader color="#30B2E6" size={15} loading />
    }

    return (
        <div className={style.plexBalance}>
            <AccountIcon
                icon={IconAccountTypeEnum.Plex}
                className={style.icon}
            />
            {loggedIn && plexBalance >= 0 ? (
                <div className={style.text}>{showBalance(plexBalance)}</div>
            ) : (
                <>N/A</>
            )}
        </div>
    )
}

export default PlexBalance
