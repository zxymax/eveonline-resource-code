import React from 'react'
import _map from 'lodash/map'
import SectionType from 'models/types/ts/sectionType'
import Card from './components/Card'
import style from './ImageList.module.scss'

interface Props {
    section: SectionType
}

const ImageList = ({ section }: Props): JSX.Element => (
    <div className={style.imageList}>
        {_map(section.contentCollection.items, (item, i) => (
            <Card key={i} card={item} id={i} />
        ))}
    </div>
)

export default ImageList
