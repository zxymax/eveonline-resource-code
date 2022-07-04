import React from 'react'
import { Translate } from 'react-localize-redux'
import { Link } from 'features'
import style from './Filter.module.scss'

interface Props {
    year: string
}
export default function Filter({ year }: Props): JSX.Element {
    const getYears = (startDate = 2016): Array<JSX.Element> => {
        const now = new Date().getFullYear()
        let from = startDate
        const years = []
        while (from <= now) {
            years.push(from)
            from += 1
        }

        return years.reverse().map((y) => (
            <Link
                //   onClick={() => setYear(yr)}
                key={y}
                className={style(style.date, {
                    [style.active]: y.toString() === year,
                })}
                path={{
                    page: 'news',
                    subpage: 'archive',
                    id: y,
                }}
            >
                {y}
            </Link>
        ))
    }

    return (
        <>
            <div className={style.filter_title}>
                <Translate id="news.filter" />
            </div>
            <div className={style.overflow}>
                <div className={style.date_group}>
                    {getYears()}
                    {/* Adding link to older archives */}
                    <Link
                        className={style(style.date, {
                            [style.active]: year === null,
                        })}
                        path={{
                            page: 'articles',
                            subpage: 'news',
                        }}
                    >
                        <Translate id="news.filterOlder" />
                    </Link>
                </div>
            </div>
        </>
    )
}
