import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import Loading from 'layouts/loading/PageLoading'
import { isClient } from 'config/web'

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(() =>
        import(/* webpackChunkName: "page-signup-verify" */ './SignupVerify')
    )
}

export default function LoadableSignupVerify(props) {
    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            {isClient && (
                <React.Suspense fallback={<Loading />}>
                    <LoadableComponent {...props} />
                </React.Suspense>
            )}
        </>
    )
}

