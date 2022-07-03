import React from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import style from './headings.module.scss'

interface HeadingsProps {
    title: string
    subTitle?: string
    color?: string
    isMarkdownSubHeading?: boolean
    className?: string
}

const HeadingUnderline2 = ({
    title,
    subTitle,
    color = '#BA1F7E',
    isMarkdownSubHeading,
    className,
}: HeadingsProps): JSX.Element => {
    return (
        <div className={cx(style.heading, className)}>
            <div className={style.inner}>
                <h3>{title}</h3>
                {subTitle && (
                    <h4>
                        {isMarkdownSubHeading ? (
                            <ReactMarkdown source={subTitle} />
                        ) : (
                            subTitle
                        )}
                    </h4>
                )}
                <div
                    className={style.line}
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    )
}

HeadingUnderline2.defaultProps = {
    subTitle: undefined,
    color: '#BA1F7E',
    isMarkdownSubHeading: false,
    className: '',
}

export default HeadingUnderline2
