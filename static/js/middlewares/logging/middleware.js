import Sentry from 'config/sentry'

const createLoggingMiddleware = () => (store) => (next) => (action) => {
    // console.log('Sentry logging happening. Action: ', action)

    // Adds the action type to breadcrumb if an error is caught later.
    Sentry.addBreadcrumb({
        message: action.type,
        category: 'redux.action',
        type: 'navigation',
    })

    return next(action)
}

export default createLoggingMiddleware
