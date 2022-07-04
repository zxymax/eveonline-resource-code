import React from 'react'
import _map from 'lodash/map'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import _startsWith from 'lodash/startsWith'
import { DateAndAuthor, Link } from '../../../../../../features'
import { Section, Column, Row, Border, Icon } from '../../../../../../layouts'

const GetImage = (image) => {
    if (_startsWith(image, '//webimg.ccpgamescdn.com/')) {
        return <img src={`${image}_w=640`} alt="" />
    }
    return <img src={image} alt="" />
}

const ArticlesNews = ({ s, featured, news, hasContent }) => {
    const newsItems = _map(news, (newsItem) => {
        const { id, publishingDate, author, title, slug } = newsItem
        return (
            <div key={id} className={s.article_item}>
                <DateAndAuthor
                    className={s.author_date}
                    date={publishingDate}
                    author={author}
                />
                <Link path={{ page: 'article', subpage: id, id: slug }}>
                    <h3 className={s.article_title}>{title}</h3>
                </Link>
            </div>
        )
    })

    return (
        <div className={s.articles_news}>
            <div className={s.article_heading}>
                <h2>
                    EVE Online <strong>News</strong>
                </h2>
                <Link path={{ page: 'articles', subpage: 'news' }}>
                    <p className={s.read_more}>
                        Read more News{' '}
                        <Icon name="chevron-right" className={s.arrow} />
                    </p>
                </Link>
            </div>
            <Border primary />
            <Row>
                <Column xs={12} sm={6}>
                    <Section hasContent={hasContent}>
                        <div className={s.featured_content}>
                            {hasContent && (
                                <div>
                                    <Link
                                        path={{
                                            page: 'article',
                                            subpage: featured.id,
                                            id: featured.slug,
                                        }}
                                    >
                                        {GetImage(featured.metaImageUrl)}
                                        <DateAndAuthor
                                            className={s.author_date}
                                            date={featured.publishingDate}
                                            author={featured.author}
                                        />
                                        <h3 className={s.article_title}>
                                            {featured.title}
                                        </h3>
                                    </Link>
                                    <ReactMarkdown
                                        source={featured.metaDescription}
                                    />
                                </div>
                            )}
                        </div>
                    </Section>
                </Column>
                <Column xs={12} sm={6}>
                    <Section hasContent={hasContent}>
                        {hasContent && newsItems}
                    </Section>
                </Column>
            </Row>
        </div>
    )
}

ArticlesNews.propTypes = {
    s: PropTypes.func,
    featured: PropTypes.shape({
        id: PropTypes.string,
        slug: PropTypes.string,
        metaImageUrl: PropTypes.string,
        metaDescription: PropTypes.string,
        publishingDate: PropTypes.string,
        author: PropTypes.string,
        title: PropTypes.string,
    }),
    news: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string,
            id: PropTypes.string,
            publishingDate: PropTypes.string,
            title: PropTypes.string,
            slug: PropTypes.string,
        })
    ),
    hasContent: PropTypes.bool,
}

export default ArticlesNews
