import PlatformHelper from 'utils/platform'
import { addVirtualPathToDatalayer } from 'utils/analytics/analytics'
import { isClient } from 'config/web'

const virtualPathSignup =
  '/trial/default.aspx?step=EnterUserInformation&flow=trial14'
const virtualPathSignupRecruit =
  '/trial/default.aspx?step=EnterUserInformation&flow=trial21&type=share'

const virtualPathSuccess = '/trial/default.aspx?step=receipt&flow=trial14'
const virtualPathSuccessEveAnywhere =
  '/trial/default.aspx?step=receipt&flow=trial14&type=eveanywhere'
const virtualPathSuccessRecruit =
  '/trial/default.aspx?step=receipt&flow=trial21&type=share'

const emailVerifyStep = '/trial/default.aspx?step=Verify&flow=trial14'
const emailVerifyStepRecruit =
  '/trial/default.aspx?step=Verify&flow=trial21&type=share'
const emailVerifyStepFail = '/trial/default.aspx?step=VerifyFailed&flow=trial14'

function appendReceiptStateForVirtualPath(path: string, state: string): string {
  return `${path}&state=${state}`
}

const helper = new PlatformHelper()

// const uaOverwrite =
//     'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; RM-1127_16056) AppleWebKit/537.36(KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10536'

// helper.setUA(uaOverwrite)

const isWindowsOrMac = helper.isWindowsOrMac()

interface QueryModel {
  invc?: string
  sessionEnded?: string
  signupSuccess?: string
  rec?: string
  download?: string
  success?: string
  videoId?: string
}

export function getVirtualPath(
  page: string,
  subpage: string,
  query: QueryModel
): string {
  switch (page) {
    case 'signup':
      // Recruitment Signup
      if (query && query.invc) {
        return virtualPathSignupRecruit
      }
      // General Signup
      return virtualPathSignup

    case 'signup-confirmation':
      if (query && query.sessionEnded === 'true') {
        return 'virtualPathEndGameEndedThankYouPage'
      }
      return virtualPathSuccessEveAnywhere

    case 'signup-verify':
      // Signup-Verify uses query parameters in all cases.
      if (query) {
        // TODO Maybe only do this if previous page was signup, beware of paths then. /signup or /signup2 eg.

        // Important, we only assume this would happen client side, and not on server so we don't need this check and can't do it unless
        // on client because we can't detect device on server.
        // Receipt of signup success
        if (isClient && query.signupSuccess === 'true') {
          // Here we get the extra parameters and append them. isWindowsOrMac function and download or no-download thing.

          // Building path for signup success

          // Recruitment or General signup
          const pathSuccess =
            query.rec === 'true'
              ? virtualPathSuccessRecruit
              : virtualPathSuccess

          if (isWindowsOrMac) {
            // Download Win or Mac
            if (query.download === 'false') {
              const finalPath = appendReceiptStateForVirtualPath(
                pathSuccess,
                'manualdownload'
              )
              return finalPath
            }
            // Manual Download
            const finalPath = appendReceiptStateForVirtualPath(
              pathSuccess,
              'autodownload'
            )
            return finalPath
          }
          const finalPath = appendReceiptStateForVirtualPath(
            pathSuccess,
            'nodownload'
          )
          return finalPath
        }
        if (query.success === 'true') {
          // Email Verification
          if (query.rec === 'true') {
            // Recruitment Email Verification
            return emailVerifyStepRecruit
          }
          // General Email Verification
          return emailVerifyStep
        }
        if (query.success === 'false') {
          // Email Verification Failed
          return emailVerifyStepFail
        }
      }
      break
    case 'now':
      // Exploration landing page
      switch (subpage) {
        case 'exploration':
          return `${virtualPathSignup}&type=landing_exploration`
        default:
      }
      break
    case 'my-year-in-eve':
      // Recruitment Signup on Personalized Video Page
      if (query && query.videoId) {
        return virtualPathSignupRecruit
      }
      break
    default:
    // return undefined
  }
}

// Predefined Recruit Datalayer
export function addEventToDataLayer(
  page: string,
  subpage: string,
  query: QueryModel
): void {
  const virtualPath = getVirtualPath(page, subpage, query)
  if (virtualPath) {
    // Virtual Path found and adding event to dataLayer. ',
    addVirtualPathToDatalayer('sendVirtualPageView', virtualPath)
  }
}

