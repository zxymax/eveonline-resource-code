import React from 'react'
import { isClient } from 'config/web'
import Loading from 'layouts/loading/PageLoading'

// * Added SEO in Monument sitemap for now. Move SEO logic here at some point.

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(() =>
        import(/* webpackChunkName: "page-monument" */ './Monument')
    )
}

export default function Page(props) {
    return (
        isClient && (
            <React.Suspense fallback={<Loading />}>
                <LoadableComponent {...props} />
            </React.Suspense>
        )
    )
}
