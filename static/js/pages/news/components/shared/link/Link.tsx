import React, { ReactNode } from 'react'
import { Link } from 'features'

interface Props {
    children: ReactNode
    slug: string
    path?: string
}

const NewsLink: React.FunctionComponent<Props> = ({
    children,
    slug,
    path = null,
}): JSX.Element => {
    // Path can be overwritten if needed and then it will be a full postback link.
    // Example path: /article/some-article-slug
    if (path) {
        return <a href={path}>{children}</a>
    }

    return (
        <Link path={{ page: 'news', subpage: 'view', id: slug }}>
            {children}
        </Link>
    )
}

export default NewsLink

