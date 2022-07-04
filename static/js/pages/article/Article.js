import { connect } from 'react-redux'
import ArticlePage from './components/article'

const mapStateToProps = ({ pages: { article, articles }, location }) => {
    let data = {}

    if (article) {
        data = article
    }

    let {
        id,
        author,
        category,
        content,
        metaDescription,
        publishingDate,
        slug,
        title,
        video,
        metaImageUrl,
    } = ''
    let hasContent = false

    let { devBlogs, patchNotes, scope } = ''

    if (articles) {
        devBlogs = articles.devblogs
        patchNotes = articles.patchNotes
        scope = articles.scope
    }

    if (article) {
        id = data.id
        author = data.author
        category = data.category
        content = data.content
        metaDescription = data.metaDescription
        publishingDate = data.publishingDate
        slug = data.slug
        title = data.title
        video = data.video
        metaImageUrl = data.metaImageUrl
        hasContent = true
    }

    return {
        id,
        author,
        category,
        content,
        metaDescription,
        publishingDate,
        slug,
        title,
        location: location.payload.slug,
        video,
        metaImageUrl,
        hasContent,
        devBlogs,
        patchNotes,
        scope,
    }
}

export default connect(mapStateToProps)(ArticlePage)
