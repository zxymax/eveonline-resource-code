import * as Sentry from '@sentry/react'
import sentryInit from './sentryInit'
import setScope from './sentryScope'

// console.log('Initializing Browser Sentry.')

Sentry.init(sentryInit)

Sentry.configureScope((scope) => setScope(scope))

export default Sentry
