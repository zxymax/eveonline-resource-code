import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { FeatureVideo } from 'features'
import Markdown from '../../../markdown'
import style from './Content.module.scss'

interface Props {
    section: SectionType
    fluid?: boolean
}

const Content = ({ section, fluid = false }: Props): JSX.Element => {
    const { body, buttonText, videoId } = section
    return (
        <div className={style(style.content, { [style.fluid]: fluid })}>
            <div className={style.wrapper}>
                <div className={style.text}>
                    <Markdown content={body} />
                </div>
                {videoId && (
                    <div className={style.btn}>
                        <FeatureVideo
                            videoId={videoId}
                            isButton
                            isHexagonButton
                            title={buttonText}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

Content.defaultProps = {
    fluid: false,
}

export default Content
