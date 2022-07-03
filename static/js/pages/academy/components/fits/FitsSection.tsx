import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import ContentType from 'models/types/ts/contentType'
import { FeatureVideo } from 'features'
import { ParagraphLarge } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import SectionProps from 'pages/academy/templates/SectionProps'
import { FitsModel } from './FitsModel'
import style from './fits.module.scss'
import FitsInfo from './FitsInfo'

const FitsSection = ({ section }: SectionProps): JSX.Element => {
    const [fitToShow, setFitToShow] = useState<ContentType>(null)
    const [fitsIndex, setFitsIndex] = useState<number>(0)
    const {
        headline,
        body,
        buttonText,
        videoId,
        contentCollection: { total, items },
    } = section

    const cx = classNames.bind(style)

    useEffect(() => {
        if (items) {
            setFitToShow(items[fitsIndex])
        }
    }, [fitsIndex])

    return (
        <div className={style.fitsContainer}>
            {headline && <HeadingUnderline2 title={headline} />}
            <ParagraphLarge className={style.desc}>{body}</ParagraphLarge>
            {videoId && buttonText && (
                <FeatureVideo
                    videoId={videoId}
                    subTitle=""
                    isButton
                    isHexagonButton
                    title={buttonText}
                    className={style.btn}
                />
            )}
            <ul className={style.tabs}>
                {total > 0 &&
                    items.map((item: ContentType, index) => {
                        const fitModel = item.data as FitsModel

                        return (
                            <li
                                key={item.name}
                                onClick={() => setFitsIndex(index)}
                                className={cx(style.item, {
                                    [style.current]: index === fitsIndex,
                                })}
                            >
                                <div>{fitModel.fitName}</div>
                            </li>
                        )
                    })}
            </ul>

            <div>
                {total > 0 && fitToShow && (
                    <>
                        <FitsInfo
                            key={fitToShow?.name}
                            title={fitToShow?.name}
                            image={fitToShow?.imageFile?.url}
                            body={fitToShow.body}
                            fits={fitToShow.data as FitsModel}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
export default FitsSection
