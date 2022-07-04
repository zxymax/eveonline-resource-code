import axios from 'axios'
import getConfig from 'config/web'
import Analytics from 'utils/analytics'
import Logger from 'utils/logging'

let prevValue = ''
let isValid = true

const { signupServiceUrl } = getConfig()

// TODO replace with new datalayer event helper.
const validationEvent = {
    event: 'Interaction',
    eventCategory: 'form interactions',
    eventAction: 'form: signup',
    eventLabel: 'error - invalid email',
}

export default async function validateEmail(
    value: string,
    message: string
): Promise<string> {
    // console.log('TCL: validateEmail -> value', value)
    // const signupApiUrl = 'https://localhost:44337/'

    if (value !== prevValue) {
        prevValue = value
        const url = `${signupServiceUrl}/api/v2/validate/email`
        return axios
            .post(url, {
                value,
            })
            .then((result) => {
                // console.log('TCL: validateEmail -> result', result)
                if (result.status === 200) {
                    isValid = result.data
                    if (!isValid) Analytics.PushEventObject(validationEvent)
                }
                return isValid ? '' : message
            })
            .catch((error) => {
                Logger.captureNetworkException(
                    error,
                    url,
                    'signup.validateEmail'
                )
            }) as Promise<string>
    }

    return isValid ? '' : message
}

