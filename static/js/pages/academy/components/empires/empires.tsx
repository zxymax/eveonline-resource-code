import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ContentType from 'models/types/ts/contentType'
import { ImageLazyLoad } from 'features'
import { ParagraphLarge } from 'layouts/typography'
import { Container } from 'layouts'
import { HeadingUnderline2 } from 'layouts/headings'
import style from './empires.module.scss'

interface Props {
    section: SectionType
}

const Empires = ({ section }: Props): JSX.Element => {
    const {
        headline,
        body,
        contentCollection: { total, items },
    } = section
    return (
        <div className={style.empires}>
            <Container>
                <div className={style.intro}>
                    <HeadingUnderline2 title={headline} />
                    <ParagraphLarge>{body}</ParagraphLarge>
                </div>
            </Container>
            <div className={style.content}>
                {total > 0 &&
                    items.map((item: ContentType) => (
                        <div className={style.item} key={item.name}>
                            <a
                                href={item.buttonUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className={style.image}>
                                    {item.imageFile && (
                                        <ImageLazyLoad
                                            image={item?.imageFile}
                                            param="?w=377&h=377&fm=jpg&fl=progressive&q=80&fit=fill"
                                            lazyloadProps={{
                                                height: 377,
                                                offset: 200,
                                                once: true,
                                            }}
                                        />
                                    )}
                                </div>
                            </a>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Empires
