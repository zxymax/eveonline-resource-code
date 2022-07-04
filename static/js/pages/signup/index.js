import React from 'react'
import { useSelector } from 'react-redux'
import { Translate } from 'react-localize-redux'
import PageWithSeo from 'features/page-with-seo'
import Loading from 'layouts/loading/PageLoading'
import { isClient } from 'config/web'
// import Signup from './Signup'

let LoadableComponent

if (isClient) {
    LoadableComponent = React.lazy(() =>
        import(/* webpackChunkName: "page-signup" */ './Signup')
    )
}

function renderPageWithSeo(translate, location, props) {
    // General Signup or Recruit Signup

    let page

    if (location && location.query && location.query.invc) {
        const image =
            'https://web.ccpgamescdn.com/aws/eveonline/images/recruit-signup-meta.jpg'

        page = {
            metaTitle: translate('signup.metaTitle'),
            metaDescription: translate('signup.meta'),
            metaImage: image,
            robots: 'noindex',
        }
    } else {
        // General Signup meta
        const image =
            'https://web.ccpgamescdn.com/secure/images/2018/SocialShare/signup-meta-image.jpg'

        page = {
            metaTitle: translate('signup.metaTitleGeneral'),
            metaDescription: translate('signup.metaDescriptionGeneral'),
            metaImage: image,
        }
    }

    return (
        <PageWithSeo page={page} showLoading={false} hideSitename>
            {isClient && (
                <React.Suspense fallback={<Loading />}>
                    <LoadableComponent {...props} />
                </React.Suspense>
            )}
        </PageWithSeo>
    )
}

export default function LoadableSignup(props) {
    const location = useSelector((state) => state.location)
    return (
        <Translate>
            {({ translate }) => renderPageWithSeo(translate, location, props)}
        </Translate>
    )
}

