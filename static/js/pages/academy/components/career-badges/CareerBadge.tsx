import React, { useState, useRef } from 'react'
import ContentType from 'models/types/ts/contentType'
import { ImageLazyLoad, Link } from 'features'
import { HeadingXSmall } from 'layouts/typography'
import Arrow from '../arrow'
import style from './CareerBadges.module.scss'

interface BadgeProps {
    item: ContentType
    itemUrl: string
}

const CareerBadge = ({ item, itemUrl }: BadgeProps): JSX.Element => {
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const play = (): void => {
        setPlaying(true)
        if (videoRef.current) videoRef.current.play()
    }

    const pause = (): void => {
        setPlaying(false)
        // use promise to prevent this bug:
        // Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
        const playPromise = videoRef.current.play()
        if (playPromise) {
            playPromise
                .then(() => {
                    videoRef.current.pause()
                })
                .catch((error) => console.log('error', error))
        }
    }

    return (
        <div
            className={style(style.item, { [style.active]: playing })}
            onMouseOver={play}
            onMouseOut={pause}
            onFocus={play}
            onBlur={pause}
        >
            <Link url={itemUrl}>
                <div className={style.image}>
                    {item.imageFile && (
                        <ImageLazyLoad
                            image={item?.imageFile}
                            param="?w=300&h=420&fm=jpg&fl=progressive&q=80&fit=fill"
                            lazyloadProps={{
                                height: 420,
                                offset: 200,
                                once: true,
                            }}
                        />
                    )}
                    {item.image && (
                        <video
                            preload="none"
                            ref={videoRef}
                            loop
                            muted
                            className={style.video}
                        >
                            <source src={item.image} type="video/webm" />
                        </video>
                    )}
                </div>
                <HeadingXSmall>{item.headline}</HeadingXSmall>
                <div className={style.paragraph}>
                    {item.body}
                    <Arrow />
                </div>
            </Link>
        </div>
    )
}

export default CareerBadge
