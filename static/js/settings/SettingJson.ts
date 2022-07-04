// config names are not nested.
// Page toggle flags start with pageEnabledName and type bool
// Feature toggle flags start with featureEnabledName and type bool
// Event toggle flags start with eventEnabledName and type bool
// API urls start with urlName and type string
// If you add a new settings you need to add it to the model with same name also
// Model is in models/SettingsModel.ts

const settingsJson = {
  default: {
    // Default if always first, then if found in environment here or external then that is used instead
    pageEnabledSomePage: false,
    featureEnabledSomeFeature: false,
    featureEnabledPlayInBrowserButton: true,
    eventEnabledSomeEvent: false,
    eventEnabledSignup: false,
    eventEnabledDownload: false,
    urlEventGatewayBaseUrl: 'https://default-gateway-urldoesnotexist',
    urlInstallerDownloadUrl: 'https://binaries.eveonline.com/EveLauncher-',
  },
  local: {
    eventEnabledDownload: true,
    urlInstallerDownloadUrl: 'https://dev.ccpeveweb.com/EveLauncher-',
  },
  development: {
    pageEnabledSomePage: false,
    featureEnabledSomeFeature: false,
    eventEnabledSomeEvent: false,
    eventEnabledSignup: false,
    eventEnabledDownload: false,
    urlEventGatewayBaseUrl: 'https://dev-gateway-urldoesnotexist',
    urlInstallerDownloadUrl: 'https://binaries.eveonline.com/EveLauncher-',
  },
  staging: {
    pageEnabledSomePage: false,
    featureEnabledSomeFeature: false,
    eventEnabledSomeEvent: false,
    eventEnabledSignup: false,
    eventEnabledDownload: false,
    urlEventGatewayBaseUrl:
      'https://dev-public-gateway-http.evetech.net:443/v1/events/',
    urlInstallerDownloadUrl: 'https://binaries.eveonline.com/EveLauncher-',
  },
  production: {
    pageEnabledSomePage: false,
    featureEnabledSomeFeature: false,
    eventEnabledSomeEvent: false,
    eventEnabledSignup: false,
    eventEnabledDownload: false,
    urlEventGatewayBaseUrl:
      'https://live-public-gateway-http.evetech.net:443/v1/events/',
    urlInstallerDownloadUrl: 'https://binaries.eveonline.com/EveLauncher-',
  },
}

export default settingsJson

