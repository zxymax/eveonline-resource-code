import type { ConfigType, NoExtraProperties } from './ConfigType'

const defaultConfig: NoExtraProperties<ConfigType> = {
    monumentSearchApiUrl: 'https://api.ccpgames.com/v1/monument/search/',
    launcherVersionsUrl: 'https://launcher.eveonline.com/launcherVersions.json',
    launcherVersionDownloadUrl: 'https://binaries.eveonline.com/EveLauncher-',
    shareFacebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    shareTwitter: 'https://twitter.com/share?url=',
    shareGoogle: 'https://plus.google.com/share?url=',
    shareReddit: 'https://www.reddit.com/submit?url=',
    shareVk: 'https://vk.com/share.php?url=',
    adGlareUrl: 'https://engine.extccp.com/?930188625', // This is the same AdGlare zone as the launhcer uses
    platformSteam: {
        mobile: 'https://store.steampowered.com/app/8500/EVE_Online/',
        desktop: 'steam://run/8500',
    },

    platformEpic: {
        mobile: 'https://www.epicgames.com/store/p/eve-online',
        desktop: 'com.epicgames.launcher://store/p/eve-online',
    },
    languages: ['en', 'fr', 'de', 'ru', 'ja'],
    gtmId: 'GTM-NHK9F3',
    gaID: 'UA-45583206-1',
    optimizeID: 'GTM-5SGSLS5', // We only use one Optimize environment at the moment, the ID is also used in index.html (hardcoded)
    optimizeEndGameExperimentId: 'vhxTZi6VSkOeuqLsJPqS_w',
    optimizeAutoLoginExperimentId: 'gIEFBejgQZ2TGYZlsar66Q',
    authentication: {
        authUrl:
            'https://login-mammonmain.testeveonline.com/v2/oauth/authorize',
        tokenUrl: 'https://login-mammonmain.testeveonline.com/v2/oauth/token',
        logoutUrl:
            'https://login-mammonmain.testeveonline.com/account/logoff?returnUrl=',
        redirectUrl: 'https://dev.ccpeveweb.com/callback',
        clientId: 'wwwEveOnline', // 'wwwEveOnline'
        responseType: 'token',
        scopes:
            'eveClientLogin recruit.signup.v1 cisservice.userProfileBasic.v1 cisservice.customerRead.v1 vgs.transactionRead.v1',
    },
    slices: {
        build: 'NONE',
        backend: 'NONE',
        content: 'NONE',
    },
    sentryDsn: 'https://7e6385dfb18d49b18c01180358777e8d@sentry.io/1484810',
    contentful: {
        graphqlBaseUrl: 'https://graphql.contentful.com/content/v1/',
        environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT,
        spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
        preview: process.env.REACT_APP_CONTENTFUL_PREVIEW === 'true', // Always false unless the env variable string value is actually "true"
        contentTypePrefix:
            process.env.REACT_APP_CONTENTFUL_CONTENT_TYPE_PREFIX || '',
    },
    webApiUrl: 'https://www.eveonline.com/api',
    grpcGatewayUrl: 'https://doesnotexist',
    playNow: false,
    cis: 'https://cis.mammonmain.dev/', // config.cis = 'https://cis-mammonmain.testeveonline.com/'
    testVariable: process.env.REACT_APP_TEST_VARIABLE,
}

export default defaultConfig
