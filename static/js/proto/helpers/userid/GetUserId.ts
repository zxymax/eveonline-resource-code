import { isClient } from 'config/web'
import JwtTokenHelper from 'lib/jwt'
import { getToken } from 'packages/authentication/helpers/token'
import { getAfterSignupCookieValues } from 'features/playnow/PlayNowStorage'

export default function getUserId(): number {
  if (isClient) {
    // Start with getting userId here

    let token = null

    const afterSignupValues = getAfterSignupCookieValues()
    // console.log('afterSignupValues: ', afterSignupValues)

    // 1. From signup token, that has higher priority than logged in user, yes
    if (afterSignupValues && afterSignupValues.user_token) {
      token = afterSignupValues.user_token
      // console.log('token from first attempt: ', token)
    }

    // 2. From logged in user user, only if not found before
    if (!token) {
      token = getToken()
      // console.log('token from logged in cookie: ')
    }

    if (token) {
      // Convert jwt to user id
      const userId = JwtTokenHelper.getUserId(token)
      // console.log('userID: ', userId)

      return userId
    }

    return null
  }
}
