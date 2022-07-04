import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import { FeatureVideo } from 'features'
import { ThemeContext } from '../../context'
import { getImage } from '../../helpers'
import style from './YTVideo.module.scss'

interface Props {
    section: SectionType
}

const YTVideo = ({ section }: Props): JSX.Element => {
    return (
        <ThemeContext.Consumer>
            {(colorTheme) => (
                <div className={style.wrapper} id={section.identifier}>
                    {section.headline && (
                        <ReactMarkdown source={section.headline} />
                    )}
                    <FeatureVideo
                        videoId={section.videoId}
                        image={getImage(section.imageFile)}
                    />
                    {section.body && (
                        <ReactMarkdown
                            source={section.body}
                            renderers={{
                                link: ({ children, href }) => (
                                    <a
                                        style={{ color: colorTheme.link }}
                                        href={href}
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        />
                    )}
                </div>
            )}
        </ThemeContext.Consumer>
    )
}

export default YTVideo
