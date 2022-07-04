import gql from 'graphql-tag'

export const ARTICLES_SEARCH_QUERY = gql`
    query ArticleCollectionSearch(
        $locale: String
        $skip: Int = 0
        $limit: Int = 20
        $query: String
        $preview: Boolean
    ) {
        articleCollection(
            skip: $skip
            limit: $limit
            locale: $locale
            preview: $preview
            where: {
                OR: [{ title_contains: $query }, { content_contains: $query }]
            }
            order: [publishingDate_DESC]
        ) {
            skip
            total
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

