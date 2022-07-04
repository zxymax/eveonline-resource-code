import Logger from 'utils/logging'
import { getLaunchUrlBody } from 'features/playnow/PlayNowHelpers'
import { StreamInfoResponseModel } from 'features/playnow/models/LaunchUrlPostBodyModel'
import { StreamApiOptionsType } from 'features/playnow/models/stream-api-options-type'
import client from '../client'

// -------- For Anywhere phase 3

export async function entitlementNewUser(userToken: string): Promise<boolean> {
  const data = await client({
    url: '/entitlement/newuser',
    // params: { newUser: true },
    method: 'get',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((result) => {
      return result?.data?.created
    })
    .catch((error) => {
      console.log('error', error)
      Logger.captureException(error, null, {
        category: 'webapi',
        functionName: 'entitlementNewUser',
        message: error.message,
      })
    })

  return data
}

// // TODO, still used in runsteps, need to change code and not use this
// export async function getStreamAccessTokenDEPRECATE(
//     userToken: string,
//     options?: StreamApiOptionsType
// ): Promise<string> {
//     return 'not_use_access_token'
//     // const data = await client({
//     //     url: '/stream/access-token',
//     //     method: 'get',
//     //     headers: {
//     //         Authorization: `Bearer ${userToken}`,
//     //         'Access-Control-Allow-Origin': '*',
//     //     },
//     //     ...options,
//     // })
//     //     .then((result) => {
//     //         return result?.data
//     //     })
//     //     .catch((error) => {
//     //         Logger.captureException(error, null, {
//     //             category: 'webapi',
//     //             functionName: 'getStreamAccessToken',
//     //             message: error.message,
//     //         })

//     //         if (error.message === 'cancel') {
//     //             console.log('Request cancelled')
//     //         }
//     //     })

//     // return data && data.token
// }

export async function getStreamLaunchInfo(
  userToken: string,
  username: string,
  sessionEndedUrl?: string,
  options?: StreamApiOptionsType
  // TODO: define return type
  // eslint-disable-next-line
): Promise<StreamInfoResponseModel> {
  // This is body into our /api/stream/launch-url endpoint
  const body = getLaunchUrlBody(username, sessionEndedUrl)

  // 3. TODO, Launch url request logging, could something happen here that can be logged in Sentry

  const url = await client({
    url: '/stream/launch-url',
    method: 'post',
    data: body,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Access-Control-Allow-Origin': '*',
    },
    ...options,
  })
    .then((result) => {
      return result?.data
    })
    .catch((error) => {
      Logger.captureException(error, null, {
        category: 'webapi',
        functionName: 'getStreamLaunchInfo',
        message: error.message,
      })
    })
  return url
}

