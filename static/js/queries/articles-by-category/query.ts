import gql from 'graphql-tag'

export const ARTICLES_BY_CATEGORY_QUERY = gql`
    query ArticleCollectionByCategory(
        $locale: String
        $limit: Int = 10
        $category: String
        $preview: Boolean
    ) {
        articleCollection(
            limit: $limit
            locale: $locale
            preview: $preview
            where: { category_in: [$category] }
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

