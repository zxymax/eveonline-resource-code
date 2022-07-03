import merge from 'deepmerge'
import defaultConfig from './default'
import type {
    ConfigType,
    AuthenticationConfigType,
    PlatformUrlType,
    ContentfulType,
    SliceType,
    NoExtraProperties,
} from './ConfigType'
import { validateConfig } from './ConfigType'

export * from './configHelper'
export type {
    ConfigType,
    AuthenticationConfigType,
    PlatformUrlType,
    ContentfulType,
    SliceType,
    NoExtraProperties,
}

type PartialDeep<T> = T extends object
    ? {
          [P in keyof T]?: PartialDeep<T[P]>
      }
    : T

// This strips out all undefined values, so we keep the defaults when merging.
const stripUndefined = <P = Record<string, unknown>>(
    x: PartialDeep<P>
): Partial<P> =>
    Object.fromEntries(
        Object.entries(x as Record<string, unknown>).filter(
            ([, v]) => v !== undefined
        )
    ) as Partial<P>

const ssoUrl = process.env.REACT_APP_SSO_URL
const host = process.env.REACT_APP_HOST
const secureUrl = process.env.REACT_APP_SECURE_URL

const webBaseUrl = host ? `https://${host}` : undefined
const webApiUrl =
    process.env.REACT_APP_WEB_API_URL ||
    (webBaseUrl ? `${webBaseUrl}/api` : undefined)
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const authentication = stripUndefined<AuthenticationConfigType>({
    clientId: process.env.REACT_APP_SSO_CLIENT_ID,
    scopes: process.env.REACT_APP_SSO_SCOPES,
})

const contentful = stripUndefined<ContentfulType>({
    graphqlBaseUrl: process.env.REACT_APP_CONTENTFUL_BASE_URL,
    environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT,
    spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    preview: process.env.REACT_APP_CONTENTFUL_PREVIEW === 'true', // Always false unless the env variable string value is actually "true"
    contentTypePrefix:
        process.env.REACT_APP_CONTENTFUL_CONTENT_TYPE_PREFIX || '',
})

const platformSteam = stripUndefined<PlatformUrlType>({
    mobile: process.env.REACT_APP_STEAM_MOBILE_URL,
    desktop: process.env.REACT_APP_STEAM_DESKTOP_URL,
})

const platformEpic = stripUndefined<PlatformUrlType>({
    mobile: process.env.REACT_APP_EPIC_MOBILE_URL,
    desktop: process.env.REACT_APP_EPIC_DESKTOP_URL,
})

const slices = stripUndefined<SliceType>({
    content: process.env.REACT_APP_CONTENT_SLICE,
    build: process.env.REACT_APP_BUILD_SLICE,
    backend: process.env.REACT_APP_BACKEND_SLICE,
})

const languages =
    (process.env.REACT_APP_LANGUAGES &&
        process.env.REACT_APP_LANGUAGES.split(' ')) ||
    undefined

const configOverrides: NoExtraProperties<
    Partial<ConfigType>
> = stripUndefined<ConfigType>({
    monumentSearchApiUrl: process.env.REACT_APP_MONUMENT_API_URL,

    launcherVersionsUrl: process.env.REACT_APP_LAUNCHER_VERSIONS_URL,
    launcherVersionDownloadUrl:
        process.env.REACT_APP_LAUNCHER_VERSION_DOWNLOAD_URL,

    shareFacebook: process.env.REACT_APP_SHARE_FACEBOOK_URL,
    shareTwitter: process.env.REACT_APP_SHARE_TWITTER_URL,
    shareGoogle: process.env.REACT_APP_SHARE_GOOGLE_URL,
    shareReddit: process.env.REACT_APP_SHARE_REDDIT_URL,
    shareVk: process.env.REACT_APP_SHARE_VK_URL,

    adGlareUrl: process.env.REACT_APP_ADGLARE_URL,

    gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID,
    gaID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
    optimizeID: process.env.REACT_APP_GOOGLE_OPTIMIZE_ID,

    optimizeEndGameExperimentId: process.env.REACT_APP_OPTIMIZE_ENDGAME_ID,
    optimizeAutoLoginExperimentId: process.env.REACT_APP_OPTIMIZE_AUTOLOGIN_ID,

    sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    playNow: process.env.REACT_APP_PLAYNOW_ENABLED
        ? process.env.REACT_APP_PLAYNOW_ENABLED === 'true'
        : undefined,

    grpcGatewayUrl: process.env.REACT_APP_GRPC_GATEWAY_URL,
    cis: process.env.REACT_APP_CIS_URL,
    testVariable: process.env.REACT_APP_TEST_VARIABLE,

    webBaseUrl,
    webApiUrl,
    apiBaseUrl,
    secureUrl,
    recruitmentServiceUrl: process.env.REACT_APP_RECRUITMENT_API_URL,
    signupServiceUrl: process.env.REACT_APP_SIGNUP_API_URL,

    slices,
    languages,
    contentful,
    authentication,
    platformSteam,
    platformEpic,
})

const getConfig = (): ConfigType => {
    const config = merge<ConfigType>(defaultConfig, configOverrides)

    let authData: Partial<AuthenticationConfigType> = {
        scopesArray: config.authentication.scopes.split(' '),
    }
    if (ssoUrl) {
        authData = {
            ...authData,
            authUrl: `${ssoUrl}/v2/oauth/authorize`,
            tokenUrl: `${ssoUrl}/v2/oauth/token`,
            logoutUrl: `${ssoUrl}/account/logoff?returnUrl=`,
        }
    }
    if (webBaseUrl) {
        authData = {
            ...authData,
            redirectUrl: `${webBaseUrl}/callback`,
        }
    }
    let urlData: Partial<ConfigType> = {}
    if (secureUrl) {
        urlData = {
            ...urlData,
            secureAccountManagementUrl: `${secureUrl}/accountManMenu.aspx`,
        }
    }
    if (apiBaseUrl) {
        urlData = {
            ...urlData,
            sectionsApiUrl: `${apiBaseUrl}/sections`,
            articlesApiUrl: `${apiBaseUrl}/articles`,
            pagesApiUrl: `${apiBaseUrl}/pages`,
        }
    }

    const merged = {
        ...config,
        ...urlData,
        authentication: {
            ...config.authentication,
            ...authData,
        },
    }
    validateConfig(merged)
    return merged
}

export default getConfig
