import { redirect as rfrRedirect } from 'redux-first-router'
import sitemap from 'config/sitemap'
import { isSingle } from 'lib/pages/selectors'
import {
    redirect,
    setNotFound,
    setGoogleOptimizeEvent,
    setPageTransitionEvent,
} from './actions'
// import sitemap from 'config/sitemap'
// import getSettings from 'settings'
import { languageChange } from '../language/actions'
import { hideNavigation } from '../menu/actions'
// import { fetchSharedContent } from './api'
import { getLanguage, getLanguages } from '../language/selectors'

function getActivePage(page, subpage) {
    // If page is undefined in here then we are looking for home.
    const pageName = !page ? 'home' : page
    let activePage = sitemap[pageName]

    // Not logging tags anymore, lot of noise and the pages are obsolete or crawlers.
    if (!activePage) {
        // setTags({
        //     pageName,
        //     subpage,
        // })
        return undefined
    }

    // If subpage is set and main page has children then use that as activePage.
    // try {
    if (subpage && activePage.children) {
        activePage = activePage.children
    }
    // } catch (ex) {
    //     activePage = undefined
    //     ex.page = pageName
    //     ex.subpage = subpage
    //     throw ex
    // }

    return activePage
}

// Can be removed when these pages are in Contentful and configured like others.
const singleLegacyPages = ['discovery', 'monument']
function isSingleLegacyPage(page) {
    return singleLegacyPages.includes(page)
}


// Page actions is like action we had in controllers in the MVC pattern,
// except this one is shared for everything.
export default async function pageActions(dispatch, getState) {
    const {
        payload: { lang, page, subpage, id },
    } = getState().location

    // Language
    let language = getLanguage(getState())
    let actionLanguage = lang
    const languages = getLanguages()
    if (lang == null || languages.indexOf(lang) === -1) {
        // Fallback to english
        actionLanguage = 'en'
    }
    if (actionLanguage !== language) {
        dispatch(languageChange(actionLanguage))
        language = actionLanguage
    }

    // There is /en/ in the url, remove it
    if (lang === 'en') {
        return dispatch(rfrRedirect(redirect(page, subpage, id)))
    }

    // Shared content
    /*     if (!getState().pages.shared) {
        dispatch(setSharedStarted())
        const shared = await fetchSharedContent(language)
        dispatch(setShared(shared))
    } */

    const activePage = getActivePage(page, subpage)

    // Return NOT FOUND if sitemap does not contain page.
    if (!activePage) {
        console.log('dispatch not found in actions.js')
        return dispatch(setNotFound())
    }

    // Commenting out here, not needed anymore, but might need againg to turn specific pages on and off, could improve something then
    // TODO move to helper functions
    // Overriding disabled on pages with settings from external source
    // This has to be called before the .disabled check below.
    // This is custom case to turn on personalized video pages from external file but might be extended to feature flags.
    // if(activePage.checkSettings) {
    //     const settings = await getSettings()
    //     if(settings) {
    //         // Checking if persoanlized video pages are enabled
    //         if(activePage.groupId === 'personalized-video') {
    //             if(!settings.enablePersonalizedVideoPage) {
    //                 activePage.disabled = true
    //             }
    //         }
    //         // if(activePage.id === 'test') {
    //         //     if(!settings.enableTestPage) {
    //         //         activePage.disabled = true
    //         //     }
    //         // }
    //     }
    // }

    // Disabled pages
    if (activePage.disabled) {
        return dispatch(setNotFound())
    }

    // if the page is a single page with no subpages allowed, then remove all other parts of url, example /download
    // TODO can be removed when legacy pages are in Contentful, doing redirect below based on page.config.pageType value
    if (isSingleLegacyPage(page) && subpage) {
        return dispatch(rfrRedirect(redirect(page, null, null, lang)))
    }

    // There is /home/ in the url, remove it
    if (page === 'home') {
        if (actionLanguage === 'en') {
            return dispatch(rfrRedirect(redirect()))
        }
        return dispatch(
            rfrRedirect(
                redirect(undefined, undefined, undefined, actionLanguage)
            )
        )
    }

    // Redirects
    if (activePage.redirect) {
        const action = activePage.redirect
        action.payload.lang = language
        return dispatch(rfrRedirect(action))
    }

    // Show/Hide the navigation
    dispatch(hideNavigation(activePage.hideMenu))

    // Shared content
    /*     if (!getState().pages.shared) {
        dispatch(setSharedStarted())
        const shared = await fetchSharedContent(language)
        dispatch(setShared(shared))
    } */

    if (activePage.populate) {
        // Has populate function so calling it.
        const result = await activePage.populate(dispatch, getState, language)

        // Added to make sure that pages that are single should not have sub-subpages so redirecting to the base subpage.
        if (result && result.payload && result.payload.page) {
            if (isSingle(result.payload.page) && subpage) {
                return dispatch(rfrRedirect(redirect(page, null, null, lang)))
            }
        }

        dispatch(setGoogleOptimizeEvent())
    } else {
        dispatch(setGoogleOptimizeEvent())
    }

    switch (activePage.id) {
        case 'store':
            // console.log(
            //     '%cActions.js - store',
            //     'color: green; font-size: 16px',
            //     activePage
            // )
            // No Dispatch, doing Page Transition in store code
            break
        case 'callback':
            // console.log(
            //     '%cActions.js - callback',
            //     'color: green; font-size: 16px',
            //     activePage
            // )
            // No Dispatch, doing Page Transition in store code
            break
        case 'login':
            // console.log(
            //     '%cActions.js - login',
            //     'color: green; font-size: 16px',
            //     activePage
            // )
            // No Dispatch, the login page is being hit when there isn´t a user initiated login taking place.
            // To prevent faulty data I´m opting to remove the login hit.
            break
        default:
            // console.log(
            //     '%cActions.js - default',
            //     'color: green; font-size: 16px'
            // )
            // console.log('activePage', activePage)
            dispatch(setPageTransitionEvent())
            break
    }
}
