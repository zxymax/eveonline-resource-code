import React from 'react'
import { format } from 'date-fns'
import { Translate } from 'react-localize-redux'
import NewsType from 'models/types/ts/newsType'
import Link from '../shared/link'
import style from './PatchNotesLatest.module.scss'

interface Props {
    item: NewsType
}

const PatchNotesLatest = ({ item }: Props): JSX.Element => {
    if (item) {
        const {
            slug,
            sys: { publishedAt },
        } = item

        return (
            <div className={style.patchNotes}>
                <Link slug={slug}>
                    <strong>
                        <Translate id="news.patchNotes" />
                    </strong>{' '}
                    (<Translate id="news.patchNotesLastUpdate" />{' '}
                    {format(new Date(publishedAt), 'yyyy-MM-dd')})
                </Link>
            </div>
        )
    }

    return <></>
}

export default PatchNotesLatest

