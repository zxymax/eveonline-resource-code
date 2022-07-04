import React, { useState } from 'react'
import ContentType from 'models/types/ts/contentType'
import SectionType from 'models/types/ts/sectionType'
import { ParagraphLarge } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import { YouTube } from 'features'
import s from './Video.module.scss'

interface Props {
    section: SectionType
}

const Video = ({ section }: Props): JSX.Element => {
    const [videoStart, setVideoStart] = useState<number>(215)
    const {
        headline,
        videoId,
        teaser,
        contentCollection: { total, items },
    } = section

    const chapters = items.map((item: ContentType) => {
        return (
            <li
                key={item.name}
                className={s({ active: Number(item.body) === videoStart })}
                onClick={() => setVideoStart(Number(item.body))}
            >
                {item.headline}
            </li>
        )
    })

    return (
        <div className={s.video}>
            <div className={s.intro}>
                <HeadingUnderline2 title={headline} color="#30B2E6" />
                <ParagraphLarge>{teaser}</ParagraphLarge>
            </div>
            <div className={s.vidWrapper}>
                <div className={s.inner}>
                    <YouTube
                        playing={false}
                        videoId={videoId}
                        startSecond={videoStart}
                    />
                </div>
                <div className={s.chapters}>
                    <span>Chapters</span>
                    <ul>{total > 0 && chapters}</ul>
                </div>
            </div>
        </div>
    )
}

export default Video

