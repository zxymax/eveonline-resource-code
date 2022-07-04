import frontpageTranslations from './pages/www/translations/frontpage.json'
import recruitTranslations from './pages/recruit/translations/recruit.json'
// import worldTourTranslations from './pages/world-tour/translations/worldTour.json'
import signupTranslations from './pages/signup/translations/signup.json'
import commonTranslations from './layouts/app/translations.json'
import navigationTranslations from './features/navigation/translations/index.json'
import PartnershipProgram from './pages/partnership-program/translations/partnerShipProgram.json'
import News from './pages/news/translations/news.json'
import PlayNow from './features/playnow/translations/index.json'
import Academy from './pages/academy/translations/academy.json'
import AcademyNav from './pages/academy/translations/academyNavigation.json'
import YearInEVE from './pages/year-in-eve/translations/eoy21.json'
import AnyWhere from './pages/anywhere/translations/Anywhere.json'

export default {
    ...frontpageTranslations,
    ...recruitTranslations,
    // ...worldTourTranslations,
    ...signupTranslations,
    ...commonTranslations,
    ...navigationTranslations,
    ...PartnershipProgram,
    ...News,
    ...PlayNow,
    ...Academy,
    ...AcademyNav,
    ...YearInEVE,
    ...AnyWhere,
}

