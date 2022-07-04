import gql from 'graphql-tag'

export const ARTICLE_BY_SLUG_QUERY = gql`
    query ArticleCollectionBySlug(
        $slug: String
        $locale: String
        $preview: Boolean
    ) {
        articleCollection(
            limit: 1
            where: { slug: $slug }
            locale: $locale
            preview: $preview
        ) {
            items {
                sys {
                    publishedAt
                    firstPublishedAt
                }
                title
                slug
                tags
                content
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

