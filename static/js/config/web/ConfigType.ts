export const environment = process.env.REACT_APP_ENV
export const nodeenvironment = process.env.NODE_ENV
export const host = process.env.HOST
export const isServer = typeof window === 'undefined'
export const isClient = !isServer
export const isLocal = environment === 'local'
export const isDevelopment = environment === 'development'
export const isStaging = environment === 'staging'
export const isProduction = environment === 'production'
export const isPreProduction = environment === 'preprod'
export const isPreview = environment === 'preview'
