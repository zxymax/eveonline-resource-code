import gql from 'graphql-tag'

export const PAGE_BY_SLUG_QUERY = gql`
    query PageCollection($slug: String, $locale: String, $preview: Boolean) {
        pageCollection(
            limit: 1
            where: { slug: $slug }
            locale: $locale
            preview: $preview
        ) {
            items {
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
                        sys {
                            id
                        }
                        headline
                        teaser
                        body
                        buttonText
                        buttonUrl
                        template
                        videoId
                        date
                        backgroundImage
                        imageFile {
                            url
                            description
                        }
                        image
                        theme
                        identifier
                        contentCollection(limit: 25) {
                            total
                            items {
                                ... on Content {
                                    name
                                    sys {
                                        id
                                    }
                                    headline
                                    body
                                    buttonText
                                    buttonUrl
                                    buttonTheme
                                    date
                                    image
                                    imageFile {
                                        url
                                        description
                                    }
                                    data
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

