import DlpThemeType from 'models/types/ts/dlpThemeType'

const defaultTheme: DlpThemeType = {
    button: {
        color: '#fff',
        background:
            'linear-gradient(180deg, #30B2E6 0%, #2B9ECC 100%), #30B2E6',
    },
    link: '#00aeff',
    headline: '#fff',
    CTA: {
        color: '#fff',
        background:
            'linear-gradient(180deg, #30B2E6 0%, #2B9ECC 100%), #30B2E6',
    },
    ctaCardTemplate: '#202020',
    cardTemplate: '#202020',
    featuredTemplate: {
        headline: '#fff',
        link: '#00aeff',
    },
    signupForm: false,
    signupFormTheme: {
        theme: 'dark',
        background: 'rgba(33,33,33, 0.5)',
        color: '#30B2E6',
        text: '#fff',
    },
    legacy: true,
}

export default defaultTheme
