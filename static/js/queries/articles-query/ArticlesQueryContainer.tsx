import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import consoleLog from 'utils/logging/ConsoleLogger'
import Logger from 'utils/logging'
import { Loading } from 'layouts'
import LanguageType from 'models/language-type'
import { ARTICLES_QUERY } from './query'

interface Props {
    locale: LanguageType
    limit: number
    tagsToExclude: Array<string>
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview }} = getConfig()

function ArticlesQuery({
    locale,
    limit,
    tagsToExclude,
    children,
}: Props): JSX.Element {
    consoleLog('ArticlesQuery running!')

    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'
    // if (preview) fetchPolicy = 'no-cache' // Disable cache in preview mode.
    consoleLog('- fetchPolicy: ', fetchPolicy)

    const query = ARTICLES_QUERY

    const { loading, error, data } = useQuery(query, {
        variables: { locale, limit, tagsToExclude, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.articleCollection && data.articleCollection.items) {
        dataToRender = data.articleCollection.items
    }

    consoleLog('- LOADING is', loading)
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

export default ArticlesQuery

