import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'

interface Props {
    policy: SectionType
}

export default function Policies({ policy }: Props): JSX.Element {
    if (policy) {
        return (
            <article>
                <p>{policy.headline}</p>
                <ReactMarkdown source={policy.body} />
            </article>
        )
    }
}

