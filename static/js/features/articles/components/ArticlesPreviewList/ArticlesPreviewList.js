import React from 'react'
import _map from 'lodash/map'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Link from 'features/link'
import { Column, Row, Icon, Border } from 'layouts'
import ArticlePreviewItem from '../ArticlesPreviewItem'
import style from './ArticlesPreviewList.scss'

function ArticlesPreviewList({
    items,
    title,
    subpage,
    readMoreTitle,
    itemCount,
    colSize,
}) {
    if (
        items === undefined ||
        title === undefined ||
        itemCount === undefined ||
        colSize === undefined
    ) {
        return null
    }

    const itemList = _map(items.slice(0, itemCount), (item) => (
        <Column key={item.title} xs={12} sm={colSize}>
            <ArticlePreviewItem
                s={style}
                id={item.id}
                title={item.title}
                date={item.publishingDate}
                author={item.author}
                imgUrl={item.metaImageUrl}
                category={item.category}
                slug={item.slug}
            />
        </Column>
    ))

    return (
        <div className={style.articlesPreview}>
            <Row>
                <Column xs={12}>
                    <div className={style.heading}>
                        <ReactMarkdown source={title} />
                        <Link path={{ page: 'articles', subpage }}>
                            <p className={style.read_more}>
                                {readMoreTitle}
                                <Icon
                                    name="chevron-right"
                                    className={style.arrow}
                                />
                            </p>
                        </Link>
                    </div>
                </Column>
            </Row>
            <Border primary />
            <Row>{itemList}</Row>
        </div>
    )
}

ArticlesPreviewList.propTypes = {
    title: PropTypes.string,
    readMoreTitle: PropTypes.string,
    subpage: PropTypes.string,
    colSize: PropTypes.string,
    itemCount: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            date: PropTypes.string,
            author: PropTypes.string,
            imgUrl: PropTypes.string,
            slug: PropTypes.string,
        })
    ),
}

export default ArticlesPreviewList
