import React, { useState } from 'react'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import { HeadingSmall, LabelSmall } from 'layouts/typography'
import ImageContent from 'layouts/templates/image-content'
import LinkArrow from 'layouts/link-arrow'
import { HeadingUnderline2 } from 'layouts/headings'
import SectionType from 'models/types/ts/sectionType'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import SlidingPane, { useSlidingPane } from '../sliding-pane'
import style from './GoodToKnow.module.scss'

interface Props {
    section: SectionType
}

const GoodToKnow = ({ section }: Props): JSX.Element => {
    const [selectedContentId, setselectedContentId] = useState<number>(0)
    const { isOpen, toggleSlidingPane, closeSlidingPane } = useSlidingPane()

    const DetailTitle = section.contentCollection.items[selectedContentId].name
    const DetailBody = section.contentCollection.items[selectedContentId].body

    const handleClick = (idx: number): void => {
        toggleSlidingPane()
        setselectedContentId(idx)
    }

    const items = _map(section.contentCollection.items, (item, index) => {
        const fadeDirection = index % 2 ? 'fadeRight' : 'fadeLeft'

        return (
            <div
                tabIndex={index}
                role="button"
                key={index}
                className={style.content}
                onClick={() => handleClick(index)}
            >
                {item.imageFile && (
                    <ImageContent
                        key={index}
                        image={item.imageFile.url}
                        direction={fadeDirection}
                    >
                        <HeadingSmall as="h3" textTransform="capitalize">
                            {item.name}
                        </HeadingSmall>
                        <ReactMarkdown source={item.headline} />
                        <div className={style.readMore}>
                            <LabelSmall>Read more</LabelSmall>{' '}
                            <LinkArrow color="#F67C0F" />
                        </div>
                    </ImageContent>
                )}
            </div>
        )
    })

    return (
        <>
            <div className={style.goodToKnow}>
                <HeadingUnderline2 title={section.name} color="#F67C0F" />
                <div className={style.container}>{items}</div>
            </div>
            <SlidingPane isOpen={isOpen} onClose={closeSlidingPane}>
                <HeadingSmall>{DetailTitle}</HeadingSmall>
                <div>
                    <ReactMarkdown source={DetailBody} escapeHtml={false} />
                </div>
            </SlidingPane>
        </>
    )
}

export default GoodToKnow
