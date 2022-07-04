import React, { createContext, useContext, useEffect, useState } from 'react'
import AdGlareResponse from 'models/AdGlareResponseModel'
import { getAds } from 'services/api/adGlare/getAds'
import { getLanguage } from 'selectors'
import { useSelector } from 'react-redux'

export const AdGlareContext = createContext<AdGlareResponse>(null)
export const useAds = (): AdGlareResponse => useContext(AdGlareContext)

export function AdGlareProvider({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    const [ads, setAds] = useState<AdGlareResponse>(null)
    const language = useSelector((state) => getLanguage(state))

    useEffect(() => {
        ;(async () => {
            setAds(await getAds(language))
        })()
    }, [language])

    return (
        <AdGlareContext.Provider value={ads}>
            {children}
        </AdGlareContext.Provider>
    )
}

