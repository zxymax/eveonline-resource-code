import React from 'react'
import { Translate } from 'react-localize-redux'
import ContentType from 'models/types/ts/contentType'
import { useSelector } from 'react-redux'
import { getLanguage } from 'selectors'
import classNames from 'classnames'
import { ParagraphLarge } from 'layouts/typography'
import { HeadingUnderline2 } from 'layouts/headings'
import getUrlWithLangPrefix from 'pages/academy/helpers/getUrlWithLangPrefix'
import SectionProps from 'pages/academy/templates/SectionProps'
import IconTypeEnum from 'pages/academy/models/icon-type-enum'
import style from './activities.module.scss'
import Card from '../card/Card'
import Icons from '../icons'

interface Props {
    description?: boolean
}

const Activities = ({
    section,
    location,
    description = true,
}: SectionProps & Props): JSX.Element => {
    const {
        body,
        contentCollection: { total, items },
    } = section

    const language = useSelector((state) => getLanguage(state))

    const cx = classNames.bind(style)

    return (
        <div className={style.activities}>
            <>
                <div className={style.headingContainer}>
                    <Translate>
                        {({ translate }) => (
                            <>
                                <HeadingUnderline2
                                    title={translate(
                                        'academy.activities'
                                    ).toString()}
                                />
                            </>
                        )}
                    </Translate>
                </div>
                <div className={style.icon}>
                    <Icons icon={IconTypeEnum.ActivitiesIcon} />
                </div>
            </>
            {body && description && (
                <ParagraphLarge className={style.desc}>{body}</ParagraphLarge>
            )}
            <div className={style.cardContainer}>
                {total > 0 &&
                    items.map((item: ContentType, index: number) => (
                        <div
                            key={item.name}
                            className={cx(style.inner, `item${index}`)}
                        >
                            <Card
                                content={item}
                                itemUrl={getUrlWithLangPrefix(
                                    language,
                                    location.page,
                                    item.buttonUrl
                                )}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

Activities.defaultProps = {
    description: true,
}

export default Activities
