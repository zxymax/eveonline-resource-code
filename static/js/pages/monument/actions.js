import axios from 'axios'
import { paths } from 'config'

export const FIND_NAME_START = 'FIND_NAME_START'
export const FIND_NAME_SUCCESS = 'FIND_NAME_SUCCESS'
export const FIND_NAME_NOTFOUND = 'FIND_NAME_NOTFOUND'
export const FIND_NAME_FAILURE = 'FIND_NAME_FAILURE'
export const FIND_NAME_CLEAR = 'FIND_NAME_CLEAR'

export const findNameStart = (name) => ({
    type: FIND_NAME_START,
    name,
})

export const findNameNotFound = (name) => ({
    type: FIND_NAME_NOTFOUND,
    name,
})

export const findNameSuccess = (name, data) => ({
    type: FIND_NAME_SUCCESS,
    name,
    data,
})

export const findNameClear = () => ({
    type: FIND_NAME_CLEAR,
})

export const findName = (name) => (dispatch) => {
    dispatch(findNameStart(name))

    axios
        .post(paths.monumentSearchApiUrl, name, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            if (response.data.Message !== undefined) {
                dispatch(findNameNotFound(name))
            } else {
                dispatch(findNameSuccess(name, response.data))
            }
        })
}
