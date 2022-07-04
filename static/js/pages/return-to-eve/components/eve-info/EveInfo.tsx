import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import { Button, Container } from 'layouts'
import ReactMarkdown from 'react-markdown'
import { HeadingUnderline2 } from 'layouts/headings'
import s from './EveInfo.module.scss'

interface Props {
    section: SectionType
}

const EveInfo = ({ section }: Props): JSX.Element => {
    const { headline, body, imageFile, buttonText, buttonUrl } = section
    return (
        <div className={s.eveInfo}>
            <Container>
                <div className={s.content}>
                    <div className={s.text}>
                        <HeadingUnderline2 title={headline} color="#30B2E6" />
                        <ReactMarkdown source={body} />
                        {buttonUrl && (
                            <Button
                                className={s.btn}
                                size="small"
                                path={buttonUrl}
                            >
                                {buttonText}
                            </Button>
                        )}
                    </div>
                    <div className={s.image}>
                        {imageFile && <img src={imageFile.url} alt="" />}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default EveInfo

