import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import { isMobile } from 'react-device-detect'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { HeadingSmall, HeadingXSmall } from 'layouts/typography'
import Button from 'layouts/button'
import SvgIcon from 'layouts/svgIcon'
import Wrapper from '../wrapper'
import s from './Rewards.module.scss'

interface Props {
    section: SectionType
}

interface Content {
    omega?: boolean
}

const Rewards = ({ section }: Props): JSX.Element => {
    const [activeItem, setActiveItem] = useState<Partial<ContentType>>(null)
    const [autoPlay, setAutoPlay] = useState<boolean>(true)

    const {
        headline,
        body,
        contentCollection: { total, items },
        buttonText,
        buttonUrl,
    } = section

    const handleChange = (item: ContentType): void => {
        if (item !== activeItem) {
            setActiveItem(item)
        }
    }

    useEffect(() => {
        if (total > 0) {
            setActiveItem(items[0])
        }
    }, [])

    useEffect(() => {
        if (total > 1 && autoPlay && !isMobile) {
            const timer = setInterval(() => {
                const next = items.findIndex((e) => e === activeItem) + 1
                if (next >= items.length) {
                    handleChange(items[0])
                } else {
                    handleChange(items[next])
                }
            }, 5000)

            return () => clearInterval(timer)
        }
    }, [activeItem, autoPlay])

    const pause = (): void => setAutoPlay(false)

    const play = (): void => setAutoPlay(true)

    return (
        <Wrapper className={s.rewards}>
            <div className={s.intro}>
                {headline && <HeadingSmall>{headline}</HeadingSmall>}
                {body && <ReactMarkdown source={body} escapeHtml={false} />}
            </div>
            {total > 0 && (
                <div
                    className={s.content}
                    onMouseEnter={pause}
                    onMouseLeave={play}
                >
                    <div className={s.items}>
                        {items.map((item) => {
                            const content = item?.data as Content
                            return (
                                <div
                                    key={item.headline}
                                    onMouseEnter={() => handleChange(item)}
                                    className={cx(s.item, {
                                        [s.active]: item === activeItem,
                                        [s.omega]: content?.omega,
                                    })}
                                >
                                    <div className={s.hexagon}>
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                className={s.img}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                    <ReactMarkdown
                                        className={s.title}
                                        source={item.headline}
                                        escapeHtml={false}
                                    />
                                    {content?.omega && (
                                        <SvgIcon
                                            name="omega-hexagon-small"
                                            width={32}
                                            height={27}
                                            className={s.icon}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {activeItem && (
                        <div
                            className={s.details}
                            style={{
                                backgroundImage: `url(${activeItem.imageFile?.url})`,
                            }}
                        >
                            {(activeItem.data as Content) && (
                                <SvgIcon
                                    name="omega-hexagon-small"
                                    width={50}
                                    height={45}
                                    className={s.icon}
                                />
                            )}
                            <HeadingXSmall as="h3" fontSize={[20, 22]}>
                                {activeItem.headline}
                            </HeadingXSmall>
                            {activeItem.body && (
                                <ReactMarkdown
                                    source={activeItem.body}
                                    escapeHtml={false}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
            {buttonText && buttonUrl && (
                <div className={s.btn}>
                    <Button
                        path={buttonUrl}
                        theme="omega"
                        data-id="dynamic-rewards-cta-button"
                    >
                        {buttonText}
                        <SvgIcon
                            name="omega-hexagon-small"
                            width={25}
                            height={20}
                        />
                    </Button>
                </div>
            )}
        </Wrapper>
    )
}

export default Rewards
