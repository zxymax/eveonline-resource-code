/* eslint-disable */

// READ THIS
// This code is effectively becoming only about the speed test to Speed Of Me that needs to happen from browser
// Could be moved over to the /services/speedtest folder or something like that

// TODO, if working in this, try and remove eslint-disable and fix

import axios from 'axios'
import Logger from 'utils/logging'
import { getAfterSignupCookieValues } from './PlayNowStorage'
import { logSpeedTest } from 'services/api/stream'

// TODO get from config.
// const endgameApi = 'https://www.endgame42.com/api'

// const apiUrl = endgameApi

// Speed of Me
const SOM_API_KEY = 'SOM5f330746454f0' // TODO add to config

/* eslint @typescript-eslint/naming-convention: 0 */

// TODO DELETE THIS FUNCTION WHEN CONFIRMED THAT NEW FUNCTION WORKS FROM OUR API
function getAuthValuesDEPRECATE() {
    const values = getAfterSignupCookieValues()
    // Dummy if we want, then comment out the cookie call
    // values.user_token =
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6IkpXVC1TaWduYXR1cmUtS2V5IiwidHlwIjoiSldUIn0.eyJzY3AiOlsiZXZlQ2xpZW50TG9naW4iLCJjaXNzZXJ2aWNlLmN1c3RvbWVyUmVhZC52MSIsImNpc3NlcnZpY2UuY3VzdG9tZXJXcml0ZS52MSJdLCJqdGkiOiI1NzA2NTgxNS01NmExLTQyZDMtYTRhYy1lMzU1ODc5OTk2ODYiLCJraWQiOiJKV1QtU2lnbmF0dXJlLUtleSIsInN1YiI6IlVTRVI6RVZFOjE3NzkzOTc2IiwiYXpwIjoiZXZlTGF1bmNoZXJUUSIsIm5hbWUiOiJpbmd2aWhfdGVzdF8wMDEiLCJleHAiOjE1OTg5NzA2NDIsImlzcyI6ImxvZ2luLmV2ZW9ubGluZS5jb20ifQ.lL23saRaxXEeUcN2L4_boE_T1wyl7Q2R9wRjmvdYfCk9D71nKK_Q3VyEt0Xym7Eb96zVFIPYLSr14cozOrSEQV7-6mkNGx31MoxxQw4TXDNuuDKPAXRv7aWH8d30gqWCr29Pzk72O4fQV3vvGEwOQYNtFJ1zP8JH2CLYUJZzAnOgqh3WO_kM0WH6FS_UgjoiFgFHsIkgfFtZ20BrupVNBRBMkC00v8VIdvX01iTe8WMAKVDEwgZAdZj9U7abGU-Pm0TT5OivYf9ShIwQ6q5QTe3B53fNbxGqDZZTOXGIrmGMpJjN7Uxk3_k2y3Yt4_TRiQMtGTEu30CohKxERynoog'
    // values.username = 'ingvih_test_001'
    // values.access_token =
    //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIzOWZlMjdmYi1hMzk4LTQ2OTYtOTcxOS02ZDFjMDI0ZmRhMDIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNjUzMzIzOWYtMzhjZC00Y2U5LTkyOGEtNGZiYjJjODIxMzRlL3YyLjAiLCJpYXQiOjE1OTg5Njg1MDIsIm5iZiI6MTU5ODk2ODUwMiwiZXhwIjoxNTk4OTcyNDAyLCJhaW8iOiJFMkJnWUJDUERtWXc3MnErMXg4b1o2K2VJQjhFQUE9PSIsImF6cCI6Ijc5ZGIzZjVmLTYwNDUtNDFlMC05NTlhLWU1OTJkZDAwMDc5MSIsImF6cGFjciI6IjEiLCJvaWQiOiJjNmQxNzA0YS0yN2RjLTQ5ODQtOWViMS1kOTA4YzdhNmRmMWQiLCJyaCI6IjAuQVRjQW55TXpaYzA0NlV5U2lrLTdMSUlUVGw4XzIzbEZZT0JCbFpybGt0MEFCNUUzQUFBLiIsInN1YiI6ImM2ZDE3MDRhLTI3ZGMtNDk4NC05ZWIxLWQ5MDhjN2E2ZGYxZCIsInRpZCI6IjY1MzMyMzlmLTM4Y2QtNGNlOS05MjhhLTRmYmIyYzgyMTM0ZSIsInV0aSI6InhnYzRvWXFtUEUtU3lQb2QtSWtrQUEiLCJ2ZXIiOiIyLjAifQ.afIW5LVOJCe8F3B1_4ZMB9MvTVKUC3MG8EFRdrW0VPAOEMVKqIW4GZ6Qv3BeuUPY8mQnNvdTEN0UbcGjdZAusIOdRmXSgVlKDfs2nO1F8Mjr34i1Ke47QNqJxs1LlAzUA9VUFDXyeNDZgwCQq7xUNZ3opRBRM7cXdxo7GwFheplc1NnTreQ_qOQ5yPXJV2dh8jME-xQIOpWlTV0NHLlpJNvtuDuJSLsvGOFDlt9NKMoolOEOp5HCxVMjssKUxquTCFh3s1TMWikEuiz-o5b-os8-ZvULwpTU4J6slAQt89dD_6Lf4E4Knyzm8Zs4uFQPaMtxSL80EUn2SqdQmzrnQQ'

    // console.log('values: ', values)

    return values
}

