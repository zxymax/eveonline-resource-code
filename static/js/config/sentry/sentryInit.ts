import { BrowserOptions } from '@sentry/react'
import { Dedupe as DedupeIntegration } from '@sentry/integrations'
import { environment } from 'config/web'
import paths from '../paths'
import release from '../version'
import { allowUrls, denyUrls, ignoreErrors } from './sentryOptions'

const dsn = paths.sentryDsn

const sentryInit: BrowserOptions = {
    dsn,
    environment,
    release,
    allowUrls,
    ignoreErrors,
    denyUrls,
    beforeBreadcrumb(crumb) {
        if (crumb.category === 'console') {
            // hint.input === raw arguments passed to console calls
            // do anything to them, parse, stringify, whatever

            // Clearing data for now because it can be too large.
            crumb.data = null
        }
        return crumb
    },
    integrations: [new DedupeIntegration()],
}

export default sentryInit
