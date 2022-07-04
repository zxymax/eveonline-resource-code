import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { onError } from '@apollo/client/link/error'
import getConfig, { isServer } from 'config/web'

import consoleLog from 'utils/logging/ConsoleLogger'

const { contentful: { graphqlBaseUrl, environment, spaceId, accessToken } } = getConfig()
// console.log('isServer', isServer)

const cache = isServer
    ? new InMemoryCache() // Default cache on server
    : new InMemoryCache().restore(window.APOLLO_STATE) // restore data from server on client, much faster

const retryLink = new RetryLink() // Using default config for RetryLink. Tries 5 times with random short delay.

const logLink = new ApolloLink((operation, forward) => {
    consoleLog(
        '||---> ApolloLink starting!, operation.operationName: ',
        operation.variables
    )
    consoleLog(
        '||---> ApolloLink !, operation.variables: ',
        operation.variables
    )
    // console.time(operation.operationName)
    const fw = forward(operation).map((result) => {
        // console.timeLog(operation.operationName)
        consoleLog('|||| ApolloLink result ||||', result)
        return result
    })
    // console.timeEnd(operation.operationName)

    return fw
})

// console.log('Creating new Apollo Client on', isServer ? 'server' : 'client')
const client = new ApolloClient({
    ssrMode: isServer,
    link: ApolloLink.from([
        logLink,
        retryLink,
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                )
            }
            if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        new HttpLink({
            uri: `${graphqlBaseUrl}/spaces/${spaceId}/environments/${environment}`,
            credentials: 'same-origin',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }),
    ]),
    cache,
    // cache: new InMemoryCache({ fragmentMatcher }),
})

function getApolloContentfulClient() {
    return client
}

export default getApolloContentfulClient

