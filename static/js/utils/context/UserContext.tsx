// import UserContextModel from 'models/UserContextModel'
import { getLoggedInJwt, isLoggedIn } from 'packages/authentication'
import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import UserInfoModel from 'models/UserModel'
// import { getCountry } from 'services/api/location/country'
import getPlexBalance from 'services/api/vgs/getPlexBalance'
import isOmega from 'services/api/customer/isOmega'
import UserContextModel from 'models/UserContextModel'
import EntitlementCurrent from 'models/entitlements/EntitlementsModel'
import { getCountry } from 'services/api/location/country'
import getPlayTimeEntitlement from 'services/api/entitlements/getRemainingPlaytime'

const UserContextDefaultValues: UserContextModel = {
    country: 'en',
    plexBalance: 0,
    isOmegaUser: false,
    entitlement: null,
    updatePlex: () => null,
    updatePlexDev: () => null,
    updateEntitlement: () => null,
    // updateEntitlementAddManyDays: () => null,
}

// const dummyEntitlement: EntitlementCurrent = {
//     isEntitled: true,
//     omegaEntitlement: false,
//     entitlement: {
//         identifier: 1645177415600,
//         startTime: '2022-01-19T13:28:29.595+00:00',
//         endTime: '2022-05-20T13:28:29.595+00:00',
//         packCode: 'anywhere-pack-1-day',
//         packCost: 0,
//         packHours: 24,
//         isOmegaEntitlement: false,
//     },
// }

// const dummyEntitlementAddDays: EntitlementCurrent = {
//     isEntitled: true,
//     omegaEntitlement: false,
//     entitlement: {
//         identifier: 1645177415605,
//         startTime: '2022-01-19T13:28:29.595+00:00',
//         endTime: '2022-05-20T13:28:29.595+00:00',
//         packCode: 'anywhere-pack-1-day',
//         packCost: 0,
//         packHours: 24,
//         isOmegaEntitlement: false,
//     },
// }

// export const PlexContext = createContext<number>(null)
export const UserContext = createContext<UserContextModel>(
    UserContextDefaultValues
)
// export const usePlex = (): UserContextModel => useContext(UserContext)

export function UserProvider({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    const userToken = useSelector((state) => getLoggedInJwt(state))
    const loggedIn = useSelector((state) => isLoggedIn(state))
    const [plexBalance, setPlexBalance] = useState<number>(0)
    const [entitlement, setEntitlement] = useState<EntitlementCurrent>(null)
    const [isOmegaUser, setIsOmegaUser] = useState<boolean>(false)
    const [country, setCountry] = useState<string>(null)

    function useUserContextValue(): UserContextModel {
        async function updatePlex(token: string): Promise<void> {
            //  setPlexBalance(await getPlexBalance(userToken))
            // ONLY FOR TESTING - just subtracting 5 plex from user
            setPlexBalance(await getPlexBalance(token))
        }
        async function updatePlexDev(amount: number): Promise<void> {
            //  setPlexBalance(await getPlexBalance(userToken))
            // ONLY FOR TESTING - just subtracting 5 plex from user
            setPlexBalance(amount)
        }
        async function updateEntitlement(token: string): Promise<void> {
            setEntitlement(await getPlayTimeEntitlement(token))
            // setEntitlement(dummyEntitlement)
            // setPlexBalance(plexBalance + 5)
        }

        // async function updateEntitlementAddManyDays(): Promise<void> {
        //     // setEntitlement(await getPlayTimeEntitlement(userToken))
        //     setEntitlement(dummyEntitlementAddDays)
        //     setPlexBalance(plexBalance + 5)
        // }
        return {
            plexBalance,
            entitlement,
            isOmegaUser,
            country,
            updatePlex,
            updatePlexDev,
            updateEntitlement,
            // updateEntitlementAddManyDays,
        }
    }

    const UserContextValue = useUserContextValue()

    useEffect(() => {
        const fetchCountry = async (): Promise<void> => {
            setCountry(await getCountry())
        }

        fetchCountry()
    }, [])

    useEffect(() => {
        const fetchInfo = async (): Promise<void> => {
            setPlexBalance(await getPlexBalance(userToken))
            setIsOmegaUser(await isOmega(userToken))
            setEntitlement(await getPlayTimeEntitlement(userToken))
        }

        if (loggedIn && userToken) {
            fetchInfo()
        }
    }, [userToken])

    return (
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
    )
}

