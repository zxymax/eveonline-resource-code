import React, { useState } from 'react'
import _map from 'lodash/map'
import SectionType from 'models/types/ts/sectionType'
import ReactMarkdown from 'react-markdown'
import { Section, Button } from 'layouts'
import { HeadingUnderline2 } from 'layouts/headings'
import LinkArrow from 'layouts/link-arrow'
import {
    HeadingXSmall,
    HeadingSmall,
    ParagraphRegular,
    ParagraphLarge,
    LabelSmall,
} from 'layouts/typography'
import SlidingPane, { useSlidingPane } from '../sliding-pane'
import style from './events2.module.scss'

interface Props {
    section: SectionType
}

const Events2 = ({ section }: Props): JSX.Element => {
    const { isOpen, toggleSlidingPane, closeSlidingPane } = useSlidingPane()
    const [contentIndex, setContent] = useState(0)

    function handleClick(content): void {
        toggleSlidingPane()
        setContent(content)
    }

    let paneImg = ''
    if (section) {
        paneImg = section.contentCollection.items[contentIndex].imageFile?.url
    }

    const items = _map(section.contentCollection.items, (item, index) => (
        <div
            className={style.item}
            key={index}
            onClick={() => (item?.body ? handleClick(index) : null)}
            role="button"
            tabIndex={0}
        >
            <div
                className={style.content}
                style={{ backgroundImage: `url(${item.imageFile.url})` }}
            >
                <HeadingXSmall as="h4" fontSize={[20, 22]}>
                    {item.name}
                </HeadingXSmall>
            </div>
            <ParagraphRegular>{item.headline}</ParagraphRegular>
            {item.body && (
                <>
                    <LabelSmall>Read more</LabelSmall>{' '}
                    <LinkArrow color="#F67C0F" />
                </>
            )}
        </div>
    ))

    return (
        <Section>
            <div className={style.events2}>
                <HeadingUnderline2 title={section.name} color="#F67C0F" />
                <ParagraphLarge>{section.headline}</ParagraphLarge>
                <div className={style.EventsWrapper}>{items}</div>
            </div>
            <SlidingPane isOpen={isOpen} onClose={closeSlidingPane}>
                <HeadingSmall>
                    {section.contentCollection.items[contentIndex].name}
                </HeadingSmall>
                <div className={style.paneContent}>
                    <div>
                        <ReactMarkdown
                            source={
                                section.contentCollection.items[contentIndex]
                                    .body
                            }
                            escapeHtml={false}
                        />
                    </div>
                    <img src={paneImg} className={style.img} alt="" />
                </div>
                {section.contentCollection.items[contentIndex].buttonUrl && (
                    <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        path={
                            section.contentCollection.items[contentIndex]
                                .buttonUrl
                        }
                        theme="community"
                        data-id="fanfest_event_cta"
                        size="small"
                    >
                        {
                            section.contentCollection.items[contentIndex]
                                .buttonText
                        }
                    </Button>
                )}
            </SlidingPane>
        </Section>
    )
}

export default Events2
