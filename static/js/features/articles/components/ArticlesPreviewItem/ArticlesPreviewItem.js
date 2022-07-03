import React from 'react'
import PropTypes from 'prop-types'
import _startsWith from 'lodash/startsWith'
import classNames from 'classnames'
import DateAndAuthor from 'features/date-and-author'
import Link from 'features/link'
import style from './ArticlesPreviewItem.scss'

const GetImage = (image) => {
    if (_startsWith(image, '//webimg.ccpgamescdn.com/')) {
        return `${image}_w=640`
    }
    return image
}

function ArticlePreviewItem({
    id,
    title,
    date,
    author,
    imgUrl,
    slug,
    metaDescription,
}) {
    let useDefaultImage = false

    if (imgUrl === '') {
        useDefaultImage = true
    }

    let bgImage = {}
    const image = GetImage(imgUrl)
    if (!useDefaultImage) {
        bgImage = {
            backgroundImage: `url(${image})`,
        }
    }

    const imageStyles = classNames(style.image, {
        [style.default]: useDefaultImage,
    })

    return (
        <div className={style.item}>
            <Link path={{ page: 'article', subpage: id, id: slug }}>
                <div className={imageStyles} style={bgImage} />
                <div className={style.text}>
                    <DateAndAuthor
                        className={style.author_date}
                        date={date}
                        author={author}
                    />
                    <h3>{title}</h3>
                    <p>{metaDescription}</p>
                </div>
            </Link>
        </div>
    )
}

ArticlePreviewItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    imgUrl: PropTypes.string,
    slug: PropTypes.string,
    metaDescription: PropTypes.string,
}

export default ArticlePreviewItem
