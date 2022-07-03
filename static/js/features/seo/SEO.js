import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import _endsWith from 'lodash/endsWith'
import _startsWith from 'lodash/startsWith'
import { getLanguages } from 'selectors'
import getConfig from 'config/web'

const { webBaseUrl } = getConfig()

const sitename = 'EVE Online'
// const getTitleWithPrefix = title => `${title}`
const getTitleWithAppendedSitename = (title, hideSitename) => {
    if (hideSitename) return title
    return `${title} | ${sitename}`
}
const seoImageURL = (image) =>
    _startsWith(image, '//') ? `https:${image}` : image
const seoURL = (path, search) => {
    let url = `${webBaseUrl}${path}`
    if (search) {
        url += `?${search}`
    }

    return url
}

// Special for override canonical urls, starting on news.
const overrideCanonical = (pathname) => {
    let override = pathname

    if (pathname.includes('articles/news'))
        override = pathname.replace('articles/news', 'news')
    if (pathname.includes('articles/dev-blogs'))
        override = pathname.replace('articles/dev-blogs', 'news')
    if (pathname.includes('articles/patch-notes'))
        override = pathname.replace(
            'articles/patch-notes',
            'news/t/patch-notes'
        )

    return removeTrailingSlash(override)
}

const removeTrailingSlash = (pathname) =>
    _endsWith(pathname, '/') ? pathname.slice(0, -1) : pathname

// Get languages and map
const getHrefLangs = (hrefLangPath, search) =>
    getLanguages().map((lang) => ({
        rel: 'alternate',
        hrefLang: lang,
        href: seoURL(
            `${lang === 'en' ? '' : `/${lang}`}${removeTrailingSlash(
                hrefLangPath
            )}`,
            search
        ),
    }))

const getMetaTags = ({
    title,
    description,
    url,
    contentType,
    published,
    updated,
    category,
    robots,
    tags,
    image,
    imageWidth,
    imageHeight,
    hideSitename,
}) => {
    const metaTags = [
        { property: 'og:url', content: url },
        { property: 'og:site_name', content: sitename },
    ]

    if (title) {
        metaTags.push({
            itemprop: 'name',
            content: getTitleWithAppendedSitename(title, hideSitename),
        })
        metaTags.push({
            property: 'og:title',
            content: getTitleWithAppendedSitename(title, hideSitename),
        })
    }
    if (description) {
        metaTags.push({ name: 'description', content: description })
        metaTags.push({ itemprop: 'description', content: description })
        metaTags.push({ property: 'og:description', content: description })
    }
    if (image) {
        metaTags.push({ itemprop: 'image', content: seoImageURL(image) })
        metaTags.push({ property: 'og:image', content: seoImageURL(image) })
        metaTags.push({
            property: 'og:image:width',
            content: imageWidth,
        })
        metaTags.push({
            property: 'og:image:height',
            content: imageHeight,
        })
        metaTags.push({ name: 'twitter:card', content: 'summary_large_image' })
    }
    if (contentType)
        metaTags.push({ property: 'og:type', content: contentType })
    if (published)
        metaTags.push({ name: 'article:published_time', content: published })
    if (updated)
        metaTags.push({ name: 'article:modified_time', content: updated })
    if (category) metaTags.push({ name: 'article:section', content: category })
    if (tags) metaTags.push({ name: 'article:tag', content: tags })
    if (robots) metaTags.push({ name: 'robots', content: robots })

    return metaTags
}

const SEO = ({
    schema,
    title,
    description,
    pathname,
    search,
    hrefLangPath,
    contentType,
    published,
    updated,
    category,
    robots,
    tags,
    image,
    imageWidth,
    imageHeight,
    hideSitename,
}) => (
    <Helmet
        htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${schema}`,
        }}
        title={getTitleWithAppendedSitename(title, hideSitename)}
        //   titleTemplate={`${sitename} - %s`}
        link={[
            {
                rel: 'canonical',
                href: seoURL(overrideCanonical(pathname)),
            },
            ...getHrefLangs(overrideCanonical(hrefLangPath)),
        ]}
        meta={getMetaTags({
            title,
            description,
            contentType,
            url: seoURL(pathname, search),
            published,
            updated,
            category,
            robots,
            tags,
            image,
            imageWidth,
            imageHeight,
            hideSitename,
        })}
    />
)

SEO.propTypes = {
    schema: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hrefLangPath: PropTypes.string,
    image: PropTypes.string,
    contentType: PropTypes.string,
    published: PropTypes.string,
    updated: PropTypes.string,
    category: PropTypes.string,
    robots: PropTypes.string,
    tags: PropTypes.array, // eslint-disable-line
    imageWidth: PropTypes.string,
    imageHeight: PropTypes.string,
    hideSitename: PropTypes.bool,
}

SEO.defaultProps = {
    imageWidth: '1200',
    imageHeight: '630',
    hideSitename: false,
}

export default SEO

