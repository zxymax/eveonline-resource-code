import React from 'react'
import { ImageLazyLoad, Link } from 'features'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import ContentType from 'models/types/ts/contentType'
import { HeadingXSmall } from 'layouts/typography'
import Arrow from '../arrow'

import SectionProps from '../../templates/SectionProps'
import style from './contentCards.module.scss'

const ContenCards = ({ section, location }: SectionProps): JSX.Element => {
    const {
        contentCollection: { total, items },
    } = section

    const language = useSelector((state) => getLanguage(state))
    const url = location?.page ? `/${location.page}` : '' // Else empty prefix

    const urlPrefix = language !== 'en' ? `/${language}${url}` : `${url}`

    return (
        <div className={style.contentCards}>
            {total > 0 &&
                items.map((item: ContentType) => (
                    <div className={style.item} key={item.name}>
                        <Link url={urlPrefix + item.buttonUrl}>
                            <div className={style.image}>
                                {item.imageFile && (
                                    <ImageLazyLoad
                                        image={item?.imageFile}
                                        param="?w=630&h=354&fm=jpg&fl=progressive&q=80&fit=fill"
                                        lazyloadProps={{
                                            height: 354,
                                            offset: 200,
                                            once: true,
                                        }}
                                    />
                                )}
                            </div>
                            <HeadingXSmall>{item.headline}</HeadingXSmall>
                            <div className={style.paragraph}>
                                {item.body} <Arrow />
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    )
}

export default ContenCards
