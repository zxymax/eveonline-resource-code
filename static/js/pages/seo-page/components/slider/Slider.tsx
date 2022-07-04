import React from 'react'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { Section, Container, Frame, Heading } from 'layouts'
import Carousel from 'pages/www/components/shared/carousel' // TODO MOVE CAROUSEL COMPONENT TO LAYOUTS or FEATURES
import sliderSettings from './settings'
import style from './Slider.module.scss'

interface Props {
    section: SectionType
}

export default function Slider({ section }: Props): JSX.Element {
    const items =
        section && section.contentCollection && section.contentCollection.items

    const renderItems =
        items &&
        _map(items, (item: ContentType, key: string) => (
            <div className={style.item} key={key}>
                <Frame className={style.frame} cutoutTop={false}>
                    <div className={style.imgContain}>
                        <img
                            src={item.imageFile.url}
                            alt={item.imageFile.description}
                            className={style.img}
                        />
                    </div>
                    <div className={style.content}>
                        <Heading size="small" className={style.title}>
                            {item.headline}
                        </Heading>
                        <ReactMarkdown source={item.body} />
                    </div>
                </Frame>
            </div>
        ))

    if (section && items) {
        return (
            <Section className={style.slider}>
                <Container>
                    <Carousel config={sliderSettings}>{renderItems}</Carousel>
                </Container>
            </Section>
        )
    }

    return <></>
}

