import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import { format } from 'date-fns'
import style from './DateAndAuthor.scss'

function DateAndAuthor({ className, date, author, suffix }) {
    if (date === undefined) return null

    return (
        <span className={style(style.author_date, className)}>
            {format(new Date(date), 'yyyy-MM-dd')}
            {author && (
                <span>
                    {' '}
                    - <Translate id="news.authorBy" /> {author} {suffix}
                </span>
            )}
        </span>
    )
}

DateAndAuthor.propTypes = {
    className: PropTypes.string,
    date: PropTypes.string, // eslint-disable-line
    author: PropTypes.string,
    suffix: PropTypes.string,
}

export default DateAndAuthor
