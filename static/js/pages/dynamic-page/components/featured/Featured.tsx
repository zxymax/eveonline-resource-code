import React, { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { pushClickEventToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import SectionType from 'models/types/ts/sectionType'
import Picture from 'features/picture'
import { HeadingRegular } from 'layouts/typography'
import Link from '../shared/link'
import { getImage } from '../../helpers'
import { ThemeContext, LocationContext } from '../../context'
import style from './Featured.module.scss'

interface Props {
    section: SectionType
}

const Featured = ({ section }: Props): JSX.Element => (
    <div className={style.featured}>
        <div className={style.wrapper}>
            {section.body && (
                <div className={style.content}>
                    <div className={style.inner}>
                        <ThemeContext.Consumer>
                            {(colorTheme) => (
                                <LocationContext.Consumer>
                                    {(location) => (
                                        <ReactMarkdown
                                            source={section.body}
                                            escapeHtml={false}
                                            renderers={{
                                                heading: ({
                                                    children,
                                                    level,
                                                }) =>
                                                    createElement(
                                                        `h${level}`,
                                                        {
                                                            style: {
                                                                color:
                                                                    colorTheme
                                                                        .featuredTemplate
                                                                        .headline,
                                                            },
                                                        },
                                                        <HeadingRegular>
                                                            {children}
                                                        </HeadingRegular>
                                                    ),
                                                link: ({ children, href }) => (
                                                    <Link
                                                        href={href}
                                                        color={
                                                            colorTheme
                                                                .featuredTemplate
                                                                .link
                                                        }
                                                        onClick={() =>
                                                            pushClickEventToDataLayer(
                                                                'Button click',
                                                                `page: ${location}, url: ${href}`
                                                            )
                                                        }
                                                    >
                                                        {children}
                                                    </Link>
                                                ),
                                            }}
                                        />
                                    )}
                                </LocationContext.Consumer>
                            )}
                        </ThemeContext.Consumer>
                    </div>
                </div>
            )}
            <Picture src={getImage(section.imageFile)} alt="" />
        </div>
    </div>
)

export default Featured
