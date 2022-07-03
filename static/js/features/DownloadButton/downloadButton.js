import { REQUEST_VERSIONS, FETCH_VERSIONS_SUCCESSFULL } from './actions'

const INITIAL_STATE = {
    hasContent: false,
}

function DownloadButton(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_VERSIONS:
            return {
                ...state,
                hasContent: false,
            }
        case FETCH_VERSIONS_SUCCESSFULL:
            return {
                ...state,
                versions: action.payload.versions,
                hasContent: true,
            }
        default:
            return state
    }
}

export default DownloadButton
