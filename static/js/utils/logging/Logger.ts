import Sentry from 'config/sentry'

interface NetworkErrorModel {
  response: {
    status: string
  }
  request: unknown
  message: string
}

type TagCategories =
  | 'eve-anywhere'
  | 'network-error'
  | 'webapi'
  | 'proto'
  | 'events'

interface TagsProps {
  category?: TagCategories
  message?: string
  functionName?: string
  functionDetail?: string
  httpStatusCode?: string
  requestUrl?: string
  eventType?: string
}

class Logger {
  static captureException(
    error: unknown,
    extra: { [prop: string]: string } | null = null,
    tags: { [prop: string]: string } | TagsProps | null = null, // Remove the first part later, and only use TagsProps
    username: string | null = null
  ): void {
    // Setting tags, extra and username

    Sentry.configureScope((scope) => {
      // Always clear scope after capturing exception so the tags and extra don't appear in next exception also
      scope.clear()

      if (tags) {
        Object.keys(tags).forEach((key) => {
          scope.setTag(key, tags[key])
        })
      }

      if (extra) {
        Object.keys(extra).forEach((key, index) => {
          if (key === 'errorInfo') {
            // Special for errorInfo it has key values, mapping them to extra info
            Object.keys(extra[index]).forEach(
              (infoKey, infoKeyIndex) => {
                scope.setExtra(
                  infoKey,
                  extra[index][infoKeyIndex]
                )
              }
            )
          } else {
            scope.setExtra(key, extra[key])
          }
        })
      }

      if (username) {
        scope.setUser({ username })
      }
    })

    // Capturing exception with Browser Sentry which will report straight
    // to Sentry if the code is being executed in client.
    Sentry.captureException(error)
  }

  static addBreadcrumb(message: string): void {
    Sentry.addBreadcrumb({
      message,
    })
  }

  static captureMessage(
    message: string,
    extra: Array<string> | null = null,
    tags: Array<string> | null = null,
    username: string | null = null
  ): void {
    Sentry.configureScope((scope) => {
      if (tags) {
        Object.keys(tags).forEach((key, index) => {
          scope.setTag(key, tags[index])
        })
      }

      if (extra) {
        Object.keys(extra).forEach((key, index) => {
          if (key === 'errorInfo') {
            // Special for errorInfo it has key values, mapping them to extra info
            Object.keys(extra[index]).forEach(
              (infoKey, infoKeyIndex) => {
                scope.setExtra(
                  infoKey,
                  extra[index][infoKeyIndex]
                )
              }
            )
          } else {
            scope.setExtra(key, extra[index])
          }
        })
      }

      if (username) {
        scope.setUser({ username })
      }
    })
    Sentry.captureMessage(message)
  }

  static captureNetworkException(
    error: NetworkErrorModel,
    requestUrl: string,
    functionName: string
  ): void {
    const category = 'network-error'

    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      // console.log('data: ', error.response.data)
      // console.log('status: ', error.response.status)
      // console.log('headers:', error.response.headers)

      Logger.captureException(error, null, {
        category,
        functionName,
        functionDetail: 'error.response',
        message: 'Network error caught and got error.respone',
        httpStatusCode: error?.response?.status, // We know status code here.
        requestUrl,
      })
    } else if (error.request) {
      // console.log('ERROR.REQUEST')
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      // console.log('ERROR: ', error)
      // console.log('request: ', error.request)
      Logger.captureException(error, null, {
        category,
        functionName,
        functionDetail: 'error.request',
        message: 'Network error caught and did not get error.response',
        requestUrl,
      })
    } else {
      // Something happened in setting up the request and triggered an Error
      // console.log('Error: ', error.message)
      Logger.captureException(error, null, {
        category,
        functionName,
        functionDetail: 'error.else',
        message: error.message,
        requestUrl,
      })
    }
    // console.log(error.config)
  }
}

export default Logger

