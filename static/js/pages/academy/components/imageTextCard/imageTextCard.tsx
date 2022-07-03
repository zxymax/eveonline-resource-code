import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { ImageLazyLoad } from 'features'
import { HeadingUnderline2 } from 'layouts/headings'
import Markdown from '../markdown'

import style from './imageTextCard.module.scss'

interface Props {
    section: SectionType
    // urlPrefix: string
}

const ImageTextCard = ({ section }: Props): JSX.Element => {
    const {
        headline,
        contentCollection: { total, items },
    } = section
    const firstItem = items[0]
    return (
        <>
            <HeadingUnderline2 title={headline} subTitle="" color="#BA1F7E" />
            <div className={style.card}>
                {total > 0 && firstItem.body && firstItem.imageFile && (
                    <>
                        <div className={style.imgWrapper}>
                            <ImageLazyLoad
                                image={firstItem?.imageFile}
                                param="?w=850&h=477&fm=jpg&fl=progressive&q=80&fit=fill"
                                lazyloadProps={{
                                    height: 477,
                                    offset: 200,
                                    once: true,
                                }}
                            />
                        </div>
                        <div className={style.content}>
                            <Markdown content={firstItem.body} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ImageTextCard
