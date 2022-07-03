import React from 'react'
import PropTypes from 'prop-types'

const NewsItem = ({ s, item }) => {
    const { headline, body, img, buttonUrl, date } = item.fields
    // const formatDate = date.slice(0, -12)
    return (
        <div className={s.newsitem}>
            <div className={s.image}>
                <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                    <img src={`${img}_w=1280&fm=jpg&fl=progressive`} alt="" />
                </a>
            </div>
            <div className={s.text}>
                <p className={s.info}>
                    {headline} <span> - {date}</span>
                </p>
                <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                    <p className={s.description}>{body}</p>
                </a>
            </div>
        </div>
    )
}

NewsItem.propTypes = {
    s: PropTypes.func,
    item: PropTypes.any, // eslint-disable-line
}

export default NewsItem

