import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { HeadingSmall, ParagraphLarge } from 'layouts/typography'
import { ImageLazyLoad } from 'features'
import classNames from 'classnames'
import Button from 'layouts/button'
import DownloadButton from 'features/DownloadButton'
import FrameContainer from '../container/FrameContainer'
import s from './SessionEnded.module.scss'

interface Props {
    section: SectionType
    showAsCards: boolean
}

const Content = ({ section, showAsCards }: Props): JSX.Element => {
    const {
        contentCollection: { total, items },
    } = section

    const wrapperClass = classNames(s.cards, {
        [s.offer]: showAsCards,
    })

    return (
        <div className={s.content}>
            <FrameContainer layoutWidth="wide">
                <HeadingSmall>{section.headline}</HeadingSmall>
                <ParagraphLarge className={s.sub}>
                    {section.teaser}
                </ParagraphLarge>
                <div className={wrapperClass}>
                    {total > 0 &&
                        items.map((item) => {
                            const {
                                headline,
                                body,
                                imageFile,
                                buttonUrl,
                                buttonText,
                            } = item

                            return (
                                <div key={headline} className={s.card}>
                                    <div className={s.img}>
                                        <ImageLazyLoad
                                            image={imageFile}
                                            param="?w=350"
                                            lazyloadProps={{
                                                height: 500,
                                                offset: 50,
                                                once: true,
                                            }}
                                        />
                                    </div>
                                    <div className={s.content}>
                                        <h4>{headline}</h4>
                                        <p>{body}</p>
                                        {buttonUrl && (
                                            <Button
                                                data-id="anywhere-session-ended-offer"
                                                theme="omega"
                                                path={buttonUrl}
                                                size="small"
                                            >
                                                {buttonText}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                </div>
                {section.buttonUrl && section.buttonText && (
                    <div className={s.btnWrapper}>
                        <div className={s.btnOmega}>
                            <Button
                                data-id="anywhere-session-ended-offer"
                                theme="omega"
                                path={section.buttonUrl}
                                size="regular"
                            >
                                {section.buttonText}
                                <svg
                                    width="39"
                                    height="34"
                                    viewBox="0 0 39 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1164_926)">
                                        <path
                                            d="M28.8172 0.762268H10.1819L0.864258 16.9979L10.1819 33.2374H28.8172L38.1349 16.9979L28.8172 0.762268Z"
                                            fill="#010101"
                                        />
                                        <g opacity="0.75">
                                            <path
                                                opacity="0.75"
                                                d="M28.8177 0.762295L38.1353 16.998L28.8177 33.2337H10.1823L0.864682 16.998L10.1823 0.762295H28.8177ZM29.2463 -0.00012207H9.75746L9.54129 0.381087L0.223626 16.6168L0 16.998L0.223626 17.3792L9.54129 33.6187L9.75746 33.9999H29.2463L29.4624 33.6187L38.7801 17.3792L39 16.998L38.7801 16.6168L29.4624 0.381087L29.2463 -0.00012207Z"
                                                fill="#FBB03B"
                                            />
                                        </g>
                                        <path
                                            d="M27.2564 24.6564H20.6483V22.7504C23.3989 21.4619 24.7741 19.1264 24.7741 15.7438C24.7741 13.8378 24.2896 12.2684 23.3206 11.0359C22.8596 10.4572 22.2784 9.99084 21.6192 9.67053C20.9601 9.35022 20.2394 9.18402 19.5097 9.18402C18.7799 9.18402 18.0593 9.35022 17.4001 9.67053C16.7409 9.99084 16.1597 10.4572 15.6987 11.0359C14.7198 12.3463 14.213 13.962 14.2638 15.6104C14.2638 19.0387 15.6304 21.4136 18.3636 22.7352V24.6412H11.748V22.6208H15.4565C13.1084 20.6461 11.9344 18.2318 11.9344 15.3778C11.9115 13.9345 12.2285 12.5067 12.8587 11.215C13.4483 10.0171 14.3515 9.0102 15.4677 8.30641C16.6993 7.56648 18.1098 7.19655 19.5376 7.23903C20.8643 7.15994 22.1849 7.47573 23.3398 8.14821C24.4947 8.82068 25.4344 9.82103 26.0451 11.0282C26.7481 12.3629 27.0976 13.8623 27.0588 15.3778C27.0588 18.2216 25.8848 20.636 23.5368 22.6208H27.2452L27.2564 24.6564Z"
                                            fill="#FFCD05"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1164_926">
                                            <rect
                                                width="39"
                                                height="34"
                                                fill="white"
                                                transform="translate(0 -0.00012207)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Button>
                            {/* <DownloadButton transparent small /> */}
                        </div>
                        <div className={s.btn}>
                            <DownloadButton
                                transparent
                                hideSecondaryPlatform
                                small
                            />
                        </div>
                    </div>
                )}
            </FrameContainer>
        </div>
    )
}

export default Content
