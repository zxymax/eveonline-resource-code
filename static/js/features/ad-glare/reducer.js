import { REQUEST_ADS, FETCH_ADS_SUCCESSFULL } from './action'
import { LANGUAGE_CHANGE } from '../../lib/language/actions'

const INITIAL_STATE = {}

function ads(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_ADS:
            return { isFetching: true }
        case LANGUAGE_CHANGE: {
            return { shouldFetch: true }
        }
        case FETCH_ADS_SUCCESSFULL:
            return {
                adTypes: action.payload,
                isFetching: false,
            }
        default:
            return state
    }
}

export default ads
