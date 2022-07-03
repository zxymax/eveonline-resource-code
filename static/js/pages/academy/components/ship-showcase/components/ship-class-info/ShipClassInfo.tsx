import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import style from './ShipClassInfo.module.scss'

interface Props {
    body: string // Markdown with only paragraph allowed
    changing: boolean
}

export default function ShipClassInfo({ body, changing }: Props): JSX.Element {
    return (
        <div
            className={style(style.shipClassInfo, {
                [style.changing]: changing,
            })}
        >
            <ReactMarkdown
                source={body}
                escapeHtml={false}
                className={style.content}
                disallowedTypes={['heading', 'table']}
                renderers={{
                    paragraph: ({ children }) => <p>{children}</p>,
                }}
            />
        </div>
    )
}
