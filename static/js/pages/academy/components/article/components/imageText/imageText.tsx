import React from 'react'
import LazyLoad from 'react-lazyload'
import ContentType from 'models/types/ts/contentType'
import ImageType from 'models/types/ts/imageType'
import { FeatureVideo, ImageLazyLoad } from 'features'
import Markdown from '../../../markdown'
import style from './imageText.module.scss'

interface Props {
    content: ContentType
}

interface VideoData {
    videoUrl: string
}

const renderImage = (image: ImageType): JSX.Element => {
    return (
        <div className={style.img}>
            <ImageLazyLoad
                className={style.img}
                image={image}
                param="?w=850&fl=progressive"
                lazyloadProps={{
                    height: 350,
                    offset: 300,
                    once: true,
                }}
            />
        </div>
    )
}

const renderVideo = (video: VideoData): JSX.Element => {
    const fileType = video.videoUrl.split('.').pop()
    return (
        <LazyLoad height={478} offset={400} once>
            <video playsInline controls autoPlay muted loop width="100%">
                <source src={video.videoUrl} type={`video/${fileType}`} />
            </video>
        </LazyLoad>
    )
}

const ImageText = ({ content }: Props): JSX.Element => {
    return (
        <div key={content.sys.id} className={style.card}>
            <div className={style.imgWrapper}>
                {content.data
                    ? renderVideo(content.data as VideoData)
                    : content.imageFile && renderImage(content.imageFile)}
            </div>
            <div className={style.content}>
                <Markdown content={content?.body} />
                {content.buttonText && content.buttonUrl && (
                    <FeatureVideo
                        videoId={content.buttonUrl}
                        subTitle=""
                        isButton
                        isHexagonButton
                        title={content.buttonText}
                        className={style.btn}
                    />
                )}
            </div>
        </div>
    )
}

export default ImageText
