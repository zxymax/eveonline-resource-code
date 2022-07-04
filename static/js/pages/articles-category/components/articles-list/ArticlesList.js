import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import _startsWith from 'lodash/startsWith'
import { Column, Row } from 'layouts'
import { DateAndAuthor, Link } from '../../../../features'
import style from '../../ArticlesCategory.scss'

const ArticlesList = ({ articles, category, loaded, fallbackImage }) => {
    const getImage = (image) => {
        if (
            image === '' ||
            _startsWith(image, '//www.eve-ic.net/') ||
            _startsWith(image, '//www.eve-mercury.net/')
        ) {
            return <img src={fallbackImage} alt="" />
        }

        // what about: //mb-brandstores-4.r.worldssl.net (try searching for horse)
        // also //updates.eveonline.com/kvd74o0q2fjg/5msUOunK3mmQMEIISGSey8/7141417fc7a3ce86597fbe13a71a5c7d/FacebookSharedImage-1200x6304ae8.jpg?w=1280&fm=jpg

        if (_startsWith(image, '//webimg.ccpgamescdn.com/')) {
            return <img src={`${image}_w=640`} alt="" />
        }

        return (
            <img
                src={image}
                alt=""
                onError={(e) => {
                    e.target.src = fallbackImage
                }}
            />
        )
    }

    const renderArticles = () =>
        // eslint-disable-next-line implicit-arrow-linebreak
        articles.map((article) => (
            <Row key={article.id} className={style.row}>
                <Column md={6} sm={12} xs={12} className={style.col}>
                    <LazyLoad offset={300} height={350}>
                        <Link
                            path={{
                                page: 'article',
                                subpage: article.id,
                                id: article.slug,
                            }}
                        >
                            {getImage(article.metaImageUrl)}
                        </Link>
                    </LazyLoad>
                </Column>
                <Column md={6} sm={12} xs={12} className={style.col}>
                    {category !== 'scope' && (
                        <DateAndAuthor
                            className={style.author_date}
                            date={article.publishingDate}
                            author={article.author}
                        />
                    )}
                    <Link
                        path={{
                            page: 'article',
                            subpage: article.id,
                            id: article.slug,
                        }}
                    >
                        <h3 className={style.article_title}>{article.title}</h3>
                    </Link>
                    <p>{article.metaDescription}</p>
                </Column>
            </Row>
        ))

    return (
        <div
            className={
                loaded
                    ? style(style.articles_container, style.active)
                    : style.articles_container
            }
        >
            {renderArticles()}
        </div>
    )
}

ArticlesList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            slut: PropTypes.string,
            publishingDate: PropTypes.string,
            author: PropTypes.string,
            metaImageUrl: PropTypes.string,
            title: PropTypes.string,
            metaDescription: PropTypes.string,
        })
    ),
    category: PropTypes.string,
    loaded: PropTypes.bool,
    fallbackImage: PropTypes.string,
}

ArticlesList.defaultProps = {
    fallbackImage:
        '//webimg.ccpgamescdn.com/7lhcm73ukv5p/68IeU6loqIw2QU6QiICSgk/30d6286e41cae383c38f3c8600b99ef0/pwpeYwCN8NFz2AXzwztQbK-650-80.jpg_w=640',
}

export default ArticlesList
