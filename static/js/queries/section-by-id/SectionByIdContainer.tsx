import React from 'react'
import { useQuery } from '@apollo/client'
import getConfig from 'config/web'
import Error from 'pages/error'
import consoleLog from 'utils/logging/ConsoleLogger'
import Logger from 'utils/logging'
import LanguageType from 'models/language-type'
import { SECTTION_BY_ID_QUERY } from './query'

interface Props {
    identifier: string
    locale: LanguageType
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview } } = getConfig()

function SectionByIdQuery({
    identifier,
    locale,
    children,
}: Props): JSX.Element {
    consoleLog('SectionByIdQuery running! identifier:', identifier)
    // console.log('preview', preview)
    const fetchPolicy = 'cache-first'

    consoleLog('- fetch policy:', fetchPolicy)

    const { loading, error, data } = useQuery(SECTTION_BY_ID_QUERY, {
        variables: { identifier, locale, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.sectionCollection && data.sectionCollection.items[0]) {
        ;[dataToRender] = data?.sectionCollection.items
        // dataToRender = data.sectionCollection.items[0]
    }

    if (loading && !dataToRender) {
        consoleLog('- Returning <Loading />')
        return <></>
    }
    if (error) {
        Logger.captureException(error)
        consoleLog('- Returning ERROR')
        return <Error />
    }

    consoleLog('- Returning actual data to render!: ', dataToRender)
    return <div>{children(dataToRender)}</div>
}

export default SectionByIdQuery

