import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import consoleLog from 'utils/logging/ConsoleLogger'

import Logger from 'utils/logging'
import { Section } from 'layouts'
import LanguageType from 'models/language-type'
import { ARTICLES_BY_TAG_QUERY } from './query'

interface Props {
    locale: LanguageType
    skip: number
    limit: number
    tag: string
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview }} = getConfig()

function ArticlesByTag({
    locale,
    skip,
    limit,
    tag,
    children,
}: Props): JSX.Element {
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'
    // if (preview) fetchPolicy = 'no-cache' // Disable cache in preview mode.
    consoleLog('fetch policy:', fetchPolicy)

    // return (
    //     <Query
    //       query={ARTICLES_BY_TAG_QUERY}
    //       fetchPolicy={fetchPolicy}
    //       variables={{ locale, skip, limit, tag, preview }}
    //     >
    //         {({ loading, error, data }) => {
    //             if (loading) return <Section hasContent={false} spinnerSize={20} />
    //             if (error) {
    //                 Logger.captureException(error)
    //                 return ''
    //             }
    //             return children(data.articleCollection)
    //         }}
    //     </Query>
    // )

    const { loading, error, data } = useQuery(ARTICLES_BY_TAG_QUERY, {
        variables: { locale, skip, limit, tag, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.articleCollection) {
        dataToRender = data.articleCollection
    }

    if (loading && !dataToRender)
        return <Section hasContent={false} spinnerSize={20} />
    if (error) {
        Logger.captureException(error)
        return <></>
    }
    return children(dataToRender)
}

export default ArticlesByTag

