import React from 'react'
import { useSelector } from 'react-redux'
// import getConfig from 'config/web'
// import Article from './Article'
import ArticleNew from './ArticleNew'
// import ArticlePreview from './ArticlePreview'
import ArticleRedirect from './ArticleRedirect'

export default function Index() {
    const location = useSelector((state) => state.location)
    const subpage = location && location.payload && location.payload.subpage
    if (subpage === 't') {
        // This only executes if url is /article/t/{slug}
        // Trying out article redirect on server, see how it behaves.
        return <ArticleRedirect />
    }

    // return config.contentful.preview ? <ArticlePreview /> : <ArticleNew />
    // return <Article />
    return <ArticleNew />
}
