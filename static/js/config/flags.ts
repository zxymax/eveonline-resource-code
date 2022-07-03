import { isProduction, isStaging, isPreProduction } from './web'

interface FlagsPages {
    newsEnabled: boolean
    articlesEnabled: boolean
    recruitmentEnabled: boolean
}

interface FlagsFeatures {
    colorThemeEnabled: boolean
    mailcheck: boolean
}

interface FlagsProps {
    isDevelopment: boolean
    isStaging: boolean
    pages: FlagsPages
    features: FlagsFeatures
}

// Define flags with default values
const flags: FlagsProps = {
    isDevelopment: !(isProduction || isStaging || isPreProduction),
    isStaging,
    pages: {
        newsEnabled: true, // path: /news, new news, use flag to turn on new news, and do redirect from old to new
        articlesEnabled: true, // path: /articles, old news, flag is not used anywhere
        recruitmentEnabled: true, // path: /recruit, can be set to false to disable /recruit and hide nav link
    },
    features: {
        colorThemeEnabled: true,
        mailcheck: true,
    },
}

export const pageFlags = flags.pages

export default flags
