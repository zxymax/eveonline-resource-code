import gql from 'graphql-tag'

export const ARTICLES_BY_TAG_QUERY = gql`
    query ArticleCollectionByTag(
        $locale: String
        $skip: Int = 0
        $limit: Int = 10
        $tag: String
        $preview: Boolean
    ) {
        articleCollection(
            skip: $skip
            limit: $limit
            locale: $locale
            preview: $preview
            where: { tags_contains_some: [$tag] }
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

