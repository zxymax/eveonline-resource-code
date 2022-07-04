import gql from 'graphql-tag'

const TAGS_FIELDS = gql`
    fragment TagsFields on Content {
        name
        headline
    }
`

export const PAGE_NEWS_CONTENT_QUERY = gql`
    query PageNewsContent($locale: String, $preview: Boolean) {
        page(id: "3mtu854CmybqjgenaEpQMP", locale: $locale, preview: $preview) {
            siteName
            slug
            metaTitle
            metaDescription
            metaImage {
                url
            }
            pageBackground {
                url
            }
            body
            config
            sectionsCollection(limit: 20) {
                total
                items {
                    name
                    headline
                    teaser
                    body
                    buttonText
                    buttonUrl
                    template
                    videoId
                    backgroundImage
                    imageFile {
                        url
                        description
                    }
                    theme
                    identifier
                    sys {
                        publishedVersion
                    }
                    contentCollection(limit: 10) {
                        total
                        items {
                            ... on Content {
                                name
                                headline
                                body
                                buttonText
                                buttonUrl
                                buttonTheme
                                date
                                imageFile {
                                    url
                                    description
                                }
                            }
                        }
                    }
                }
            }
        }
        tags: sharedItems(
            id: "4Risc0ZjvdrQr6NK7cXFSQ"
            locale: $locale
            preview: $preview
        ) {
            name
            contentItemCollection(limit: 40, locale: $locale) {
                total
                items {
                    ...TagsFields
                }
            }
        }
        featured: section(
            id: "4Czq2QMVGpes5srijmEYrK"
            locale: $locale
            preview: $preview
        ) {
            headline
            contentCollection {
                total
                items {
                    ... on Article {
                        title
                        slug
                        metaImageUrl {
                            url
                        }
                    }
                }
            }
        }
        latestPatchNotes: articleCollection(
            limit: 1
            locale: $locale
            preview: $preview
            where: { tags_contains_all: ["patch-notes"] }
            order: [publishingDate_DESC]
        ) {
            items {
                sys {
                    publishedAt
                    firstPublishedAt
                }
                slug
            }
        }
    }
    ${TAGS_FIELDS}
`

