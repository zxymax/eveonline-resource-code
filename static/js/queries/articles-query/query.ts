import gql from 'graphql-tag'

export const ARTICLES_QUERY = gql`
    query ArticleCollectionQuery(
        $locale: String
        $limit: Int = 10
        $tagsToExclude: [String] = ["patch-notes", "ccptv"]
        $preview: Boolean
    ) {
        articleCollection(
            limit: $limit
            locale: $locale
            preview: $preview
            where: { tags_contains_none: $tagsToExclude }
            order: [publishingDate_DESC]
        ) {
            items {
                sys {
                    publishedAt
                    firstPublishedAt
                }
                title
                slug
                tags
                category
                author
                publishingDate
                video
                metaDescription
                metaImageUrl {
                    url
                }
            }
        }
    }
`

