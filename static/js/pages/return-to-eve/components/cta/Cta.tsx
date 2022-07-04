import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Button } from 'layouts'
import { HeadingXSmall, ParagraphLarge } from 'layouts/typography'
import { Download, Omega } from './svg/icons'
import s from './Cta.module.scss'

interface Props {
    section: SectionType
}

const Cta = ({ section }: Props): JSX.Element => {
    const {
        contentCollection: { total, items },
    } = section

    return (
        <section className={s.cards}>
            {total > 0 &&
                items.map((item) => {
                    const {
                        headline,
                        body,
                        buttonUrl,
                        buttonText,
                        image,
                    } = item

                    return (
                        <div key={headline} className={s.card}>
                            <div className={s.img}>
                                {image === 'download' ? (
                                    <Download />
                                ) : (
                                    <Omega />
                                )}
                            </div>
                            <div>
                                <HeadingXSmall>{headline}</HeadingXSmall>
                                <ParagraphLarge>{body}</ParagraphLarge>
                                <a href={buttonUrl}>&nbsp;</a>
                            </div>
                            <Button
                                path={buttonUrl}
                                className={s.btn}
                                size="small"
                            >
                                {buttonText}
                            </Button>
                        </div>
                    )
                })}
        </section>
    )
}

export default Cta

