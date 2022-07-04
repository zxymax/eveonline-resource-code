import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getConfig from 'config/web'
import { getArticleUrl, getHash } from 'utils/articles'
import ArticleBySlugQuery from 'queries/ArticleBySlugQuery'
import getRedirectFromPath from 'utils/redirect/redirect'
import SingleArticleContainer from 'pages/article/Article'
import Article from 'pages/article/components/article'

const { contentful: { preview } } = getConfig()


export default function ArticleNew() {
    const location = useSelector((state) => state.location)

    const dispatch = useDispatch()

    const subpage = location && location.payload && location.payload.subpage

    const slug = location && location.payload && location.payload.id

    const language = useSelector((state) => state.language)

    const pages = useSelector((state) => state.pages)

    let devBlogs = []
    let patchNotes = []
    let scope = []

    if (pages && pages.articles) {
        devBlogs = pages.articles.devBlogs
        patchNotes = pages.articles.patchNotes
        scope = pages.articles.scope
    }

    // Used to replace images in preview to use our cdn. (for now)
    function replacerImages(str, name, value, input) {
        // name is the first parentheses, surname is the second one
        if (value.match(/\.(jpg)$/i)) {
            return str
                .replace('//images.ctfassets.net/', '//webimg.ccpgamescdn.com/')
                .replace('https:', '')
        }
        if (value.match(/\.(png)$/i)) {
            return str
                .replace('//images.ctfassets.net/', '//webimg.ccpgamescdn.com/')
                .replace('https:', '')
        }
        return str // return the image string back if nothing is found, to get image to show, e.g. .gif
    }

    // Old article because slug is not set, reverting to old logic. The article was retrieved in sitemap redux action
    if (!slug) {
        // console.log('returning old article loging because id/slug was not set.')
        return <SingleArticleContainer />
    }

    function processArticle(article) {
        const processed = {
            ...article,
            id: getHash(article),
        }
        return processed
    }

    return (
        <ArticleBySlugQuery slug={slug} locale={language}>
            {(article) => {
                const item = processArticle(article)
                if (subpage === 't') {
                    dispatch(getRedirectFromPath(getArticleUrl(item, slug)))
                }
                const metaImageUrl =
                    item.metaImageUrl &&
                    item.metaImageUrl.url &&
                    item.metaImageUrl.url
                        .replace(
                            '//images.ctfassets.net/',
                            '//webimg.ccpgamescdn.com/'
                        )
                        .replace('https:', '')

                let content = item.content

                const reg = new RegExp(/(?:!\[(.*?)\]\((.*?)\))/, 'g')
                content = content.replace(reg, replacerImages)

                if (item) {
                    return (
                        <>
                            <Article
                                author={item.author}
                                category={item.category}
                                content={content}
                                metaDescription={item.metaDescription}
                                publishingDate={item.publishingDate}
                                id={item.id}
                                slug={item.slug}
                                title={item.title}
                                video={item.video}
                                metaImageUrl={metaImageUrl}
                                devBlogs={devBlogs}
                                patchNotes={patchNotes}
                                scope={scope}
                                hasContent
                            />
                            {preview && (
                                <span
                                    style={{
                                        textTransform: 'lowercase',
                                        color: '#979797',
                                        fontSize: '14px',
                                    }}
                                >
                                    https://www.eveonline.com
                                    {getArticleUrl(item, slug)}
                                </span>
                            )}
                        </>
                    )
                }
                return (
                    <div>
                        <h1>Not found</h1>
                    </div>
                )
            }}
        </ArticleBySlugQuery>
    )
}
