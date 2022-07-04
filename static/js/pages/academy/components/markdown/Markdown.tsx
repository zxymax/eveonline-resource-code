import React from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import PageLocationType from 'models/page-location-type'
import { getLocationPayload } from 'lib/location/selectors'
import getInternalLinkPath from 'lib/link'
import { Link } from 'features'

interface Props {
    content: string
}

const Markdown = ({ content }: Props): JSX.Element => {
    const location: PageLocationType = useSelector((state) =>
        getLocationPayload(state)
    )

    const renderLink = (
        children: React.ReactNode,
        href: string
    ): JSX.Element => {
        if (href.indexOf(location?.page) === 0) {
            // eslint-disable-next-line
            return <Link path={getInternalLinkPath(href)}>{children}</Link>
        }

        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        )
    }
    return (
        <ReactMarkdown
            source={content}
            renderers={{
                link: ({ children, href }) => renderLink(children, href),
            }}
            escapeHtml={false}
        />
    )
}
export default Markdown
