import React, { useEffect, useState } from 'react'
import { fetchSection } from 'lib/pages/api'
import SectionType from 'models/types/ts/sectionType'
import PriceTag from './PriceTag'
import style from './Sale.module.scss'

interface Props {
    language: string
}

const Sale = ({ language }: Props): JSX.Element => {
    const [data, setData] = useState<SectionType>()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const result: SectionType = await fetchSection(
                'HKmDScePcXX6RqOo1JHdi',
                language
            )

            setData(result)
        }

        fetchData()
    }, [language])

    const isHangTag = (string: string): boolean => {
        if (string && string === 'hang_tag') return true

        return false
    }

    // Check if valid JSON string
    const validateJSON = (string: string): boolean => {
        try {
            JSON.parse(string)
        } catch {
            return false
        }
        return true
    }

    if (!data || !data.buttonUrl) return null

    const { headline, teaser, body, buttonText, buttonUrl, theme } = data

    // Inline styles from 'headline' field
    const css = validateJSON(headline) ? JSON.parse(headline) : null

    if (!buttonText) {
        return <></>
    }

    return (
        <div
            className={style(style.sale, {
                [style[theme]]: theme,
                [style[headline]]: headline,
                [style.hang_tag]: isHangTag(teaser),
            })}
            style={css}
        >
            {isHangTag(teaser) && <PriceTag />}
            <a
                href={buttonUrl}
                className={style.link}
                data-id="eveNav_sale"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>{buttonText}</span>
                {isHangTag(teaser) && body && (
                    <div className={style.overlay}>{body}</div>
                )}
            </a>
        </div>
    )
}

export default Sale
