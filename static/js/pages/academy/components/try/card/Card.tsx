import React from 'react'
import ReactMarkdown from 'react-markdown'
import ContentType from 'models/types/ts/contentType'
import { ImageLazyLoad } from 'features'
import { EasyIcon, MediumIcon, HardIcon } from '../../icons'
import style from './Card.module.scss'

interface Props {
    content: ContentType
}

const CardEmpty = ({ content }: Props): JSX.Element => {
    function getCorrectIcon(level: string): JSX.Element {
        switch (level) {
            case 'easy':
                return <EasyIcon />
            case 'medium':
                return <MediumIcon />
            case 'hard':
                return <HardIcon />
            default:
                return <></>
        }
    }

    return (
        <div className={style.card}>
            {content && content.imageFile && (
                <>
                    <div className={style.imgWrapper}>
                        <ImageLazyLoad
                            image={content?.imageFile}
                            param="?w=410&h=247&fm=jpg&fl=progressive&q=80&fit=fill"
                            lazyloadProps={{
                                height: 247,
                                offset: 200,
                                once: true,
                            }}
                        />
                    </div>
                    <div className={style.content}>
                        <div className={style.deco}>
                            {getCorrectIcon(content.headline)}
                        </div>

                        <ReactMarkdown
                            source={content.body}
                            escapeHtml={false}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default CardEmpty
