import React from 'react'
import { Helmet } from 'react-helmet-async'
import NewsType from 'models/types/ts/newsType'

interface Props {
    newsItem: NewsType
}

const escapeDoubleQuotes = (text: string): string => {
    if (text) {
        // This regular expression, intimidating as it looks, will replace " with \" in string.
        return text.replace(/"/g, '\\"')
    }
    return ''
}

const NewsStructuredData = ({ newsItem }: Props): JSX.Element => {
    const scriptInnerHTML = `
        [{
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.eveonline.com/news/view/${newsItem.slug}"
            },
            "headline": "${escapeDoubleQuotes(newsItem.title)}",
            "image": ["${
                newsItem.metaImageUrl &&
                newsItem.metaImageUrl.url &&
                newsItem.metaImageUrl.url
            }"],
            "datePublished": "${newsItem.publishingDate}",
            "dateModified": "${newsItem.sys.publishedAt}",
            "author": {
                "@type": "Person",
                "name": "${newsItem.author}"
            },
            "publisher": {
                "@type": "Organization",
                "name": "CCP Games",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://web.ccpgamescdn.com/eveonlineassets/eveonline.png"
                  }
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "EVE Online",
              "item": "https://www.eveonline.com"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "News",
              "item": "https://www.eveonline.com/news"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "${escapeDoubleQuotes(newsItem.title)}"
            }]
        }]`

    const script = [{ type: 'application/ld+json', innerHTML: scriptInnerHTML }]

    return <Helmet script={script} />
}

export default NewsStructuredData

