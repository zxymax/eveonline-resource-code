import { AnyAction } from 'redux'
import { STREAM_SESSION_ACTIVE } from './actions'

interface StreamType {
    active: boolean
}

const INITIAL_STATE: StreamType = {
    active: false,
}

const stream = (state = INITIAL_STATE, action: AnyAction): StreamType => {
    switch (action.type) {
        case STREAM_SESSION_ACTIVE:
            return {
                ...state,
                active: !state.active,
            }

        default:
            return state
    }
}

export default stream
