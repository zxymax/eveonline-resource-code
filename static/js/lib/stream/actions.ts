export const STREAM_SESSION_ACTIVE = 'STREAM_SESSION_ACTIVE'

interface Action {
    type: 'STREAM_SESSION_ACTIVE'
    payload: boolean
}

export const streamActive = (active: boolean): Action => ({
    type: STREAM_SESSION_ACTIVE,
    payload: active,
})
