import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _replace from 'lodash/replace'
import _startsWith from 'lodash/startsWith'
import ReactMarkdown from 'react-markdown'
import getConfig, { isClient } from 'config/web'
import { Container, Section, Column, Row, Icon } from 'layouts'
import { YouTube, FullscreenVideo, DateAndAuthor, SEO } from 'features'
import ArticlesAd from '../../../articles/components/articles/components/articles-ad'
import ArticlesSidebar from '../../../articles/components/articles/components/articles-sidebar'
import BreadCrumbs from '../../../articles/components/articles/components/articles-breadcrumbs'
import style from './Article.scss'

const { webBaseUrl } = getConfig()

const Article = (props) => {
    const [isPlaying, toggleVideo] = useState(false)

    const {
        id,
        slug,
        author,
        publishingDate,
        title,
        content,
        category,
        video,
        metaDescription,
        metaImageUrl,
        hasContent,
        patchNotes,
        scope,
    } = props

    const suffix = ` - EVE ${category}`
    // Backup image if article has no image
    const youtubeUrl = `https://www.youtube.com/watch?v=${video}`

    let image = metaImageUrl
    let seoImage
    let articleFromContentful = false
    if (image != null) {
        if (_startsWith(image, '//webimg.ccpgamescdn.com/')) {
            // Using Contentful image api to get exact sharing dimensions.
            seoImage = image.replace(
                '//webimg.ccpgamescdn.com/',
                '//images.ctfassets.net/'
            )
            seoImage = `${seoImage}?fm=jpg&w=1200&h=630&fit=fill`
            // seoImage = 'https://webimg.ccpgamescdn.com/7lhcm73ukv5p/2VmgAroOaAcsiIOMG6O4Qc/0cf09efeb2d0a764fd3efbae5ae6d23c/omega-meta-image.jpg'
            image = `${image}_w=900&fm=jpg&fl=progressive`
            articleFromContentful = true
        }
    }

    // Make sure that we always have seoImage, can happen in older articles that are not in Contentful
    if (!seoImage) seoImage = image

    function replacerImages(str, name, value, input) {
        // name is the first parentheses, surname is the second one
        if (value.match(/\.(jpg)$/i)) {
            return str.replace(
                new RegExp('.jpg', 'g'),
                '.jpg_w=900&fm=jpg&fl=progressive'
            )
        }
        if (value.match(/\.(png)$/i)) {
            return str.replace(
                new RegExp('.png', 'g'),
                '.png_w=900&fm=jpg&fl=progressive'
            )
        }
        return str // return the image string back if nothing is found, to get image to show, e.g. .gif
    }

    let contentWithCorrectImg = ''
    if (content != null) {
        // regex to find image tag in markdown
        const reg = new RegExp(/(?:!\[(.*?)\]\((.*?)\))/, 'g')

        contentWithCorrectImg = articleFromContentful
            ? content.replace(reg, replacerImages)
            : content
    }

    const videoImage = () => (
        <div className={style.banner}>
            <img className={style.banner_img} src={`${image}`} alt="" />
            {category === 'scope' && video && (
                <>
                    <div className={style.play_btn}>
                        <img
                            onClick={() => toggleVideo(true)}
                            src="//web.ccpgamescdn.com/aws/eveonline/images/play-icon.png"
                            alt=""
                        />
                    </div>
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className={style.youtube}>
                            <p>
                                Watch on{' '}
                                <Icon
                                    brand
                                    className={style.youtube_icon}
                                    name="youtube-square"
                                />
                            </p>
                        </div>
                    </a>
                </>
            )}
        </div>
    )

    return (
        <>
            <div className={style(style.articles, style.articles_single)}>
                <Container>
                    <SEO
                        title={title}
                        description={metaDescription}
                        published={publishingDate}
                        image={seoImage}
                    />
                    {isPlaying && (
                        <FullscreenVideo>
                            <span
                                role="presentation"
                                onClick={() => toggleVideo(false)}
                            >
                                <Icon
                                    name="times-circle"
                                    className={style.close}
                                />
                            </span>
                            <YouTube
                                playing
                                className={style.player}
                                videoId={video}
                            />
                        </FullscreenVideo>
                    )}
                    <BreadCrumbs
                        first="Home"
                        second="articles"
                        third={category}
                        isLastItemLink
                    />
                    <Section hasContent={hasContent}>
                        <Row>
                            <Column
                                className={style.article_title}
                                md={9}
                                xs={12}
                            >
                                <h2>{title}</h2>
                                {category !== 'scope' && (
                                    <DateAndAuthor
                                        className={style.author_date}
                                        date={publishingDate}
                                        author={author}
                                        suffix={suffix}
                                    />
                                )}
                            </Column>
                            <Column md={3} xs={12} />
                        </Row>
                        <Row>
                            <Column md={9} xs={12}>
                                <Row className={style.social_wrapper}>
                                    <Column
                                        xs={12}
                                        md={1}
                                        className={style(
                                            style.col,
                                            style.social_items
                                        )}
                                    >
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${
                                                webBaseUrl
                                            }/article/${id}${
                                                slug !== undefined
                                                    ? `/${slug}`
                                                    : ''
                                            }`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            className={style.facebook}
                                        >
                                            <Icon
                                                brand
                                                name="facebook-f"
                                                className={style.social}
                                            />
                                        </a>
                                        <a
                                            href={`https://twitter.com/share?url=https://eveonline.com/article/${id}/${slug}`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            className={style.twitter}
                                        >
                                            <Icon
                                                brand
                                                name="twitter"
                                                className={style.social}
                                            />
                                        </a>
                                    </Column>
                                    <Column
                                        xs={12}
                                        md={11}
                                        className={style(
                                            style.col,
                                            style.content
                                        )}
                                    >
                                        {articleFromContentful && videoImage()}
                                        {content != null && (
                                            <ReactMarkdown
                                                source={contentWithCorrectImg}
                                                escapeHtml={false}
                                                renderers={{
                                                    table: ({ children }) => (
                                                        <div
                                                            className={
                                                                style.table
                                                            }
                                                        >
                                                            <table>
                                                                {children}
                                                            </table>
                                                        </div>
                                                    ),
                                                }}
                                            />
                                        )}
                                    </Column>
                                </Row>
                            </Column>
                            <Column md={3} xs={12}>
                                <ArticlesAd showHeading={false} s={style} />
                                <ArticlesSidebar
                                    hasContent={!_isEmpty(patchNotes)}
                                    items={patchNotes}
                                    showImage={false}
                                    //   lang={lang}
                                    blockTitle="## Patch __Notes__"
                                    readMoreTitle="Read more"
                                    subpage="patch-notes"
                                />
                                <ArticlesSidebar
                                    hasContent={!_isEmpty(scope)}
                                    items={scope}
                                    //   lang={lang}
                                    blockTitle="## The __Scope__"
                                    readMoreTitle="Read more"
                                    subpage="scope"
                                    showDateAuthor={false}
                                />
                            </Column>
                        </Row>
                    </Section>
                </Container>
            </div>
        </>
    )
}

Article.propTypes = {
    id: PropTypes.string,
    slug: PropTypes.string,
    author: PropTypes.string,
    publishingDate: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
    video: PropTypes.string,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    hasContent: PropTypes.bool,
    patchNotes: PropTypes.arrayOf(PropTypes.object),
    scope: PropTypes.arrayOf(PropTypes.object),
}

export default Article

