import React, { useRef, useState } from 'react'

import Slider from 'react-slick'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { Container } from 'layouts'
import { HeadingUnderline2 } from 'layouts/headings'

import Arrows from 'layouts/carousel/components/arrows'
import { prev, next } from 'layouts/carousel/helpers'
import shipClasses from './ship-classes'

// import PageLocationType from 'models/page-location-type'
// import AcademyPageType from 'pages/academy/models/academy-page-type'
// import Section from '../section'

import ShipClassInfo from './components/ship-class-info'
import ShipClassList from './components/ship-class-list'
import ShipDisplay from './components/ship-display'

import style from './ShipShowcase.module.scss'

interface Props {
    section: SectionType
    language: string
}

const ShipShowcase = ({ section, language }: Props): JSX.Element => {
    const slider = useRef(null)

    // TODO random selected item
    // const startIndex = Math.floor(Math.random() * 15)
    const startIndex = 0
    const [selectedIndex, setSelectedIndex] = useState<number>(startIndex)
    const [changing, setChanging] = useState<boolean>(false)

    // TODO add this to helper or selector
    const {
        contentCollection: { items },
    } = section

    if (!section) return <></>

    const setActiveSlide = (key: number): void => {
        slider.current.slickGoTo(key)
    }

    const renderContent = (): JSX.Element => {
        return (
            <>
                <div className={style.topWrapper}>
                    <>
                        <Container>
                            <div className={style.top}>
                                <div className={style.left}>
                                    <div className={style.content}>
                                        <HeadingUnderline2
                                            title={section.headline}
                                        />
                                        <ShipClassInfo
                                            body={items[selectedIndex]?.body}
                                            changing={changing}
                                        />
                                    </div>
                                    <div className={style.arrowContainer}>
                                        <Arrows
                                            nextClick={() => {
                                                next(slider)
                                            }}
                                            prevClick={() => {
                                                prev(slider)
                                            }}
                                            className={style.arrows}
                                        />
                                    </div>
                                </div>
                                <div className={style.right}>
                                    <ShipClassList
                                        ships={items}
                                        language={language}
                                        selectedIndex={selectedIndex}
                                        setActive={setActiveSlide}
                                    />
                                </div>
                            </div>
                        </Container>
                    </>
                </div>
                <div className={style.bottom}>
                    <Slider
                        ref={slider}
                        draggable={false}
                        arrows={false}
                        infinite
                        lazyLoad="ondemand"
                        cssEase="cubic-bezier(.5,0,.1,1)"
                        initialSlide={selectedIndex}
                        beforeChange={() => setChanging(true)}
                        afterChange={(slide) => {
                            setChanging(false)
                            setSelectedIndex(slide)
                        }}
                    >
                        {items.map((content: ContentType, index: number) => (
                            <Container
                                key={content.name}
                                className={style.container}
                            >
                                <ShipDisplay
                                    content={content}
                                    selectedShipClassIcon={
                                        shipClasses[index]?.icon
                                    }
                                    changing={changing}
                                />
                            </Container>
                        ))}
                    </Slider>
                </div>
            </>
        )
    }

    return <div className={style.showcase}>{renderContent()}</div>
}

export default ShipShowcase
