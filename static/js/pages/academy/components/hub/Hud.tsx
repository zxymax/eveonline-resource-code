import React, { useRef, useState, Fragment } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'

import { HeadingUnderline2 } from 'layouts/headings'
import { ParagraphLarge } from 'layouts/typography'

import ContentType from 'models/types/ts/contentType'
import SectionProps from '../../templates/SectionProps'
import Markdown from '../markdown'

import { HudItem } from './hudItems'

import style from './Hud.module.scss'
import Section from '../section'

export default function Hud({ section }: SectionProps): JSX.Element {
    const slider = useRef(null)

    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    if (!section) return <></>

    const {
        headline,
        body,
        contentCollection: { items },
    } = section

    // Need to split in two columns, but still keep the indexes correct for active slide
    const splitIndex = 12

    const cx = classNames.bind(style)

    const setActiveSlide = (key: number): void => {
        slider.current.slickGoTo(key)
    }

    const renderListItem = (item: HudItem, index: number): JSX.Element => {
        return (
            <li key={item.id}>
                <span
                    className={cx(style.listItem, {
                        [style.current]: index === selectedIndex,
                    })}
                    role="button"
                    onClick={() => setActiveSlide(index)}
                    onMouseEnter={() => setActiveSlide(index)}
                    tabIndex={index}
                    onKeyDown={() => {}}
                >
                    <span className={style.pink}>{index + 1}</span> {item.title}
                </span>
            </li>
        )
    }

    // const hudItems: Array<HudItem> = undefined
    const hudItems = items.map(
        (
            item: ContentType & {
                data: {
                    left: number
                    top: number
                }
            }
        ) => {
            const hudItem: HudItem = {
                id: item.sys.id,
                title: item.headline,
                text: item.body,
                top: item.data.top,
                left: item.data.left,
            }
            return hudItem
        }
    )

    const topOffset = 0
    const leftOffset = 0

    return (
        <div className={style.hud}>
            <Section>
                <div className={style.top}>
                    <HeadingUnderline2 title={headline} />
                    <ParagraphLarge>{body}</ParagraphLarge>
                </div>

                <div className={style.main}>
                    <div className={style.imageContainer}>
                        <div className={style.inner}>
                            <img
                                src={section.imageFile?.url}
                                className={style.bgImage}
                                alt=""
                            />
                            {items &&
                                hudItems.map((item: HudItem, index: number) => (
                                    <span
                                        key={item.id}
                                        className={cx(
                                            style.item,
                                            style.btntest,
                                            {
                                                [style.current]:
                                                    index === selectedIndex,
                                            }
                                        )}
                                        style={{
                                            top: `${item.top + topOffset}px`,
                                            left: `${item.left + leftOffset}px`,
                                        }}
                                        role="button"
                                        onClick={() => setActiveSlide(index)}
                                        onMouseEnter={() =>
                                            setActiveSlide(index)
                                        }
                                        tabIndex={index}
                                        onKeyDown={() => {}}
                                    >
                                        {index + 1}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className={style.listContainer}>
                        <ul>
                            {hudItems.map((item: HudItem, index: number) => {
                                if (index < splitIndex)
                                    return renderListItem(item, index)
                                return <Fragment key={item.id} />
                            })}
                        </ul>
                        <ul>
                            {hudItems.map((item: HudItem, index: number) => {
                                if (index >= splitIndex)
                                    return renderListItem(item, index)
                                return <Fragment key={item.id} />
                            })}
                        </ul>
                    </div>
                </div>
            </Section>
            <div className={style.bottom}>
                <Slider
                    ref={slider}
                    draggable={false}
                    arrows={false}
                    infinite
                    fade
                    speed={100}
                    easing="ease-in"
                    lazyLoad="ondemand"
                    cssEase="cubic-bezier(.5,0,.1,1)"
                    slidesToShow={1}
                    initialSlide={selectedIndex}
                    afterChange={(slide) => {
                        setSelectedIndex(slide)
                    }}
                >
                    {hudItems.map((item: HudItem) => (
                        <div key={item.id} className={style.container}>
                            <Markdown content={item.text} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
