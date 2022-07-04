import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import consoleLog from 'utils/logging/ConsoleLogger'
import Error from 'pages/error'
import Logger from 'utils/logging'
import NewsContentType from 'types/news/NewsContentType'
import { Loading } from 'layouts'
import { PAGE_NEWS_CONTENT_QUERY } from './query'

interface Props {
    locale: string
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview }} = getConfig()

function PageNewsContentQuery({ locale, children }: Props): JSX.Element {
    // // New way, uses hooks but ssr meta stuff does not work.
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'

    consoleLog('- fetch policy:', fetchPolicy)

    const { loading, error, data } = useQuery(PAGE_NEWS_CONTENT_QUERY, {
        variables: { locale, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data) {
        dataToRender = data
    }

    if (loading && !dataToRender) {
        return <Loading />
    }
    if (error) {
        Logger.captureException(error)
        return <Error />
    }

    // We can control better here how the data is structured, we don't need all the stuff, just get it here and set on return model
    const ret: NewsContentType = {
        page: dataToRender?.page,
        tags: dataToRender?.tags?.contentItemCollection?.items,
        featured: dataToRender?.featured,
        latestPatchNotes:
            dataToRender?.latestPatchNotes?.items?.length === 1 &&
            dataToRender?.latestPatchNotes?.items[0],
    }
    return <div>{children(ret)}</div>
}

export default PageNewsContentQuery

