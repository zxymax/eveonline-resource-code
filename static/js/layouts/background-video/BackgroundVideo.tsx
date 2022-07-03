import React, { useEffect, useRef } from 'react'
import { isSafari } from 'react-device-detect'
import { isClient } from 'config/web'
import style from './BackgroundVideo.module.scss'

interface Props {
    mp4?: string
    webm?: string
    poster?: string
    loop?: boolean
    fill?: boolean
    disableMobile?: boolean
    hideOnEnd?: boolean
    id?: string
}

const defaultProps = {
    mp4: '',
    webm: '',
    poster: '',
    loop: false,
    fill: false,
    disableMobile: true,
    hideOnEnd: false,
    id: '',
}

const BackgroundVideo = ({
    mp4,
    webm,
    poster,
    loop,
    fill,
    disableMobile,
    hideOnEnd,
    id,
}: Props): JSX.Element => {
    /**
     * @props
     * * poster: if poster is passed - an img is rendered in mobile
     * * fill: Use when video needs to stretch/cover 100% height (like on frontpage)
     *
     * @mobile
     * * Making sure we don't load video on mobile
     * * If poster is provided we render image on mobile
     * *
     */

    const video = useRef<HTMLVideoElement>(null)

    const onEnd = (): void => {
        if (video?.current) {
            video.current.src = ''
        }
    }

    const onPlay = (): void => {
        if (video?.current) {
            // Setting the poster when video has started playing
            // so that it will show when video has ended.
            // Add safari check first - otherwise it'll display blank screen
            if (!isSafari) video.current.poster = poster
        }
    }

    useEffect(() => {
        const videoRef = video.current
        if (hideOnEnd) {
            videoRef?.addEventListener('ended', onEnd)
            videoRef?.addEventListener('playing', onPlay)
        }

        return () => {
            videoRef?.removeEventListener('ended', onEnd)
            videoRef?.removeEventListener('playing', onPlay)
        }
    }, [video, disableMobile, hideOnEnd])

    if (isClient && disableMobile && window.innerWidth < 768) {
        return poster ? (
            <div className={style.poster}>
                <img src={poster} alt="" />
            </div>
        ) : null
    }

    return (
        <div className={style(style.bgVideo, { [style.fill]: fill })}>
            {isClient && (
                <video
                    ref={video}
                    playsInline
                    autoPlay
                    muted
                    preload="auto"
                    loop={loop}
                    poster={isSafari ? poster : ''}
                    id={id}
                >
                    {mp4 && <source src={mp4} type="video/mp4" />}
                    {webm && <source src={webm} type="video/webm" />}
                </video>
            )}
        </div>
    )
}

BackgroundVideo.defaultProps = defaultProps

export default BackgroundVideo

