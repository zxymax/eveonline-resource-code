/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import _map from 'lodash/map'
import 'react-image-lightbox/style.css'

interface ImageList {
    url: string
    thumb: string
}

interface Props {
    list: Array<ImageList>
}

const ImageLightbox = ({ list }: Props): JSX.Element => {
    const [photoIndex, setPhotoIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function clickImage(index: number): void {
        setIsOpen(true)
        setPhotoIndex(index)
    }

    return (
        <>
            {_map(list, (item, i) => (
                <div key={i}>
                    <img
                        alt=""
                        src={item.thumb}
                        onClick={() => clickImage(i)}
                    />
                </div>
            ))}

            {isOpen && (
                <Lightbox
                    mainSrc={list[photoIndex].url}
                    nextSrc={list[(photoIndex + 1) % list.length].url}
                    prevSrc={
                        list[(photoIndex + list.length - 1) % list.length].url
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + list.length - 1) % list.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % list.length)
                    }
                />
            )}
        </>
    )
}

export default ImageLightbox
