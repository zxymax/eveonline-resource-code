import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import consoleLog from 'utils/logging/ConsoleLogger'
import Error from 'pages/error'
import Logger from 'utils/logging'
import { Loading } from 'layouts'
import LanguageType from 'models/language-type'
import { PAGE_BY_SLUG_QUERY } from './query'

interface Props {
    slug: string
    locale: LanguageType
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview }} = getConfig()


function PageBySlugQuery({ slug, locale, children }: Props): JSX.Element {
    consoleLog('PageBySlugQuery running! slug:', slug)

    // // New way, uses hooks but ssr meta stuff does not work.
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'
    // const fetchPolicy = 'network-only'
    // if (preview) fetchPolicy = 'no-cache' // Disable cache in preview mode.
    consoleLog('- fetch policy:', fetchPolicy)

    const { loading, error, data } = useQuery(PAGE_BY_SLUG_QUERY, {
        variables: { slug, locale, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    // console.log('loading: ', loading)
    // console.log('error: ', error)
    // console.log('data: ', data)

    let dataToRender
    if (data && data.pageCollection && data.pageCollection.items[0]) {
        ;[dataToRender] = data?.pageCollection.items
        // dataToRender = pageCollection.items[0]
    }

    consoleLog('- LOADING is ', loading)
    if (dataToRender) {
        consoleLog('- dataToRender is SOMETHING')
    } else {
        consoleLog('- dataToRender is NOTHING')
    }

    if (loading && !dataToRender) {
        consoleLog('- Returning <Loading />')
        return <Loading />
    }
    if (error) {
        Logger.captureException(error)
        consoleLog('- Returning ERROR')
        return <Error />
    }

    consoleLog('- Returning actual data to render!', dataToRender)
    return <div>{children(dataToRender)}</div>
}

export default PageBySlugQuery

