import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import consoleLog from 'utils/logging/ConsoleLogger'
import Logger from 'utils/logging'
import { Loading } from 'layouts'
import LanguageType from 'models/language-type'
import { ARTICLES_BY_CATEGORY_QUERY } from './query'

interface Props {
    locale: LanguageType
    limit: number
    category: string
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview }} = getConfig()

function ArticlesByCategory({
    locale,
    limit,
    category,
    children,
}: Props): JSX.Element {
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'
    // if (preview) fetchPolicy = 'no-cache' // Disable cache in preview mode.
    consoleLog('- fetch policy:', fetchPolicy)

    const { loading, error, data } = useQuery(ARTICLES_BY_CATEGORY_QUERY, {
        variables: { locale, limit, category, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.articleCollection && data.articleCollection.items) {
        dataToRender = data.articleCollection.items
    }

    if (loading && !dataToRender) return <Loading />
    if (error) {
        Logger.captureException(error)
        return <></>
    }
    return children(dataToRender)
}

export default ArticlesByCategory

