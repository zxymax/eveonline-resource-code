interface PlatformUrlType {
  mobile: string
  desktop: string
}

interface ContentfulType {
  graphqlBaseUrl: string
  spaceId: string
  accessToken: string
  preview: boolean
  environment: string
  contentTypePrefix: string
}

interface SliceType {
  build: string
  backend: string
  content: string
}

interface ConfigType {
  env?: string
  cis: string
  webBaseUrl?: string
  webApiUrl?: string
  apiBaseUrl?: string
  signupServiceUrl?: string
  secureUrl?: string
  recruitmentServiceUrl?: string
  monumentSearchApiUrl?: string
  sentryDsn: string
  launcherVersionsUrl: string
  launcherVersionDownloadUrl: string
  shareFacebook: string
  shareTwitter: string
  shareGoogle: string
  shareReddit: string
  shareVk: string
  gtmId: string
  gaID: string
  optimizeID: string
  optimizeEndGameExperimentId: string
  optimizeAutoLoginExperimentId: string
  languages: string[]
  adGlareUrl: string
  platformSteam: PlatformUrlType
  platformEpic: PlatformUrlType
  playNow: boolean
  contentful: ContentfulType
  authentication: AuthenticationConfigType
  testVariable: string
  grpcGatewayUrl: string
  secureAccountManagementUrl?: string
  slices: SliceType
  sectionsApiUrl?: string
  articlesApiUrl?: string
  pagesApiUrl?: string
}

interface AuthenticationConfigType {
  authUrl?: string
  tokenUrl?: string
  logoutUrl?: string
  redirectUrl?: string
  clientId?: string
  responseType?: string
  scopes?: string
  scopesArray?: string[]
}

type Impossible<K extends keyof never> = {
  [P in K]: never
}

type NoExtraProperties<T, U extends T = T> = U &
  Impossible<Exclude<keyof U, keyof T>>

function validateConfig<T extends ConfigType>(
  config: T & NoExtraProperties<ConfigType, T>
): boolean {
  return !!config
}

export {
  ConfigType,
  AuthenticationConfigType,
  PlatformUrlType,
  ContentfulType,
  SliceType,
  NoExtraProperties,
  validateConfig,
}
