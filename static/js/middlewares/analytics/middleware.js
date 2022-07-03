import Analytics from 'utils/analytics'
import { isClient } from 'config/web'

// If you want initializing code then add curly braces and return this.
const analyticsReporter = () => (store) => (next) => (action) => {
    // eslint-disable-line
    switch (action.type) {
        case 'PAGE':
            // console.log('---PAGE---')
            // 2019-02-05|GPS - Leaving this structure here intact for the moment, depending on what we do with the products.

            switch (action.payload.page) {
                case 'store':
                    // console.log('%cSTORE', 'color:#6542f4; font-size: 20px')

                    // ! This is empty on the first store load, so not an ideal approach
                    // ? What do we want to do with the product selection?
                    Analytics.PushVariable('product', action.payload.id)

                    switch (action.payload.subpage) {
                        case 'checkout':
                            // console.log('SUBPAGE')
                            // console.log('CHECKOUT')
                            break
                        default:
                            break
                    }

                    break
                case 'article':
                    // console.log('DO NOTHING')
                    break
                case 'callback':
                    // console.log('CALLBACK')
                    // console.log('DO NOTHING')
                    break
                default:
                    // console.log(
                    //     '********middleware::analyticsReporter()**********',
                    //     action.payload
                    // )
                    // console.log('%cDEFAULT', 'color:#6542f4; font-size: 20px')
                    break
            }

            break
        case 'FETCH_PAGE_ARTICLE':
            // Nothing being used here at the moment
            break
        case 'FETCH_PAGE_OPTIMIZE_EVENT':
            // Optimize Event needs to be pushed at the end of every page load in order for Google Optimize to pick up the correct page state
            Analytics.PushEvent('optimize.activate')
            break
        case 'FETCH_PAGE_TRANSITION_EVENT':
            // We´re pushing the Page Transition events manually, so we can properly control what the Google Tag Manager picks up as page hits

            setTimeout(() => {
                // if (isClient) {
                //     console.log(
                //         '%cMiddleware::PushPageTransition',
                //         'color:#8766ff; font-size: 16px',
                //         document.title
                //     )
                // }
                Analytics.PushEvent('pageTransition', 'Middleware')
            }, 0)
            break
        default:
            break
    }

    // window.dataLayer.pusy

    return next(action)
}

export default analyticsReporter
