import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import ContentType from 'models/types/ts/contentType'

// MOVE INTO DEEPER COMPONENT LATER
import SmallIcons from '../../../icons/small-icons'
import SmallIconEnum from '../../../../models/small-icon-enum'

import style from './ShipDisplay.module.scss'

interface Props {
    content: ContentType
    selectedShipClassIcon: SmallIconEnum
    changing: boolean
}

export default function ShipDisplay({
    content,
    selectedShipClassIcon,
    changing,
}: Props): JSX.Element {
    if (!content) return <></>

    return (
        <div className={style.shipDisplay}>
            <div className={style.imageContainer}>
                <img src={content?.imageFile?.url} alt="" />
            </div>
            <div
                className={style(style.contentContainer, {
                    [style.changing]: changing,
                })}
            >
                <ReactMarkdown
                    source={content.body}
                    escapeHtml={false}
                    className={style.content}
                    disallowedTypes={['paragraph']}
                    renderers={{
                        heading: ({ children, level }): JSX.Element =>
                            level === 2 ? (
                                <h2>{children}</h2>
                            ) : (
                                <div className={style.className}>
                                    <div className={style.icon}>
                                        <SmallIcons
                                            icon={selectedShipClassIcon}
                                        />
                                    </div>
                                    <h3>{children}</h3>
                                </div>
                            ),
                        table: ({ children }) => (
                            <div className={style.table}>
                                <table>{children}</table>
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    )
}