// const sleep = (delay: number) =>
//     new Promise((resolve) => setTimeout(resolve, delay))

// // TODO DELETE THIS FUNCTION WHEN CONFIRMED THAT NEW FUNCTION WORKS FROM OUR API
// export async function serversAvailableWithParameters_DEPRECATE(
//     user_token: string,
//     access_token: string,
//     username: string,
//     options?: AbortSignal
// ): Promise<boolean> {
//     // console.log('FUNCTION: 2. serversAvailable_Parameters')

//     const customerHeader = JSON.stringify({
//         token: user_token,
//         name: 'ccp',
//     })

//     const value = await axios({
//         url: `${apiUrl}/QualifyAccessMachine?username=${username}`, // This will be moved to our endpoint /api/stream/qualify
//         headers: {
//             Authorization: `Bearer ${access_token}`, // Change this to user token
//             'Access-Control-Allow-Origin': '*',
//             'EndGame-Customer': customerHeader,
//         },
//         method: 'get',
//         ...options,
//     })
//         .then((result) => {
//             // console.log('result: ', result.data)
//             return result.data.value
//         })
//         .catch((error) => {
//             Logger.captureException(error, null, {
//                 category: 'eve-anywhere',
//                 functionName: 'PlayNowFunctions.serversAvailableWithParameters',
//                 message: error.message,
//             })

//             if (error.message === 'cancel') {
//                 console.log('Request cancelled')
//             }
//         })

//     // console.log('returning value: ', value)
//     return value
//     // return true
// }

// // TODO DELETE THIS FUNCTION WHEN CONFIRMED THAT NEW FUNCTION WORKS FROM OUR API
// export async function serversAvailable_DEPRECATE(): Promise<boolean> {
//     const { user_token, access_token, username } = getAuthValuesDEPRECATE()
//     return serversAvailableWithParameters_DEPRECATE(
//         user_token,
//         access_token,
//         username
//     )
// }

export async function callSpeedTestWithParameters(
    usertoken: string,
    username: string
): Promise<boolean> {
    // console.log('FUNCTION: 3. callSpeedTestWithParameters')

    try {
        const { SomApi } = window

        if (SomApi) {
            // console.log('window.location.hostname: ', window.location.hostname)

            SomApi.account = SOM_API_KEY // your API Key here
            SomApi.domainName = window.location.hostname // your domain or sub-domain here
            SomApi.config = {
                sustainTime: 1, // Level of accuracy (1-8). Lower values give faster results but are less accurate.
                latencyTestEnabled: false,
                testServerEnabled: false,
                uploadTestEnabled: false,
                downloadTestEnabled: true,
                userInfoEnabled: false,
                // this is optional, to disable, set enabled to false
                progress: {
                    enabled: true,
                    verbose: true,
                },
            }

            return await new Promise((resolve, reject) => {
                function onProgress(e: unknown): void {
                    // handle progress here
                    // console.log('handle progress here', e)
                }
                function onTestCompleted(data: { download: number }): void {
                    try {
                        logSpeedTest(usertoken, username, data.download)
                        if (data.download > 25) {
                            resolve(true)
                        } else {
                            // Returns false if speed below 25
                            resolve(false)
                        }
                    } catch (e) {
                        Logger.captureException(e, null, {
                            category: 'eve-anywhere',
                            functionName: 'callSpeedTest.onTestCompleted',
                            message: e,
                        })
                        reject(e)
                    }
                }
                function onError(e: Error): void {
                    Logger.captureException(e, null, {
                        category: 'eve-anywhere',
                        functionName: 'callSpeedTestWithParameters.onError',
                        message: e?.message,
                    })
                    reject(e)
                }
                SomApi.onProgress = onProgress
                SomApi.onTestCompleted = onTestCompleted
                SomApi.onError = onError
                SomApi.startTest()
            })
        }

        throw new Error('Speed test script not loaded.')
    } catch (e) {
        Logger.captureException(e, null, {
            category: 'eve-anywhere',
            functionName: 'callSpeedTestWithParameters',
            message: 'Error in PlayNowFunction.callSpeedTestWithParameters()',
        })
        // Throwing error again, it is logged and a unexpected error could be shown
        throw e
    }
}

export async function callSpeedTest(): Promise<boolean> {
    const { user_token, username } = getAuthValuesDEPRECATE()
    return callSpeedTestWithParameters(user_token, username)
}
