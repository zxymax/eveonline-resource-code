import getConfig from 'config/web'

const { languages } = getConfig()

export const getLanguage = (state) => state.language
export const getLanguages = () => ([...languages])
// export const getLanguages = () => ['en', 'fr', 'de', 'ru', 'ja']
