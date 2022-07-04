import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArticleBySlugQuery from 'queries/ArticleBySlugQuery'
import getRedirectFromPath from 'utils/redirect/redirect'
import { getArticleUrl } from 'utils/articles'

export default function ArticleRedirect() {
    const dispatch = useDispatch()
    const location = useSelector((state) => state.location)
    const subpage = location && location.payload && location.payload.subpage
    const slug = location && location.payload && location.payload.id
    const language = useSelector((state) => state.language)

    return (
        <ArticleBySlugQuery slug={slug} locale={language}>
            {(item) => {
                if (subpage === 't') {
                    dispatch(getRedirectFromPath(getArticleUrl(item, slug)))
                }
                return <></>
            }}
        </ArticleBySlugQuery>
    )
}
