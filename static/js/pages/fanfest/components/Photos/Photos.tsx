import React from 'react'
import _map from 'lodash/map'
import SectionType from 'models/types/ts/sectionType'
import { Container, Visibility } from 'layouts'
import { HeadingUnderline2 } from 'layouts/headings'
import ImageGallery from 'features/image-lightbox'
import style from './Photos.module.scss'

interface Props {
    section: SectionType
}

const Photos = ({ section }: Props): JSX.Element => {
    const imageList = []

    _map(section.contentCollection.items, (item) => {
        imageList.push({
            url: item.imageFile.url,
            thumb: `${item.imageFile.url}?w=1000`,
        })
    })

    return (
        <div className={style.photos}>
            <Container>
                <HeadingUnderline2
                    title="Photos from previous Fanfests"
                    color="#F67C0F"
                />
            </Container>

            <Visibility direction="fadeUp">
                <div className={style.galleryContainer}>
                    <ImageGallery list={imageList} />
                </div>
            </Visibility>
        </div>
    )
}

export default Photos
