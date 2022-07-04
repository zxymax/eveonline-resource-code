import React, { useState, useCallback, useRef, KeyboardEvent } from 'react'
import Lightbox from 'react-image-lightbox'
import Slider from 'react-slick'
import SectionType from 'models/types/ts/sectionType'
import Arrows from 'layouts/carousel/components/arrows'
import { prev, next } from 'layouts/carousel/helpers'
import { Container } from 'layouts'
import s from './Gallery.module.scss'

interface Props {
    section: SectionType
}

const Gallery = ({ section }: Props): JSX.Element => {
    const [imgIndex, setImgIndex] = useState<number>(0)
    const [dragging, setDragging] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const slider = useRef(null)

    const LG = 3000
    const MD = 1440
    const SM = 768

    const {
        teaser,
        contentCollection: { total, items },
    } = section

    const images = items.map((item) => {
        const { url, description } = item.imageFile

        return {
            url,
            thumb: `${url}?w=350`,
            description,
        }
    })

    const handleClick = (idx: number): void => {
        setIsOpen(true)
        setImgIndex(idx)
    }

    const handleKeyDown = (e: KeyboardEvent, idx: number): void => {
        if (e.key === '13') handleClick(idx)
    }

    const handleCapture = useCallback(
        (e) => {
            if (dragging) e.stopPropagation()
        },
        [dragging]
    )

    const handleBeforeChange = useCallback((): void => {
        setDragging(true)
    }, [setDragging])

    const handleAfterChange = useCallback((): void => {
        setDragging(false)
    }, [setDragging])

    const responsiveSettings = [
        {
            breakpoint: LG,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: MD,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: SM,
            settings: {
                slidesToShow: 1,
            },
        },
    ]

    return (
        <div className={s.gallery}>
            <Slider
                ref={slider}
                className={s.slider}
                arrows={false}
                variableWidth
                beforeChange={handleBeforeChange}
                afterChange={handleAfterChange}
                slidesToShow={9}
                slidesToScroll={1}
                responsive={responsiveSettings}
            >
                {total > 0 &&
                    images.map((img, i) => (
                        <div
                            key={img.thumb}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleClick(i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className={s.item}
                            onClickCapture={handleCapture}
                        >
                            {teaser && i === 0 && (
                                <div className={s.ribbon}>
                                    <span>{teaser}</span>
                                </div>
                            )}
                            <img src={img.thumb} alt={img.description} />
                        </div>
                    ))}
            </Slider>
            <Container>
                <Arrows
                    prevClick={() => prev(slider)}
                    nextClick={() => next(slider)}
                    color="#30b2e6"
                    className={s.arrows}
                />
            </Container>
            {isOpen && (
                <Lightbox
                    mainSrc={images[imgIndex].url}
                    nextSrc={images[(imgIndex + 1) % images.length].url}
                    prevSrc={
                        images[(imgIndex + images.length - 1) % images.length]
                            .url
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setImgIndex(
                            (imgIndex + images.length - 1) % images.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setImgIndex((imgIndex + 1) % images.length)
                    }
                />
            )}
        </div>
    )
}

export default Gallery
