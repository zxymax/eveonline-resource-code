import axios from 'axios'
import getConfig from 'config/web'
import Analytics from 'utils/analytics'
import Logger from 'utils/logging'

let prevValue = ''
let isValid = true

// TODO replace with new datalayer event helper.
const validationEvent = {
  event: 'Interaction',
  eventCategory: 'form interactions',
  eventAction: 'form: signup',
  eventLabel: 'error - username unavailable',
}

const { signupServiceUrl } = getConfig()

export default async function validateUsername(
  value: string,
  message: string
): Promise<string> {
  if (value && value !== prevValue) {
    prevValue = value
    const url = `${signupServiceUrl}/api/v2/validate/username`

    return axios
      .post(url, {
        value,
      })
      .then((result) => {
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
          'signup.validateUsername'
        )
      }) as Promise<string>
  }

  return isValid ? '' : message
}

