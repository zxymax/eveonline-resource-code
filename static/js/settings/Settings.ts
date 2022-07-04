import { environment, isDevelopment, isLocal } from 'config/web'
import SettingsModel from './models/SettingsModel'
import settingsJson from './SettingJson'
import getExternalSettings from './api/getExternalSettings'

export function getInternalSettings(): SettingsModel {
  const defaultSettings: SettingsModel = settingsJson.default

  const environmentSettings: SettingsModel = settingsJson[environment]

  const internalSettings: SettingsModel = {
    ...defaultSettings,
    ...environmentSettings,
  }

  return internalSettings
}

// Getting the external settings from specific page in Contentful, settings-page config field.
export default async function getSettings(): Promise<SettingsModel> {
  // TODO Settings can also be stored in session after first get if being used in many places to not call Contentful all the time

  // Get settings set in Contentful settings page
  return getExternalSettings(environment).then((externalSettings: SettingsModel) => {
    // Get default and environment config set in code
    const internalSettings: SettingsModel = getInternalSettings()

    const combinedConfig: SettingsModel = {
      ...internalSettings,
      ...externalSettings,
    }

    if (isDevelopment || isLocal)
      console.log('combined config: ', combinedConfig)

    return combinedConfig
  })
}

