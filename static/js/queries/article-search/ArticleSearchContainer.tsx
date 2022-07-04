import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import Logger from 'utils/logging'
import LanguageType from 'models/language-type'
import { ARTICLES_SEARCH_QUERY } from './query'

interface Props {
    locale: LanguageType
    skip: number
    limit: number
    query: string
    children: (props: unknown) => React.ReactElement
}

const { contentful : { preview } } = getConfig()

function ArticlesSearch({
    locale,
    skip,
    limit,
    query,
    children,
}: Props): JSX.Element {
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'

    const { loading, error, data } = useQuery(ARTICLES_SEARCH_QUERY, {
        variables: { locale, skip, limit, query, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.articleCollection) {
        dataToRender = data.articleCollection
    }

    // console.log('data to render', dataToRender)

    // if (loading) return <Section hasContent={false} spinnerSize={20} />
    if (error) {
        Logger.captureException(error)
        return <></>
    }

    return children({ loading, dataToRender })
}

export default ArticlesSearch

