import Logger from 'utils/logging'
import client from '../client'

export async function serversAvailable(
  usertoken: string,
  username: string,
  options?: AbortSignal
): Promise<boolean> {
  const value = await client({
    url: `/stream/available?username=${username}`,
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
    method: 'get',
    ...options,
  })
    .then((result) => {
      return result.data.value
    })
    .catch((error) => {
      Logger.captureException(error, null, {
        category: 'eve-anywhere',
        functionName: 'streamBusiness.serversAvailable',
        message: error.message,
      })

      if (error.message === 'cancel') {
        console.log('Request cancelled')
      }
    })
  return value
}

