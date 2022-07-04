import React, { createContext, useContext, useEffect, useState } from 'react'
import SettingsModel from 'settings/models/SettingsModel'
import getSettings, { getInternalSettings } from 'settings/Settings'

const initialSettings: SettingsModel = getInternalSettings()

export const SettingsContext = createContext<SettingsModel>(initialSettings)
export const useSettings = (): SettingsModel => useContext(SettingsContext)

export function SettingsProvider({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    const [settings, setSettings] = useState<SettingsModel>(initialSettings)

    useEffect(() => {
        ;(async () => {
            setSettings(await getSettings())
        })()
    }, [])

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    )
}

