import React from 'react'
import ReactTooltip from 'react-tooltip'
import { ParagraphRegular } from 'layouts/typography'
import ContentType from 'models/types/ts/contentType'
import { ImageLazyLoad, Link } from 'features'
import SmallIconEnumType from '../../models/small-icon-enum'
import SmallIcons from '../icons/small-icons'
import IconWithBackground from '../icons/icon-with-background'
import Arrow from '../arrow'

import style from './Card.module.scss'

interface Props {
    content: ContentType
    itemUrl: string
}

interface Icon {
    icon?: SmallIconEnumType
    text?: string
}

interface Icons {
    icons: Array<Icon>
}

const Card = ({ content, itemUrl }: Props): JSX.Element => {
    const icons = (content?.data as Icons)?.icons as Array<Icon>

    const getIcon = (item: Icon | SmallIconEnumType): SmallIconEnumType => {
        // icon can be either object or string
        return typeof item === 'string' ? item : item.icon
    }

    return (
        <div className={style.card}>
            {content && content.imageFile && (
                <Link url={itemUrl}>
                    <div className={style.imgWrapper}>
                        {content.buttonText && (
                            <div className={style.plan}>
                                {content.buttonText}
                            </div>
                        )}
                        {icons && (
                            <div className={style.iconContainer}>
                                {icons.map((item, key) => (
                                    <IconWithBackground
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={key}
                                        className={style.icon}
                                        tooltip={item.text}
                                    >
                                        <SmallIcons icon={getIcon(item)} />
                                    </IconWithBackground>
                                ))}
                            </div>
                        )}
                        <ImageLazyLoad
                            image={content?.imageFile}
                            param="?w=410&h=230&fm=jpg&fl=progressive&q=80&fit=fill"
                            lazyloadProps={{
                                height: 230,
                                offset: 200,
                                once: true,
                            }}
                        />
                    </div>
                    <div className={style.content}>
                        <ParagraphRegular>{content.headline}</ParagraphRegular>
                        <h4>
                            {content.body}
                            <Arrow />
                        </h4>
                    </div>
                </Link>
            )}
            <ReactTooltip
                place="top"
                type="light"
                effect="solid"
                aria-haspopup="true"
                multiline
            />
        </div>
    )
}

export default Card
