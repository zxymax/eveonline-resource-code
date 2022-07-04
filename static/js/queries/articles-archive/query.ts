import gql from 'graphql-tag'

export const ARTICLES_ARCHIVE_QUERY = gql`
    query ArticleCollectionSearchArchive(
        $locale: String
        $skip: Int
        $limit: Int
        $start: DateTime
        $end: DateTime
        $preview: Boolean
    ) {
        articleCollection(
            skip: $skip
            limit: $limit
            locale: $locale
            preview: $preview
            where: {
                AND: [
                    { publishingDate_lt: $end }
                    { publishingDate_gt: $start }
                ]
            }
            order: publishingDate_DESC
        ) {
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

