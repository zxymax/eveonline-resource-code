import React from 'react'
import { useQuery } from '@apollo/client'
import {
    parseISO,
    startOfYear,
    endOfYear,
    startOfMonth,
    endOfMonth,
} from 'date-fns'
import getConfig, { isServer } from 'config/web'
import Logger from 'utils/logging'
import consoleLog from 'utils/logging/ConsoleLogger'
import { Section } from 'layouts'
import LanguageType from 'models/language-type'
import { ARTICLES_ARCHIVE_QUERY } from './query'

interface Props {
    locale: LanguageType
    skip: number
    limit: number
    year: string
    month: string
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview }} = getConfig()

function ArticlesArchiveQuery({
    locale,
    skip,
    limit,
    year,
    month,
    children,
}: Props): JSX.Element {
    consoleLog('ArticlesArchiveQuery running!')
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'
    // if (preview) fetchPolicy = 'no-cache' // Disable cache in preview mode.
    consoleLog('- fetch policy:', fetchPolicy)

    let start = startOfYear(parseISO(year))
    let end = endOfYear(parseISO(year))

    if (month) {
        start = startOfMonth(parseISO(`${year}-${month}`))
        end = endOfMonth(parseISO(`${year}-${month}`))
    }

    const { loading, error, data } = useQuery(ARTICLES_ARCHIVE_QUERY, {
        variables: { locale, skip, limit, start, end, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.articleCollection && data.articleCollection.items) {
        dataToRender = data.articleCollection
    }

    if (loading && !dataToRender) {
        consoleLog('- Returning <Loading />')
        return <Section hasContent={false} spinnerSize={20} />
    }
    if (error) {
        consoleLog('- Returning ERROR')
        Logger.captureException(error)
        return <></>
    }
    consoleLog('- Returning actual data to render!')
    return children({ loading, ...dataToRender })
}

export default ArticlesArchiveQuery

