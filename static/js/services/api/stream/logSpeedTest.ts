import Logger from 'utils/logging'
import client from '../client'

export async function logSpeedTest(
  usertoken: string,
  username: string,
  speed: number
): Promise<void> {
  await client({
    url: `/stream/log?speed=${speed}&username=${username}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
  }).catch((error) => {
    Logger.captureException(error, null, {
      category: 'eve-anywhere',
      functionName: 'streamBusiness.logSpeedTest',
      message: error.message,
    })

    if (error.message === 'cancel') {
      console.log('Request cancelled')
    }
  })
}

