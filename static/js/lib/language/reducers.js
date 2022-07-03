import { LANGUAGE_CHANGE } from './actions'
import { getLanguages } from './selectors'

const language = (state = 'en', action) => {
    switch (action.type) {
        case LANGUAGE_CHANGE:
            if (getLanguages().indexOf(action.payload) > -1) {
                return action.payload
            }
            return state

        default: {
            return state
        }
    }
}

export default language
