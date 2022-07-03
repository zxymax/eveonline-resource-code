import React from 'react'
import ArticleWithSections from 'pages/academy/components/article/ArticleWithSections'
import Props from '../Props'
import style from './Article.module.scss'

export default function ArticleManySections({
    page,
    sitemapPage,
    location,
}: Props): JSX.Element {
    if (!page) return <></>

    return (
        <div className={style.article}>
            {page && (
                <>
                    <ArticleWithSections
                        page={page}
                        sitemapPage={sitemapPage}
                        location={location}
                    />
                </>
            )}
        </div>
    )
}
