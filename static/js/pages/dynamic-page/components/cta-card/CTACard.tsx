import React from 'react'
import ReactMarkdown from 'react-markdown'
import SectionType from 'models/types/ts/sectionType'
import { HeadingSmall } from 'layouts/typography'
import Picture from 'features/picture'
import Button from 'layouts/button'
import s from './CTACard.module.scss'

interface Props {
    section: SectionType
}

const CTACard = ({ section }: Props): JSX.Element => {
    const { headline, body, imageFile, buttonText, buttonUrl } = section

    return (
        <div className={s.card}>
            <div className={s.img}>
                {imageFile && <Picture src={imageFile.url} alt="" />}
            </div>
            <div className={s.content}>
                <div className={s.inner}>
                    <HeadingSmall className={s.heading}>
                        {headline}
                    </HeadingSmall>
                    <ReactMarkdown source={body} escapeHtml={false} />
                </div>
                {buttonText && (
                    <Button
                        path={buttonUrl}
                        className={s.btn}
                        data-id="dynamic-cta-card-button"
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default CTACard
