import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import Logger from 'utils/logging'
import consoleLog from 'utils/logging/ConsoleLogger'
import { Loading } from 'layouts'
import { ARTICLE_BY_SLUG_QUERY } from './query'

interface Props {
    slug: string
    locale: string
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview } } = getConfig()

function ArticleBySlugQuery({ slug, locale, children }: Props): JSX.Element {
    consoleLog('ArticleBySlugQuery running!, slug: ', slug)
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'
    // if (preview) fetchPolicy = 'no-cache' // Disable cache in preview mode.
    consoleLog('- fetchPolicy: ', fetchPolicy)

    const query = ARTICLE_BY_SLUG_QUERY

    const { loading, error, data } = useQuery(query, {
        variables: { slug, locale, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.articleCollection && data.articleCollection.items[0]) {
        ;[dataToRender] = data?.articleCollection.items // This does the same as below except fulfills destructuring rule. Still not sure this is more readable :(
        // dataToRender = data.articleCollection.items[0]
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
        consoleLog('- Returning ERROR')
        Logger.captureException(error)
        return <></>
    }
    consoleLog('- Returning actual data to render!')
    return children(dataToRender)
}

export default ArticleBySlugQuery

