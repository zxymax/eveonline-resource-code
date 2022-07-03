import { setActiveLanguage } from 'react-localize-redux'
import { LANGUAGE_CHANGE } from 'lib/language/actions'
import { getLanguage, getLanguages } from 'lib/language/selectors'

const localizationMiddleware = () => (store) => {
    let initialized = false
    return (next) => (action) => {
        const result = next(action)
        switch (action.type) {
            case LANGUAGE_CHANGE: {
                if (
                    initialized &&
                    getLanguages().indexOf(action.payload) > -1
                ) {
                    store.dispatch(setActiveLanguage(action.payload))
                }
                break
            }

            case '@@localize/INITIALIZE': {
                // Since initialize is called so late in the process that we have already
                // changed the language, and since we can not set active language in the
                // initialize function, we now wait for INITIALIZE to be called.
                // Once we have initialized react-localize-redux we can set the active
                // language to the currently active language, and start listening
                // for language changes
                initialized = true
                store.dispatch(setActiveLanguage(getLanguage(store.getState())))
                break
            }

            default:
                break
        }

        return result
    }
}

export default localizationMiddleware
