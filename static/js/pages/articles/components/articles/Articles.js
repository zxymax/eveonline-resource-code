import React, { Component } from 'react'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { Border, Container, Column, Row } from 'layouts'
import { Upgrade, ArticlesPreviewList, SEO } from 'features'
import ArticlesNews from './components/articles-news'
import ArticlesAd from './components/articles-ad'
import ArticlesSidebar from './components/articles-sidebar'
import BreadCrumbs from './components/articles-breadcrumbs'
import style from './Articles.scss'

class Articles extends Component {
    renderArticles() {
        const {
            news,
            devblogs,
            scope,
            patchNotes,
            upgrade,
            lang,
            hasContent,
        } = this.props

        return (
            <div className={style(style.articles, style.articles_home)}>
                <SEO title="Articles" />
                <Container>
                    <BreadCrumbs first="Home" second="articles" />
                    <Row>
                        <Column xs={12} md={9}>
                            {!_isEmpty(news) && (
                                <ArticlesNews
                                    s={style}
                                    featured={news[0]}
                                    news={news.slice(1, 5)}
                                    lang={lang}
                                    hasContent={hasContent}
                                />
                            )}
                            {_isEmpty(news) && (
                                <ArticlesNews
                                    s={style}
                                    featured={null}
                                    news={null}
                                    lang={lang}
                                    hasContent={false}
                                />
                            )}

                            {!_isEmpty(devblogs) && (
                                <ArticlesPreviewList
                                    title="## Dev __Blogs__"
                                    items={devblogs}
                                    count="3"
                                    subpage="dev-blogs"
                                    readMoreTitle="Read more dev blogs"
                                    itemCount="3"
                                    colSize="4"
                                />
                            )}
                        </Column>
                        <Column xs={12} md={3}>
                            <ArticlesAd showHeading={false} s={style} />
                            <ArticlesSidebar
                                hasContent={!_isEmpty(patchNotes)}
                                items={patchNotes}
                                showImage={false}
                                lang={lang}
                                blockTitle="## Patch __Notes__"
                                readMoreTitle="Read more"
                                subpage="patch-notes"
                            />
                            <ArticlesSidebar
                                hasContent={!_isEmpty(scope)}
                                items={scope}
                                lang={lang}
                                blockTitle="## The __Scope__"
                                readMoreTitle="Read more"
                                subpage="scope"
                                showDateAuthor={false}
                            />
                        </Column>
                    </Row>
                    <Border secondary clean small />
                    <Upgrade section={upgrade} />
                </Container>
            </div>
        )
    }

    render() {
        return this.renderArticles()
    }
}

Articles.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    devblogs: PropTypes.arrayOf(PropTypes.object),
    patchNotes: PropTypes.arrayOf(PropTypes.object),
    scope: PropTypes.arrayOf(PropTypes.object),
    upgrade: PropTypes.objectOf(PropTypes.string),
    lang: PropTypes.string,
    hasContent: PropTypes.bool,
}

export default Articles
