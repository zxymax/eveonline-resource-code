import { Scope } from '@sentry/react'
import { environment, nodeenvironment, isServer } from 'config/web'
import paths from '../paths'

function setScope(scope: Scope): void {
    const executionEnvironment = isServer ? 'server' : 'client'
    scope.setTag('react_app_environment', environment)
    scope.setTag('node_environment', nodeenvironment)
    scope.setTag('domain', paths.webBaseUrl)
    scope.setTag('execution_environment', executionEnvironment)
    scope.setTag('error_boundary', false)
}

export default setScope
