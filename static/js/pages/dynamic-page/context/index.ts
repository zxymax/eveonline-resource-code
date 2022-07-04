import { createContext } from 'react'
import DlpThemeType from 'models/types/ts/dlpThemeType'
import PageLocationType from 'models/page-location-type'
import dlpThemeTypeDefault from '../defaultTheme'

export const ThemeContext = createContext<DlpThemeType>(dlpThemeTypeDefault)
export const LocationContext = createContext<PageLocationType>(undefined)
