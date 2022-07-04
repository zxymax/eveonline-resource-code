import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import { Section, Column, Row, Border, Icon } from 'layouts'
import { DateAndAuthor, Link } from 'features'
import s from './ArticlesSidebar.scss'

const ArticlesSidebar = ({
    items,
    blockTitle,
    readMoreTitle,
    subpage,
    hasContent,
    showImage,
    showDateAuthor,
}) => {
    const scopeItems = _map(items, (scopeItem) => {
        const {
            id,
            publishingDate,
            author,
            title,
            metaImageUrl,
            slug,
        } = scopeItem

        return (
            <Column key={id} xs={12} sm={12} md={12} className={s.col}>
                <Link path={{ page: 'article', subpage: id, id: slug }}>
                    {showImage && metaImageUrl && (
                        <div className={s.img_container}>
                            <img
                                className={s.img}
                                src={`${metaImageUrl}_w=360`}
                                alt=""
                            />
                            <div className={s.play_btn}>
                                <img
                                    className={s.play}
                                    src="//web.ccpgamescdn.com/aws/eveonline/images/play-icon.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    )}
                    <div className={s.sidebar_content}>
                        {showDateAuthor && (
                            <DateAndAuthor
                                className={s.author_date}
                                date={publishingDate}
                                author={author}
                            />
                        )}
                        <h3>{title}</h3>
                    </div>
                </Link>
            </Column>
        )
    })

    return (
        <div className={s.articles_sidebar}>
            <div className={s.heading}>
                <ReactMarkdown source={blockTitle} />

                <Link path={{ page: 'articles', subpage }}>
                    <p className={s.read_more}>
                        {readMoreTitle}
                        <Icon name="chevron-right" className={s.arrow} />
                    </p>
                </Link>
            </div>
            <Border primary clean className={s.border} />
            <Row className={s.row}>
                <Section
                    hasContent={hasContent}
                    loadingTypeSmall
                    spinnerSize={10}
                >
                    {scopeItems}
                </Section>
            </Row>
        </div>
    )
}

ArticlesSidebar.propTypes = {
    readMoreTitle: PropTypes.string,
    showImage: PropTypes.bool,
    blockTitle: PropTypes.string,
    subpage: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            publishingDate: PropTypes.string,
            author: PropTypes.string,
            title: PropTypes.string,
            metaImageUrl: PropTypes.string,
            slug: PropTypes.string,
        })
    ),
    hasContent: PropTypes.bool,
    showDateAuthor: PropTypes.bool,
}

ArticlesSidebar.defaultProps = {
    showImage: true,
    showDateAuthor: true,
}

export default ArticlesSidebar
