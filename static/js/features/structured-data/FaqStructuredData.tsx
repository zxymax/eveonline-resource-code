import React from 'react'
import { Helmet } from 'react-helmet-async'
import ContentType from 'models/types/ts/contentType'
import _map from 'lodash/map'

interface Props {
    items: Array<ContentType>
}

export default function FaqStructured({ items }: Props): JSX.Element {
    const getFaqStructured = _map(
        items,
        (item: ContentType) => `{
            "@type": "Question",
            "name": "${item.headline}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${item.body}"
            }
          }`
    )

    const scriptInnerHTML = `
    {
        "@context": "http://schema.org",
        "@type": "FAQPage",
        "mainEntity": [${getFaqStructured}]
    }
    `

    const script = [{ type: 'application/ld+json', innerHTML: scriptInnerHTML }]

    return <Helmet script={script} />
}
