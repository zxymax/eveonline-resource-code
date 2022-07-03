import React, { ReactNode } from 'react'
import { SEO } from 'features'
import Loading from 'layouts/loading/PageLoading'
import getMetadata from 'selectors/metadata'
import PageType from 'models/types/ts/pageType'

interface Props {
    children: ReactNode
    page: PageType
    showLoading: boolean
    // eslint-disable-next-line react/require-default-props
    hideSitename?: boolean
}

export default function PageWithSeo({
    children,
    page,
    showLoading,
    hideSitename = false,
}: Props): JSX.Element {
    const { title, description, image, robots } = getMetadata(page)

    return (
        <>
            <SEO
                title={title}
                description={description}
                image={image}
                hideSitename={hideSitename}
                robots={robots}
            />
            {showLoading ? <Loading /> : <>{children}</>}
        </>
    )
}

